import Image from 'next/image';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <>
      <section className="grid-section">
        <div className="grid-box">
          <ProductCard></ProductCard>
        </div>
        <div className="grid-box">
          <ProductCard></ProductCard>
        </div>
        <div className="grid-box">
          <ProductCard></ProductCard>
        </div>
        <div className="grid-box">
          <ProductCard></ProductCard>
        </div>
        {/* <div className="grid-box">5</div>
        <div className="grid-box">6</div>
        <div className="grid-box">7</div>
        <div className="grid-box">8</div> */}
      </section>
    </>
  );
}
