import FlexibleImage from '@/app/components/FlexibleImage';

type ProductCardProps = {
  productName: string;
  description: string;
  price: number;
  image: string;
};

export default function ShoppingCard({
  productName,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <>
      <div className="mainShopCart">
        <div className="productShopImage">
          <FlexibleImage
            className="productImageShopcart"
            src={image}
            alt={productName}
            fill
          />
        </div>
        <div>
          <div className="nameDescriptionBox">
            <div className="nameDescriptionText">
              <strong>{productName}</strong>
              <p>{description}</p>
            </div>
            <div>
              <button className="removeProduct">
                <img width={40} src="/trash.png" alt="close" />
              </button>
            </div>
          </div>
          <div className="priceAndQuantity">
            <span>Precio por unidad:</span>
            <span>{price}€</span>
            <span>Cantidad: </span>
            {/* <div>
              <input className="quantityProduct" type="number" />
            </div> */}

            <span>Subtotal: </span>
            <span>{price}€</span>
          </div>
          <hr className="separationDelivery" />
          <div className="deliveryDescription">
            <span>Entrega en 2-3 dias laborables</span>
          </div>
        </div>
      </div>
    </>
  );
}
