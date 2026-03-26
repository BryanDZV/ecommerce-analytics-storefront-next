'use client';

import { useFilteredProducts } from '@/hooks/products/useProducts';
import { useFilterStore } from '@/store/useFilterStore';
import ProductCard from './ProductCard';
import Pagination from '../Pagination';
import SkeletonCard from '../SkeletonCard';

export default function ProductGrid() {
  const { pageSize } = useFilterStore();
  const { data, isLoading, isError, isFetching } = useFilteredProducts();

  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Error al cargar productos
      </div>
    );

  const showSkeletons = isLoading || isFetching;

  return (
    <>
      <section className="gridSection">
        {showSkeletons
          ? [...Array(pageSize)].map((_, i) => <SkeletonCard key={i} />)
          : data?.data.map((product) => (
              <div className="gridBox" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
      </section>

      <Pagination />
    </>
  );
}
