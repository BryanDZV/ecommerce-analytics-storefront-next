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
// Le pasamos las props isOpen y onClose para poder probar la interactividad
jest.mock('../components/LoginModal', () => {
  return function DummyLoginModal({ isOpen, onClose }: any) {
    // Si isOpen es falso, no renderizamos nada, igual que en tu componente real
    if (!isOpen) return null;

    return (
      <div data-testid="login-modal">
        <p>Modal Abierto</p>
        {/* Un botón falso para simular el cierre del modal */}
        <button onClick={onClose}>Cerrar Modal</button>
      </div>
    );
  };
});

describe('Componente Searchbar', () => {
  test('renderiza los elementos iniciales y el modal está cerrado por defecto', () => {
    render(<Searchbar />);

    // Verificamos que el input de búsqueda esté en la pantalla
    const inputBusqueda = screen.getByPlaceholderText('Busca tu producto');
    expect(inputBusqueda).toBeInTheDocument();

    // Verificamos que el icono de usuario exista
    const iconoUsuario = screen.getByAltText('user-icon');
    expect(iconoUsuario).toBeInTheDocument();

    // Verificamos que el modal NO esté en la pantalla al inicio.
    // Usamos queryByTestId en lugar de getBy... porque getBy lanza un error si no lo encuentra.
    const modal = screen.queryByTestId('login-modal');
    expect(modal).not.toBeInTheDocument();
  });

  test('abre el modal de login cuando se hace clic en el icono de usuario', () => {
    render(<Searchbar />);

    // 1. Buscamos el botón del usuario (que contiene la imagen)
    const botonUsuario = screen.getByAltText('user-icon');

    // 2. Simulamos el clic
    fireEvent.click(botonUsuario);

    // 3. Verificamos que el modal AHORA SÍ esté en el documento
    const modal = screen.getByTestId('login-modal');
    expect(modal).toBeInTheDocument();
  });

  test('cierra el modal cuando se dispara la función onClose', () => {
    render(<Searchbar />);

    // 1. Primero abrimos el modal
    fireEvent.click(screen.getByAltText('user-icon'));
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();

    // 2. Buscamos el botón de cerrar que creamos en nuestro Mock y le hacemos clic
    const botonCerrar = screen.getByText('Cerrar Modal');
    fireEvent.click(botonCerrar);

    // 3. Verificamos que el modal haya desaparecido
    expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument();
  });
});
