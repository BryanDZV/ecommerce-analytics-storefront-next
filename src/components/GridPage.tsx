'use client';
import ProductGrid from './product/ProductGrid';
import SideBar from './Sidebar';

export default function GridPage() {
  const abrirFiltros = () => {
    document.getElementById('sidebar-movil')?.classList.add('open');
    document.getElementById('overlay-movil')?.classList.add('open');
  };

  const cerrarFiltros = () => {
    document.getElementById('sidebar-movil')?.classList.remove('open');
    document.getElementById('overlay-movil')?.classList.remove('open');
  };

  return (
    <>
      <button
        className="mobileFilterBtn"
        onClick={abrirFiltros}
        aria-label="Show filters"
      ></button>

      <div className="mainGridPage">
        <div
          id="overlay-movil"
          className="filterOverlay"
          onClick={cerrarFiltros}
        ></div>

        <div id="sidebar-movil" className="sidebar-grid">
          <button className="closeFilterBtnMobile" onClick={cerrarFiltros}>
            ✕ Cerrar
          </button>
          <SideBar></SideBar>
        </div>

        {/* PRODUCTOS */}
        <div>
          <ProductGrid></ProductGrid>
        </div>
      </div>
    </>
  );
}
