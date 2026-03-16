'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Filtericon() {
  return (
    <>
      {' '}
      <div className="filter-box">
        {/* <button onClick={toggleFilters} className="filter-button"> */}
        <button className="filter-button">
          <img className="filter-image" src="/filter.png" alt="filter image" />
        </button>
      </div>
    </>
  );
}
