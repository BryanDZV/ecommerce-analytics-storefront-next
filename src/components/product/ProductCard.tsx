import { Product } from '@/types/product';
import FlexibleImage from '@/app/components/FlexibleImage';
import { useCartStore } from '@/store/useCartStore';

//  type ProductCardProps = {
//    productName: string;
//    description: string;
//    price: number;
//    image: string;
//  };

type ProductCardProps = Product;

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  ...rest
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const product: Product = {
    id,
    name,
    description,
    price,
    image,
    ...rest,
  };
  return (
    <>
      <section className="productCard">
        <div className="backgroundCard">
          <FlexibleImage className="productImage" src={image} alt={name} fill />
        </div>
        <div className="product-description">
          <h3>{name}</h3>
          <strong>
            <p>{price}€</p>
          </strong>
        </div>
        <div className="addToCartContainer">
          <button
            className="addToCartButton"
            onClick={() => addToCart(product)}
          >
            <img src="/add-to-cart.png" alt="add to cart" />
          </button>
        </div>
      </section>
    </>
  );
}
