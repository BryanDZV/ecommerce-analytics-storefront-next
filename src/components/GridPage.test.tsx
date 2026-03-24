import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridPage from './GridPage';

// 1. Mockeamos los componentes hijos para aislar GridPage
jest.mock('./product/ProductGrid', () => {
  return function DummyProductGrid() {
    return <div data-testid="product-grid">Grilla de Productos</div>;
  };
});

jest.mock('./Sidebar', () => {
  return function DummySideBar() {
    return <div data-testid="sidebar">Barra Lateral</div>;
  };
});

describe('Componente GridPage', () => {
  test('renderiza la estructura principal y los componentes hijos', () => {
    // Usamos 'container' para poder buscar elementos por clase o ID
    const { container } = render(<GridPage />);

    // Verificamos que los componentes hijos mockeados estén presentes
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    // Verificamos el botón de cerrar
    expect(screen.getByText('✕ Cerrar')).toBeInTheDocument();

    // Verificamos que los contenedores del sidebar y overlay existan
    expect(container.querySelector('#sidebar-movil')).toBeInTheDocument();
    expect(container.querySelector('#overlay-movil')).toBeInTheDocument();
  });

  test('añade la clase "open" al sidebar y al overlay al hacer clic en el botón móvil', () => {
    const { container } = render(<GridPage />);

    // Como el botón no tiene texto ni aria-label, lo buscamos por su clase
    const botonAbrir = container.querySelector('.mobileFilterBtn');
    const sidebar = container.querySelector('#sidebar-movil');
    const overlay = container.querySelector('#overlay-movil');

    // Hacemos la aserción inicial para asegurarnos de que no tienen la clase
    expect(sidebar).not.toHaveClass('open');

    // Simulamos el clic
    fireEvent.click(botonAbrir!);

    // Verificamos que se haya añadido la clase 'open'
    expect(sidebar).toHaveClass('open');
    expect(overlay).toHaveClass('open');
  });

  test('quita la clase "open" al hacer clic en el botón cerrar o en el overlay', () => {
    const { container } = render(<GridPage />);

    const botonAbrir = container.querySelector('.mobileFilterBtn');
    const botonCerrar = screen.getByText('✕ Cerrar');
    const overlay = container.querySelector('#overlay-movil');
    const sidebar = container.querySelector('#sidebar-movil');

    // 1. Primero abrimos los filtros
    fireEvent.click(botonAbrir!);
    expect(sidebar).toHaveClass('open'); // Comprobamos que se abrieron

    // 2. Simulamos clic en el botón "✕ Cerrar"
    fireEvent.click(botonCerrar);

    // 3. Verificamos que se quitó la clase
    expect(sidebar).not.toHaveClass('open');
    expect(overlay).not.toHaveClass('open');

    // 4. Repetimos el proceso para probar el clic en el overlay
    fireEvent.click(botonAbrir!); // Abrimos de nuevo
    fireEvent.click(overlay!); // Hacemos clic en el fondo gris

    // 5. Verificamos que también se cerró
    expect(sidebar).not.toHaveClass('open');
  });
});
