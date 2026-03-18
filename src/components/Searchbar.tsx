'use client'

import Image from 'next/image';
import Filtericon from './buttons/FilterIcon';
import LoginModal from './LoginModal'
import { useState } from 'react';

export default function Searchbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  return (
    <>
      <section>
        <div className="title-search">
          {/* <div className="filter-box"> */}
          <Filtericon></Filtericon>
          {/* </div> */}

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
              <button type='button' onClick={() => setIsLoginOpen(true)}>
              <img className="filter-image" src="/person.png" alt="user-icon" />
              </button>
            </div>
          </div>
          {/* medio */}

          <div className="border-bottom-box-search">
            <hr />
          </div>
        </div>
      </section>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />  
    </>
  );
}
