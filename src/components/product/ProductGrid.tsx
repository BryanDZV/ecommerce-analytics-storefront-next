import Image from 'next/image';
import ProductCard from './ProductCard';
import SideBar from '../Sidebar';
import { Product } from '@/types/product';
import { products } from '@/mocks/products';
export default function ProductGrid() {
  return (
    <>
      <section className="grid-section">
        {products.map((product) => (
          <div className="grid-box" key={product.id}>
            <ProductCard
              productName={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}

        {/* <div className="grid-box">
          <ProductCard></ProductCard>
        </div>
        <div className="grid-box">
          <ProductCard></ProductCard>
        </div>
        <div className="grid-box">
          <ProductCard></ProductCard>
        </div> */}
        {/* <div className="grid-box">5</div>
        <div className="grid-box">6</div>
        <div className="grid-box">7</div>
        <div className="grid-box">8</div> */}
      </section>
    </>
  );
}
