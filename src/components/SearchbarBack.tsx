'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const LoginModal = dynamic(() => import('../components/LoginModal'), {
  ssr: false,
});

export default function SearchbarBack() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cart);
  const totalItems = cartItems.length;

  return (
    <>
      <section className="">
        <div className="searchbarBackHome">
          <div className="cartUserBackHome">
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

            <Link href="/">
              <img className="imagesOfSearchbar" src="/home.png" alt="Home Page" />
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
