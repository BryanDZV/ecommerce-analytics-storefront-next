import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore'

// 1. Simulación (Mock) completa de localStorage para el middleware "persist"
// Esto evita errores en Jest y asegura que Zustand no ensucie la memoria entre tests.
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// 2. Definimos los mocks de los productos basándonos en tu array

const mockProduct1: Product = {
    id: '1',
    name: 'Teclado Mecánico',
    description: 'Teclado mecánico RGB con switches rojos.',
    price: 100,
    category: 'electronics',
    image: 'https://ejemplo.com/teclado.jpg',
    stock: 15,
    rating: 4.8,
    createdAt: '2026-03-23T10:00:00Z',
};

const mockProduct2: Product = {
    id: '2',
    name: 'Camiseta de algodón',
    description: 'Camiseta básica color negro.',
    price: 20,
    category: 'clothing',
    image: 'https://ejemplo.com/camiseta.jpg',
    stock: 50,
    rating: 4.5,
    createdAt: '2026-03-20T08:30:00Z',
};

describe('Store del Carrito (useCartStore)', () => {
    
    // 3. Limpieza: Antes de CADA test, reiniciamos el estado y limpiamos los mocks
    beforeEach(() => {
        useCartStore.setState({ cart: [] });
        jest.clearAllMocks(); // Limpiamos contadores del localStorageMock
    });

    it('1. Debería inicializarse con el carrito vacío', () => {
        const { cart } = useCartStore.getState();
        expect(cart).toEqual([]);
    });

    it('2. Debería añadir un producto nuevo al carrito con cantidad 1', () => {
        useCartStore.getState().addToCart(mockProduct1);

        const { cart } = useCartStore.getState();

        expect(cart).toHaveLength(1);
        expect(cart[0]).toEqual({ ...mockProduct1, quantity: 1 });
    });

    it('3. Debería incrementar la cantidad si el producto ya existe en el carrito', () => {
        // Añadimos el mismo producto tres veces para estar seguros
        useCartStore.getState().addToCart(mockProduct1);
        useCartStore.getState().addToCart(mockProduct1);
        useCartStore.getState().addToCart(mockProduct1);

        const { cart } = useCartStore.getState();

        expect(cart).toHaveLength(1); // Sigue habiendo un solo elemento en el array
        expect(cart[0].id).toBe(mockProduct1.id);
        expect(cart[0].quantity).toBe(3); // La cantidad debe ser 3
    });

    it('4. Debería manejar múltiples productos distintos correctamente', () => {
        useCartStore.getState().addToCart(mockProduct1);
        useCartStore.getState().addToCart(mockProduct2);

        const { cart } = useCartStore.getState();

        expect(cart).toHaveLength(2);
        expect(cart[0].id).toBe(mockProduct1.id);
        expect(cart[1].id).toBe(mockProduct2.id);
    });

    it('5. Debería eliminar un producto del carrito por su ID', () => {
        // Preparamos el estado inicial del test con dos productos
        useCartStore.getState().addToCart(mockProduct1);
        useCartStore.getState().addToCart(mockProduct2);

        // Eliminamos el primero
        useCartStore.getState().removeFromCart(mockProduct1.id);

        const { cart } = useCartStore.getState();

        expect(cart).toHaveLength(1);
        expect(cart[0].id).toBe(mockProduct2.id); // Solo debe quedar el producto 2
    });

    it('6. Caso límite: No debería mutar el carrito si se intenta eliminar un ID que no existe', () => {
        useCartStore.getState().addToCart(mockProduct1);
        
        // Intentamos borrar un ID inventado
        useCartStore.getState().removeFromCart('id-falso-123');

        const { cart } = useCartStore.getState();

        // El carrito debe seguir intacto
        expect(cart).toHaveLength(1);
        expect(cart[0].id).toBe(mockProduct1.id);
    });

    it('7. Debería mantener intactos los demás productos al incrementar la cantidad de uno existente (Cubre línea 26)', () => {
        // 1. Añadimos dos productos DIFERENTES al carrito
        useCartStore.getState().addToCart(mockProduct1);
        useCartStore.getState().addToCart(mockProduct2);

        // 2. Volvemos a añadir el PRIMER producto
        useCartStore.getState().addToCart(mockProduct1);

        const { cart } = useCartStore.getState();

        // 3. Verificamos que el carrito sigue teniendo exactamente 2 tipos de productos
        expect(cart).toHaveLength(2);

        // 4. Verificamos que el primero subió su cantidad a 2
        const product1InCart = cart.find(item => item.id === mockProduct1.id);
        expect(product1InCart?.quantity).toBe(2);

        // 5. Verificamos que el segundo producto pasó por la línea 26 y se quedó igual
        const product2InCart = cart.find(item => item.id === mockProduct2.id);
        expect(product2InCart?.quantity).toBe(1);
    });
});