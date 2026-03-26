import { getProductById } from '@/services/productService';
import FlexibleImage from '@/app/components/FlexibleImage';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import SearchbarBack from '@/components/SearchbarBack';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <body>
      <Header />
      <SearchbarBack></SearchbarBack>
      <section className="productDetailPage">
        <div className="productDetailContainer">
          <div className="leftColumn">
            <div className="productImageWrapper">
              <FlexibleImage
                className="imageProductDescription"
                src={product.image}
                alt={product.name}
                fill
              />
            </div>

            <div className="colorSelector">
              <img src="/circles.png" alt="Colores disponibles" />
            </div>

            <div className="storeReviews">
              <p>Evaluacion de la tienda 4.70/5</p>
            </div>
          </div>

          {/* COLUMNA CENTRAL: Información del producto */}
          <div className="productInfo">
            <p>Category: {product.category}</p>
            <h1>{product.name}</h1>
            <p className="priceDescription">
              <strong>{product.price}€</strong>
            </p>
            <p>Peso: 2.6kg</p>
            <div className="description">
              <p>
                {product.description ||
                  'No hay descripción disponible para este producto.'}
              </p>
              <p>
                La descripción de productos es el elemento vital en un sitio web
                que tiene por objetivo atraer, informar y convencer al
                consumidor de comprar un artículo. Este apartado se conforma por
                las características, funciones y valores por las que el producto
                se destaca: qué lo hace diferente y por qué da valor al usuario.
              </p>
            </div>
            <p>Read reviews: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <div className="productValuesSection">
              <p>Valores del producto</p>
              <div className="productValues">
                <img src="/recycle.png" alt="recicle" />
              </div>
            </div>
          </div>

          <div className="buyDescriptionPage">
            <hr className="quantityDivider" />
            <div className="descriptionButtons">
              <button className="actionBtn">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="reviewsContainerDetails">
          <div className="reviewsStars">
            <strong>Reviews</strong>
            <div>
              <select>
                <option>Most Recent</option>
              </select>
              <select>
                <option>Five stars</option>
              </select>
            </div>
          </div>

          <div className="reviewsUser">
            <p>Ana fernandez</p>
            <p>⭐️⭐️⭐️⭐️⭐️</p>
          </div>
          <div className="reviewsComments">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              reprehenderit eligendi necessitatibus inventore, dolore et amet
              nobis id maiores sint provident officia nostrum dignissimos at
              laudantium eaque deserunt doloremque dolores!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </body>
  );
}
