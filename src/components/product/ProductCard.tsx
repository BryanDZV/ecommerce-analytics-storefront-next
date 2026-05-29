import FlexibleImage from '@/components/FlexibleImage';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';
import Link from 'next/link';

import { useToastStore } from '@/store/useToastStore';
type ProductCardProps = {
  product: Product;
};
// This component represents a single product card in the product grid.
export default function ProductCard({ product }: ProductCardProps) {
  // We use the cart store to get the addToCart function, which allows us to add products to the cart when the button is clicked.
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  const handleAddToCart = () => {
    addToCart(product); // Lógica de tu carrito
    showToast('¡Producto añadido al carrito!'); // ¡Esto dispara el popup!
  };

  return (
    <section className="productCard">
      <Link href={`/products/${product.id}`}>
        <div className="backgroundCard">
          <FlexibleImage
            className="productImage"
            src={product.image}
            alt={product.name}
            fill
          />
        </div>
      </Link>
      <div className="product-description">
        <h3>{product.name}</h3>
        <strong>
          <p>{product.price}€</p>
        </strong>
        <div className="addToCartContainerbutton">
          <button className="addToCartButton" onClick={handleAddToCart}>
            <img src="/add-to-cart.png" alt="añadir al carrito" />
          </button>
        </div>
      </div>
    </section>
  );
}
