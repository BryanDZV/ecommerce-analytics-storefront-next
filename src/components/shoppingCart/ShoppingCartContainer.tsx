'use client';
import ShoppingCard from '@/components/shoppingCart/ShoppingCard';
import { products } from '@/mocks/mockProducts';
import CheckoutCart from './CheckoutCart';
import { useCartStore } from '@/store/useCartStore';
export default function ShoppingCartContainer() {
  // const products = useCartStore((state) => state.)

  return (
    <>
      <div className="ShoppingCartMainContainer">
        <section className="mainShopContainer">
          {products.slice(3, 5).map((product) => (
            <div className="" key={product.id}>
              <ShoppingCard
                productName={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </section>
        <section>
          <CheckoutCart></CheckoutCart>
        </section>
      </div>
    </>
  );
}
