'use client';

export default function Filtericon() {
  const abrirDesdeElHeader = () => {
    document.getElementById('sidebar-movil')?.classList.add('open');
    document.getElementById('overlay-movil')?.classList.add('open');
  };
  return (
    <>
      <div className="filterBox">
        <button className="filterButton" onClick={abrirDesdeElHeader}>
          <img className="filterImage" src="/filter.png" alt="filter image" />
        </button>
      </div>
    </>
  );
}
