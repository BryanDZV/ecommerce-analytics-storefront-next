import Image from 'next/image';
export default function Searchbar() {
  return (
    <>
      <section>
        <div className="title-search">
          {/* A */}
          <div className="empty-box"></div>
          {/* B */}
          <div className="title-box">
            <h1>Tenemos lo que buscas</h1>
          </div>
          {/* C */}
          <div className="empty-box"></div>
          <div className="border-bottom-box">
            <img className="filter-image" src="/filter.png" alt="" />
          </div>
          <div className="border-bottom-box-search">
            <div className="glass-search">
              <img className="search-image" src="/search.png" alt="" />
              <input
                className="input-search"
                type="text"
                placeholder="Busca tu producto"
              />
            </div>

            <img className="filter-image" src="/shopping-cart.png" alt="" />
          </div>

          <div className="filter-button"></div>
        </div>

        {/* <div className="container">
          <div className="item">A</div>
          <div className="item expandido">
            <h1>Busca tu producto</h1>
          </div>
          <div className="item">C</div>
          <div className="item">
            <img className="filter-image" src="/filter.png" alt="filter" />
          </div>
          <div className="item">E</div>
        </div> */}

        {/* <div>
          <div className="bg-marron">
            <img
              className="w-[10%]"
              src="/shopping-cart.png"
              alt="shopping cart"
            />
          </div>
        </div> */}
      </section>
    </>
  );
}
