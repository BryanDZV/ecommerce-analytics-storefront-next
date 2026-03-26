import { useFilterStore } from '@/store/useFilterStore';

describe('Store de Filtros (useFilterStore)', () => {
  // Limpiamos el estado antes de cada test para evitar interferencias
  beforeEach(() => {
    useFilterStore.setState({
      selectedCategory: null,
      priceOrder: null,
      nameOrder: null,
    });
  });

  it('1. Debería inicializarse con todos los filtros en null', () => {
    const state = useFilterStore.getState();

    expect(state.selectedCategory).toBeNull();
    expect(state.priceOrder).toBeNull();
    expect(state.nameOrder).toBeNull();
  });

  it('2. Debería actualizar la categoría seleccionada', () => {
    // Ejecutamos la acción
    useFilterStore.getState().setSelectedCategory('electronics');

    // Verificamos el estado
    expect(useFilterStore.getState().selectedCategory).toBe('electronics');
  });

  it('3. Debería actualizar el orden por precio', () => {
    useFilterStore.getState().setPriceOrder('min-max');

    expect(useFilterStore.getState().priceOrder).toBe('min-max');
  });

  it('4. Debería actualizar el orden por nombre', () => {
    useFilterStore.getState().setNameOrder('z-a');

    expect(useFilterStore.getState().nameOrder).toBe('z-a');
  });

  it('5. Debería mantener los demás filtros intactos al actualizar solo uno', () => {
    const store = useFilterStore.getState();

    // Seteamos una categoría
    store.setSelectedCategory('clothing');

    // Seteamos un orden de precio
    useFilterStore.getState().setPriceOrder('max-min');

    const newState = useFilterStore.getState();

    // Verificamos que ambos valores se guardaron y el tercero sigue en null
    expect(newState.selectedCategory).toBe('clothing');
    expect(newState.priceOrder).toBe('max-min');
    expect(newState.nameOrder).toBeNull();
  });
  //test de current page
  test('debe resetear la página a 1 cuando se cambia la categoría', () => {
    const { setSelectedCategory, setCurrentPage } = useFilterStore.getState();

    // Ponemos una página alta
    setCurrentPage(5);

    // Cambiamos categoría
    setSelectedCategory('electronics');

    // La página debe haber vuelto a 1
    expect(useFilterStore.getState().currentPage).toBe(1);
    expect(useFilterStore.getState().selectedCategory).toBe('electronics');
  });
});
