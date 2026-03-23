import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// 1. Mockeamos el componente FlexibleImage
jest.mock('@/app/components/FlexibleImage', () => {
  return function DummyFlexibleImage(props: any) {
    // Renderizamos una etiqueta img estándar para que Jest la entienda fácilmente,
    // pasándole todas las props que el Header le haya enviado.
    return <img data-testid="flexible-image" {...props} />;
  };
});

describe('Componente Header', () => {
  test('renderiza la imagen de fondo correctamente', () => {
    render(<Header />);

    // Buscamos la imagen por su texto alternativo (alt)
    const imagenFondo = screen.getByAltText('Fondo de cabecera');

    expect(imagenFondo).toBeInTheDocument();
    expect(imagenFondo).toHaveAttribute('src', '/header.jpg');
  });

  test('renderiza el logo de la empresa', () => {
    render(<Header />);

    const logo = screen.getByAltText('Nextcom');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/Nextcom.png');
  });

  test('renderiza el texto de descripción', () => {
    render(<Header />);

    // Buscamos una parte del texto para asegurarnos de que el párrafo está ahí
    const textoDescripcion = screen.getByText(/Add here any awards or things/i);

    expect(textoDescripcion).toBeInTheDocument();
  });
});
