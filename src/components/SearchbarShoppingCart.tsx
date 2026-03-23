'use client';

import Filtericon from './buttons/FilterIcon';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const LoginModal = dynamic(() => import('../components/LoginModal'), {
  ssr: false,
});

export default function SearchbarShoppingCart() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <section>
        <div className="titleSearch">
          <div className="filterIconContainer">
            <Filtericon></Filtericon>
          </div>

          <div className="titleBox">
            <div className="glassSearch">
              <img className="searchImage" src="/search.png" alt="" />
              <input
                className="inputSearch"
                type="text"
                placeholder="Busca tu producto"
              />
            </div>
            <div className="cartUser">
              <Link href="/app">
                <img className="imagesOfSearchbar" src="/home.png" alt="" />
              </Link>

              <button type="button" onClick={() => setIsLoginOpen(true)}>
                <img
                  className="imagesOfSearchbar"
                  src="/person.png"
                  alt="user-icon"
                />
              </button>
            </div>
          </div>
          {/* medio */}

          <div className="borderBottomBoxSearch">
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
