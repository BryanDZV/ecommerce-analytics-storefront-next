'use client';

import Filtericon from './buttons/FilterIcon';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const LoginModal = dynamic(() => import('../components/LoginModal'), {
  ssr: false,
});

export default function Searchbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cart);
  const totalItems = cartItems.length;

  return (
    <>
      <div className="layerStatic">
        <div className="titleSearch">
          <div className="pointerEventsAuto">
            <Filtericon></Filtericon>
          </div>
        </div>
      </div>

      <div className="layerSticky">
        <div className="searchbarWrapper">
          <div className="titleBox">
            <div className="glassSearch">
              <img className="searchImage" src="/search.png" alt="" />
              <input
                className="inputSearch"
                type="text"
                placeholder="Busca tu producto"
                aria-label="Busca tu producto"
                title="Busca tu producto"
              />
            </div>

            <div className="cartUser">
              <Link href="/shopcart" className="cartLinkWrapper">
                {totalItems > 0 && (
                  <div className="itemCounterCartCircle">{totalItems}</div>
                )}
                <img
                  className="imagesOfSearchbar"
                  src="/shopping-cart.png"
                  alt="Cart"
                />
              </Link>

              <button type="button" onClick={() => setIsLoginOpen(true)}>
                <img
                  className="imagesOfSearchbar"
                  src="/person.png"
                  alt="user-icon"
                />
              </button>

              <Link href="/dashboard">
                <img
                  className="imagesOfSearchbar"
                  src="/dashboard.png"
                  alt="Dashboard"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isLoginOpen ? (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      ) : null}
    </>
  );
}
