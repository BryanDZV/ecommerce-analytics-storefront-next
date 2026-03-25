import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from './Sidebar';

describe('Componente SideBar', () => {
  test('renderiza los títulos principales de los filtros', () => {
    render(<SideBar />);

    // Verificamos que los textos principales estén en la pantalla
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Categoría')).toBeInTheDocument();
    expect(screen.getByText('Precio')).toBeInTheDocument();
    expect(screen.getByText('Orden Alfabético')).toBeInTheDocument();
  });

  test('renderiza las opciones de categoría (checkboxes)', () => {
    render(<SideBar />);

    // Buscamos los checkboxes por la etiqueta de texto que los acompaña
    const checkRopa = screen.getByLabelText('Ropa');
    const checkTecnologia = screen.getByLabelText('Tecnología');
    const checkHome = screen.getByLabelText('Home');
    const checkAccesorios = screen.getByLabelText('Accesorios');

    // Verificamos que existan y sean del tipo checkbox
    expect(checkRopa).toBeInTheDocument();
    expect(checkRopa).toHaveAttribute('type', 'checkbox');
    expect(checkTecnologia).toBeInTheDocument();
    expect(checkHome).toBeInTheDocument();
    expect(checkAccesorios).toBeInTheDocument();

    // Verificamos que por defecto no estén marcados
    expect(checkRopa).not.toBeChecked();
  });

  test('renderiza el selector de precio con sus opciones', () => {
    render(<SideBar />);

    // Buscamos el select por las opciones que contiene (o usando getByRole)
    const selectPrecio = screen.getByRole('combobox');
    expect(selectPrecio).toBeInTheDocument();

    // Verificamos que las opciones existan dentro del documento
    expect(
      screen.getByRole('option', { name: 'Precio mas alto' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Precio mas bajo' })
    ).toBeInTheDocument();
  });

  test('renderiza los botones de orden alfabético', () => {
    render(<SideBar />);

    // Buscamos los botones por su texto y su rol
    const btnAZ = screen.getByRole('button', { name: 'A-Z' });
    const btnZA = screen.getByRole('button', { name: 'Z-A' });

    expect(btnAZ).toBeInTheDocument();
    expect(btnZA).toBeInTheDocument();
  });

  test('permite interactuar con los checkboxes y el select', () => {
    // Aunque tu componente aún no tenga lógica vinculada a estos inputs,
    // podemos probar que el DOM nativo permite la interacción.
    render(<SideBar />);

    const checkRopa = screen.getByLabelText('Ropa');
    const selectPrecio = screen.getByRole('combobox');

    // Simulamos que el usuario marca la casilla de "Ropa"
    fireEvent.click(checkRopa);
    expect(checkRopa).toBeChecked();

    // Simulamos que el usuario cambia la opción del select
    fireEvent.change(selectPrecio, { target: { value: 'Precio mas bajo' } });

    // Aquí el value es '' porque en tu componente pusiste <option value="">.
    // Lo ideal sería que en tu componente tuvieran values reales como value="asc" o value="desc"
  });
});
