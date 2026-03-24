'use client';
// import GridPage from './GridPage';
import { useState } from 'react';
// import Filtericon from './buttons/FilterIcon';
// import { products } from '@/mocks/mockProducts';
// import ProductCard from './product/ProductCard';

export default function SideBar() {
  const [valor, setValor] = useState(50);

  const manejarCambio = (event: any) => {
    setValor(event.target.value);
  };
  return (
    <>
      <dialog open className="mainShopFilterContainer">
        <div>
          <span className="filterTitle">Filtros</span>
        </div>
        <hr />

        <section className="filtersPanel">
          <div className="titleFilter">
            <span className="categoryTitle">Categoría</span>
          </div>
          <div className="filtersSection">
            <label>
              <input type="checkbox" />
              Ropa
            </label>
            <label>
              <input type="checkbox" />
              Tecnología
            </label>
            <label>
              <input type="checkbox" />
              Home
            </label>
            <label>
              <input type="checkbox" />
              Accesorios
            </label>
          </div>
          <hr />
          <div className="titleFilter">
            <span>Precio</span>
          </div>
          <div className="priceFilter">
            <select>
              <option value="">Precio mas alto</option>
              <option value="">Precio mas bajo</option>
            </select>
          </div>

          <hr />
          <div className="alphabeticOrder">
            <span>Orden Alfabético</span>
            <br />

            <button>A-Z</button>
            <button>Z-A</button>
          </div>
        </section>
      </dialog>
    </>
  );
}
