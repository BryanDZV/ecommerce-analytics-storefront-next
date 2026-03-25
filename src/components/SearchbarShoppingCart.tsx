'use client';

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
          <div className="filterIconContainer"></div>

          <div className="titleBox">
            <div className="glassSearch">
              <img className="searchImage" src="/search.png" alt="" />
              <input
                className="inputSearch"
                type="text"
                placeholder="Search product"
                aria-label='Search product'
                title='Busca tu producto'
              />
            </div>
            <div className="cartUser">
              <Link href="/">
                <img className="imagesOfSearchbar" src="/home.png" alt="Home" />
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
