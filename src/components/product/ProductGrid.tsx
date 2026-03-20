'use client';
// import Image from 'next/image';
import ProductCard from './ProductCard';
import { products } from '@/mocks/mockProducts';
import { useListProducts } from '@/hooks/products/useProducts';

export default function ProductGrid() {
  const { data } = useListProducts();

  return (
    <>
      <section className="gridSection">
        {/* <div className="grid-box"> */}
        {products.map((product) => (
          <div className="gridBox" key={product.id}>
            <ProductCard
              // key={product.id}
              productName={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </section>
    </>
  );
}
