import { useProductStore } from '@/store/useProductStore'; // ¡Ajusta esta ruta!
import { Product } from '@/types/product';

// Creamos un par de productos de prueba basados en tu interfaz
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Auriculares Inalámbricos',
        description: 'Auriculares con cancelación de ruido.',
        price: 150,
        category: 'electronics',
        image: 'auriculares.jpg',
        stock: 10,
        rating: 4.5,
        createdAt: '2026-03-01T10:00:00Z',
    },
    {
        id: '2',
        name: 'Silla de Oficina',
        description: 'Silla ergonómica para trabajar.',
        price: 200,
        category: 'home',
        image: 'silla.jpg',
        stock: 5,
        rating: 4.8,
        createdAt: '2026-03-05T12:00:00Z',
    }
];

describe('Store de Productos (useProductStore)', () => {
    
    // Limpiamos el estado antes de cada test
    beforeEach(() => {
        useProductStore.setState({ products: [] });
    });

    it('1. Debería inicializarse con un array vacío', () => {
        const { products } = useProductStore.getState();
        
        expect(products).toEqual([]);
    });

    it('2. Debería actualizar el estado con los nuevos productos (setProducts)', () => {
        // Ejecutamos la acción pasándole nuestros mocks
        useProductStore.getState().setProducts(mockProducts);
        
        const { products } = useProductStore.getState();
        
        // Verificamos que ahora el estado tiene esos productos
        expect(products).toEqual(mockProducts);
        expect(products).toHaveLength(2);
        expect(products[0].name).toBe('Auriculares Inalámbricos');
    });

    it('3. Debería poder vaciar la lista de productos si se le pasa un array vacío', () => {
        // Forzamos un estado inicial con productos
        useProductStore.setState({ products: mockProducts });

        // Ejecutamos la acción con un array vacío
        useProductStore.getState().setProducts([]);
        
        const { products } = useProductStore.getState();
        
        // Verificamos que se vació correctamente
        expect(products).toEqual([]);
    });
});