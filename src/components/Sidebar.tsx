import Image from 'next/image';
// import { useState } from 'react';
import Filtericon from './buttons/FilterIcon';

export default function SideBar() {
  // const [filtersOpen, setFiltersOpen] = useState(false);

  // const toggleFilters = () => {
  //   setFiltersOpen(!filtersOpen);
  // };
  return (
    <>
      <section className="filterPanel">
        <div>
          <h4>Orden</h4>
          <select>
            <option>Menor precio</option>
            <option>Mayor precio</option>
          </select>
        </div>
        <div className="filterSection">
          <h4>Tipo</h4>
          <label>
            <input type="checkbox" /> Ropa
          </label>
          <label>
            <input type="checkbox" /> Tecnología
          </label>
          <label>
            <input type="checkbox" /> Home
          </label>
          <label>
            <input type="checkbox" /> Accesorios
          </label>
        </div>
      </section>
    </>
  );
}
