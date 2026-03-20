'use client';
// import Image from 'next/image';
import ProductCard from './ProductCard';
import { useListProducts } from '@/hooks/products/useProducts';

export default function ProductGrid() {
  const { data, isLoading, isError } = useListProducts();

  return (
    <>
      <section className="gridSection">
        {/* <div className="grid-box"> */}
        {data?.data.map((product) => (
          <div className="gridBox" key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </section>
    </>
  );
}
