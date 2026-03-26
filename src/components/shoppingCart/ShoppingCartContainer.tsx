'use client';
import ShoppingCard from '@/components/shoppingCart/ShoppingCard';
import CheckoutCart from './CheckoutCart';
import { useCartStore } from '@/store/useCartStore';
import FlexibleImage from '@/app/components/FlexibleImage';

export default function ShoppingCartContainer() {
  //we use the hook to obtain the products in the cart
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.length;
  return (
    <>
      {totalItems == 0 && (
        <div className="noProductsEmpty">
          <p>Aquí no hay ningún artículo</p>
          <div className="noProductsEmptyImage">
            <FlexibleImage
              src="/shopping-empty.png"
              alt="Carrito vacío"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      <div className="ShoppingCartMainContainer">
        {totalItems >= 1 && (
          <>
            <section className="mainShopContainer">
              {/* we map the products in the cart and render a ShoppingCard for each one */}
              {cart.map((product) => (
                <div className="" key={product.id}>
                  <ShoppingCard product={product} />
                </div>
              ))}
            </section>
            <section>
              <CheckoutCart></CheckoutCart>
            </section>
          </>
        )}
      </div>
    </>
  );
}
