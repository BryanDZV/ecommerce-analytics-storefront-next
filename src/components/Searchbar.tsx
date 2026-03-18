'use client';

import Filtericon from './buttons/FilterIcon';
import { useState } from 'react';
import dynamic from 'next/dynamic';
// import Link from 'next/link';
const LoginModal = dynamic(() => import('../components/LoginModal'), {
  // In case we need a loading effect
  // loading: () =>

  // Disables Server-side rendering
  ssr: false,
});

export default function Searchbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
              {/* <Link href="/shopcart"> */}
              <img className="filter-image" src="/shopping-cart.png" alt="" />
              {/* </Link> */}

              <button type="button" onClick={() => setIsLoginOpen(true)}>
                <img
                  className="filter-image"
                  src="/person.png"
                  alt="user-icon"
                />
              </button>
            </div>
          </div>
          {/* medio */}

          <div className="border-bottom-box-search">
            <hr />
          </div>
        </div>
      </section>

      {isLoginOpen ? (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      ) : null}
    </>
  );
}
