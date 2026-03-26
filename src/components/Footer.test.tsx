import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Componente Footer', () => {
  test('renderiza el logo principal de la empresa', () => {
    render(<Footer />);

    // Buscamos el logo por su texto alternativo
    const logo = screen.getByAltText('Nextcom');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', './Nextcom.png');
  });

  test('renderiza las secciones de texto "Company" y "Products"', () => {
    render(<Footer />);

    // Verificamos que los títulos de las secciones estén presentes
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();

    // Verificamos que algunos de los enlaces/textos internos existan
    expect(screen.getByText('About us')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  test('renderiza las imágenes de redes sociales', () => {
    render(<Footer />);

    // Como las imágenes de redes sociales no tienen un texto alternativo (alt="")
    // útil, no podemos usar getByAltText fácilmente.
    // En su lugar, buscamos todas las imágenes y filtramos por su 'src'
    const imagenes = screen.getAllByRole('img');

    const instagramImg = imagenes.find(
      (img) => img.getAttribute('src') === './instagram.png'
    );
    const facebookImg = imagenes.find(
      (img) => img.getAttribute('src') === './facebook.png'
    );
    const placeholderImg = imagenes.find(
      (img) => img.getAttribute('src') === './placeholder.png'
    );

    expect(instagramImg).toBeInTheDocument();
    expect(facebookImg).toBeInTheDocument();
    expect(placeholderImg).toBeInTheDocument();
  });

  test('renderiza los textos de la parte inferior (copyright y legales)', () => {
    render(<Footer />);

    // Verificamos el texto del copyright
    expect(screen.getByText('©2026 | Technologies')).toBeInTheDocument();

    // Verificamos los textos legales
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Accesibility')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });
});
