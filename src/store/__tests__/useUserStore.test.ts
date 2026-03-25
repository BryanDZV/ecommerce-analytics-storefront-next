import { useUserStore, demoLogin } from '@/store/useUserStore';

// 1. Simulación (Mock) de localStorage para el middleware "persist"
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

describe('Store de Usuario (useUserStore)', () => {
    
    // 2. Limpieza: Reiniciamos el estado y los mocks de Jest antes de cada test
    beforeEach(() => {
        useUserStore.setState({ user: null });
        jest.clearAllMocks();
    });

    it('1. Debería inicializarse sin ningún usuario (null)', () => {
        const { user } = useUserStore.getState();
        
        expect(user).toBeNull();
    });

    it('2. Debería guardar los datos del usuario al hacer login', () => {
        // Ejecutamos la acción de login usando el objeto que tú mismo exportaste
        useUserStore.getState().login(demoLogin);
        
        const { user } = useUserStore.getState();
        
        // Verificamos que el usuario en el estado es exactamente el demoLogin
        expect(user).toEqual(demoLogin);
        expect(user?.name).toBe('demouser');
        expect(user?.email).toBe('demouser@globant.com');
    });

    it('3. Debería eliminar los datos del usuario al hacer logout', () => {
        // Preparamos el estado inicial: primero hacemos login
        useUserStore.getState().login(demoLogin);
        
        // Comprobamos rápidamente que el login funcionó (opcional, pero da seguridad)
        expect(useUserStore.getState().user).not.toBeNull();

        // Ejecutamos la acción de logout
        useUserStore.getState().logout();
        
        const { user } = useUserStore.getState();
        
        // Verificamos que el usuario vuelve a ser null
        expect(user).toBeNull();
    });
});