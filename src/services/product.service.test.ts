import {
  getProducts,
  getProductById,
  getFilteredProducts,
} from '@/services/productService';
import { products } from '@/mocks/mockProducts';

//describe: Groups a set of related tests. In this case, for 'Product Service'.
//Helps organize code and give context to test reports.
describe('Product Service', () => {
  //test: Defines an individual test case with a clear description of what it verifies.
  test('getProducts returns all products with correct metadata', () => {
    //We call the function we want to test.
    const result = getProducts();
    //expect: This is Jest's assertion function. It is used to verify that values ​​meet certain conditions.
    //.toEqual(): Compares the contents of two objects or arrays to ensure that they are identical.
    //Used here to verify that the returned data is the products of the mock.
    expect(result.data).toEqual(products);
    //.toBe(): Checks for strict equality (===). It is ideal for primitive values ​​such as numbers, strings or booleans.
    expect(result.totalCount).toBe(products.length);
    expect(result.page).toBe(1);
    expect(result.hasNextPage).toBe(false);
  });

  test('getProductById returns the correct product', () => {
    const product = products[0];

    const result = getProductById(product.id);

    expect(result).toEqual(product);
  });

  test('getProductById returns undefined if it does not exist', () => {
    const result = getProductById('Does not exist');
    //.toBeUndefined(): Verifies that the value is 'undefined'.
    //Useful for testing cases where a result is expected not to be found.
    expect(result).toBeUndefined();
  });

  /*---FILTERING AND SORTING TESTS  ---*/

  test('getFilteredProducts filter correctly by category', () => {
    const category = products[0].category;
    const result = getFilteredProducts([category], null, null);

    //Verify that all returned products are from the selected category
    expect(result.data.every((p) => p.category === category)).toBe(true);
    expect(result.totalCount).toBe(result.data.length);
  });

  test('getFilteredProducts returns all if categories is empty', () => {
    const result = getFilteredProducts([], null, null);
    //Si no se pasan categorías, deben devolverse todos los productos
    expect(result.data).toEqual(products);
    expect(result.totalCount).toBe(products.length);
  });

  test('getFilteredProducts sorts by price min-max', () => {
    //We try the sort branch by price from low to high
    const result = getFilteredProducts([], 'min-max', null);

    const firstPrice = result.data[0].price;
    const lastPrice = result.data[result.data.length - 1].price;

    //The price of the first must be less than or equal to that of the last
    expect(firstPrice).toBeLessThanOrEqual(lastPrice);
  });

  test('getFilteredProducts sorts by price max-min', () => {
    //We try the sort branch by price from high to low
    const result = getFilteredProducts([], 'max-min', null);

    const firstPrice = result.data[0].price;
    const lastPrice = result.data[result.data.length - 1].price;

    //The price of the first must be greater than or equal to that of the last
    expect(firstPrice).toBeGreaterThanOrEqual(lastPrice);
  });

  test('getFilteredProducts sorts by name a-z', () => {
    //We test the A-Z alphabetical sort branch
    const result = getFilteredProducts([], null, 'a-z');
    const firstName = result.data[0].name.toLowerCase();
    const secondName = result.data[1].name.toLowerCase();

    //We verify that the alphabetical order is correct (A <= B)
    expect(firstName <= secondName).toBe(true);
  });

  test('getFilteredProducts sorts by name z-a', () => {
    //We try the Z-A alphabetical sort branch
    const result = getFilteredProducts([], null, 'z-a');

    const firstName = result.data[0].name.toLowerCase();
    const secondName = result.data[1].name.toLowerCase();

    //We verify that the order is reverse (Z >= Y)
    expect(firstName >= secondName).toBe(true);
  });
});
