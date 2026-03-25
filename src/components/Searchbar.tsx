'use client';

import Filtericon from './buttons/FilterIcon';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const LoginModal = dynamic(() => import('../components/LoginModal'), {
  // In case we need a loading effect
  // loading: () =>

  // Disables Server-side rendering
  ssr: false,
});

export default function Searchbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const cartItems = useCartStore((state) => state.cart);

  const totalItems = cartItems.length;
  return (
    <>
      <section>
        <div className="titleSearch">
          <div className="">
            <Filtericon></Filtericon>
          </div>

          <div className="titleBox">
            <div className="glassSearch">
              <img className="searchImage" src="/search.png" alt="" />
              <input
                className="inputSearch"
                type="text"
                placeholder="Busca tu producto"
                // Properties to improve web accessibility
                aria-label="Busca tu producto"
                title="Busca tu producto"
              />
            </div>
            <div className="cartUser">
              <Link href="/shopcart">
                {totalItems > 0 && (
                  <div className="itemCounterCartCircle">{totalItems}</div>
                )}
                <img
                  className="filterImage"
                  src="/shopping-cart.png"
                  alt="Filter Image"
                />
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
