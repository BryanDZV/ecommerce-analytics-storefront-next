import { Product } from '@/types/product';
import { products } from '@/mocks/mockProducts';
import Image from 'next/image';

type ProductCardProps = {
  productName: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({
  productName,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <>
      <section className="product-card">
        <div className="background-card">
          <img src={image} alt="product" />
        </div>
        <div>
          <h3>{productName}</h3>
        </div>
        <div>
          <p>{price}</p>
        </div>
      </section>
    </>
  );
  // return (
  //   <>
  //     <section className="product-card">
  //       <div className="background-card">
  //         <img src="/dosificador-rosa-resina-.jpg" alt="product" />
  //       </div>
  //       <div>
  //         <h3>titulo</h3>
  //       </div>
  //       <div>
  //         <p>precio</p>
  //       </div>
  //     </section>
  //   </>
  // );
}
