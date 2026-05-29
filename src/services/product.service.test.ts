import { getProductById, getFilteredProducts } from '@/services/productService';
import { products } from '@/mocks/mockProducts';

//describe: Groups a set of related tests. In this case, for 'Product Service'.
//Helps organize code and give context to test reports.
describe('Product Service', () => {
  //test: Defines an individual test case with a clear description of what it verifies.

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
    // By default we ask for page 1 with a size of 8
    const result = getFilteredProducts([category], null, null, 1, 8);

    //Verify that all returned products are from the selected category
    expect(result.data.every((p) => p.category === category)).toBe(true);

    const totalExpected = products.filter(
      (p) => p.category === category
    ).length;
    expect(result.totalCount).toBe(totalExpected); // totalCount debe ser el total real en el mock, no el tamaño de la página
  });

  test('getFilteredProducts returns first page if categories is empty', () => {
    const result = getFilteredProducts([], null, null, 1, 8);
    //Si no se pasan categorías, deben devolverse los productos de la primera página
    // se compara con, el trozo de la página 1
    expect(result.data.length).toBe(8);
    expect(result.totalCount).toBe(products.length);
    expect(result.pageSize).toBe(8);
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
    // Usamos localeCompare para ser más precisos con strings
    expect(firstName.localeCompare(secondName)).toBeLessThanOrEqual(0);
  });

  test('getFilteredProducts sorts by name z-a', () => {
    //We try the Z-A alphabetical sort branch
    const result = getFilteredProducts([], null, 'z-a');

    const firstName = result.data[0].name.toLowerCase();
    const secondName = result.data[1].name.toLowerCase();

    //We verify that the order is reverse (Z >= Y)
    expect(firstName.localeCompare(secondName)).toBeGreaterThanOrEqual(0);
  });
});
