import Image from 'next/image';
export default function Searchbar() {
  return (
    <>
      <section>
        <div className="title-search">
          <div className="filter-box">
            <img
              className="filter-image"
              src="/filter.png"
              alt="filter image"
            />
          </div>

          <div className="title-box">
            <div className="glass-search">
              <img className="search-image" src="/search.png" alt="" />
              <input
                className="input-search"
                type="text"
                placeholder="Busca tu producto"
              />
            </div>
            <div className="cart-user">
              <img className="filter-image" src="/shopping-cart.png" alt="" />
              <img className="filter-image" src="/person.png" alt="" />
            </div>
          </div>
          {/* medio */}

          <div className="border-bottom-box-search">
            <hr />
          </div>
        </div>
      </section>
    </>
  );
}
