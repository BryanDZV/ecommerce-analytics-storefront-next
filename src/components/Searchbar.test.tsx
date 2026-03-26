import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Searchbar from './Searchbar';

// 1. Mockeamos el FilterIcon para simplificar
jest.mock('./buttons/FilterIcon', () => {
  return function DummyFilterIcon() {
    return <div data-testid="filter-icon">Icono Filtro</div>;
  };
});

// 2. Mockeamos el LoginModal (importado dinámicamente)
jest.mock('../components/LoginModal', () => {
  return function DummyLoginModal({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
    if (!isOpen) return null;

    return (
      <div data-testid="login-modal">
        <p>Modal Abierto</p>
        <button onClick={onClose}>Cerrar Modal</button>
      </div>
    );
  };
});

describe('Componente Searchbar', () => {
  test('renderiza los elementos iniciales y el modal está cerrado por defecto', () => {
    render(<Searchbar />);

    const inputBusqueda = screen.getByPlaceholderText('Busca tu producto');
    expect(inputBusqueda).toBeInTheDocument();

    const iconoUsuario = screen.getByAltText('user-icon');
    expect(iconoUsuario).toBeInTheDocument();

    const modal = screen.queryByTestId('login-modal');
    expect(modal).not.toBeInTheDocument();
  });

  // CORRECCIÓN: Añadimos async y usamos findByTestId
  test('abre el modal de login cuando se hace clic en el icono de usuario', async () => {
    render(<Searchbar />);

    const botonUsuario = screen.getByAltText('user-icon');
    fireEvent.click(botonUsuario);

    // findByTestId espera a que el componente aparezca y maneja el act() internamente
    const modal = await screen.findByTestId('login-modal');
    expect(modal).toBeInTheDocument();
  });

  test('cierra el modal cuando se dispara la función onClose', async () => {
    render(<Searchbar />);

    fireEvent.click(screen.getByAltText('user-icon'));

    // Esperamos a que abra antes de intentar cerrar
    const modal = await screen.findByTestId('login-modal');
    expect(modal).toBeInTheDocument();

    const botonCerrar = screen.getByText('Cerrar Modal');
    fireEvent.click(botonCerrar);

    // Verificamos que desaparezca
    expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument();
  });
});
