import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from '@/services/productService';
import { products } from '@/mocks/mockProducts';

//describe: Groups a set of related tests. In this case, for 'Product Service'.
//Helps organize code and give context to test reports.
describe('Product Service', () => {
  //test: Defines an individual test case with a clear description of what it verifies.
  test('getProducts returns all products with correct metadata', () => {
    //Call the function we want to test.
    const result = getProducts();

    //expect: This is Jest's assertion function. It is used to verify that values meet certain conditions.
    //.toEqual(): Compares the contents of two objects or arrays to ensure that they are identical.
    //Used here to verify that the returned data is the products of the mock.
    expect(result.data).toEqual(products);
    //.toBe(): Comprueba la igualdad estricta (===). Es ideal para valores primitivos como números, strings o booleanos.
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

    //.toBeUndefined(): Verifica que el valor es 'undefined'.
    //Útil para probar casos donde se espera que no se encuentre un resultado.
    expect(result).toBeUndefined();
  });

  test('getProductsByCategory filter correctly', () => {
    const category = products[0].category;

    const result = getProductsByCategory([category]);
    //Here, instead of comparing arrays, we check a property of each element.
    //.every() is a JS array method that checks if all elements meet a condition.
    //The boolean result is passed to expect(...).toBe(true).
    expect(result.every((p) => p.category === category)).toBe(true);
  });

  test('getProductsByCategory returns all if categories is empty', () => {
    const result = getProductsByCategory([]);
    //The edge case is tested: if no categories are passed, all products must be returned.
    expect(result).toEqual(products);
  });
});
