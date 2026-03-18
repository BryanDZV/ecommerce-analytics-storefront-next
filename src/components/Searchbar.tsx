'use client';
import Image from 'next/image';
import Filtericon from './buttons/FilterIcon';
// import { useNavigate } from 'react-router-dom';
import Link from 'next/link';

export default function Searchbar() {
  return (
    <>
      <section>
        <div className="title-search">
          <Filtericon></Filtericon>

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
              <Link href="/shopcart">
                <img className="filter-image" src="/shopping-cart.png" alt="" />
              </Link>

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
