import { useNotificationStore } from '@/store/useNotificationStore'; // ¡Ajusta esta ruta!

describe('Store de Notificaciones (useNotificationStore)', () => {
    
    // Limpiamos el estado antes de cada test para evitar que un test afecte al siguiente
    beforeEach(() => {
        useNotificationStore.setState({
            isLoading: false,
            status: 'initial',
            message: '',
        });
    });

    it('1. Debería inicializarse con los valores por defecto', () => {
        const state = useNotificationStore.getState();
        
        expect(state.isLoading).toBe(false);
        expect(state.status).toBe('initial');
        expect(state.message).toBe('');
    });

    it('2. Debería poner el estado de carga (startLoading) y limpiar mensajes anteriores', () => {
        // Primero simulamos que había un error previo
        useNotificationStore.setState({ 
            status: 'error', 
            message: 'Error anterior' 
        });

        // Ejecutamos la acción
        useNotificationStore.getState().startLoading();
        
        const state = useNotificationStore.getState();
        
        // Verificamos que isLoading es true y el resto se limpió
        expect(state.isLoading).toBe(true);
        expect(state.status).toBe('initial');
        expect(state.message).toBe('');
    });

    it('3. Debería mostrar un mensaje de éxito (showSuccess) y quitar la carga', () => {
        // Simulamos que estaba cargando
        useNotificationStore.setState({ isLoading: true });

        const mensajeExito = '¡Producto añadido con éxito!';
        useNotificationStore.getState().showSuccess(mensajeExito);
        
        const state = useNotificationStore.getState();
        
        expect(state.isLoading).toBe(false);
        expect(state.status).toBe('success');
        expect(state.message).toBe(mensajeExito);
    });

    it('4. Debería mostrar un mensaje de error (showError) y quitar la carga', () => {
        // Simulamos que estaba cargando
        useNotificationStore.setState({ isLoading: true });

        const mensajeError = 'Error al conectar con el servidor';
        useNotificationStore.getState().showError(mensajeError);
        
        const state = useNotificationStore.getState();
        
        expect(state.isLoading).toBe(false);
        expect(state.status).toBe('error');
        expect(state.message).toBe(mensajeError);
    });

    it('5. Debería reiniciar todo el estado a sus valores iniciales (reset)', () => {
        // Ensuciamos el estado con un éxito
        useNotificationStore.getState().showSuccess('Todo fue bien');
        
        // Ejecutamos el reset
        useNotificationStore.getState().reset();
        
        const state = useNotificationStore.getState();
        
        expect(state.isLoading).toBe(false);
        expect(state.status).toBe('initial');
        expect(state.message).toBe('');
    });
});