import FlexibleImage from '@/app/components/FlexibleImage';
import ShoppingCard from './ShoppingCard';

export default function CheckoutCart() {
  return (
    <>
      <section className="checkoutMain">
        <div className="checkoutBox">
          <h2 className="summaryOrder">Resumen del pedido</h2>
          <div className="checkoutProductImage">
            <img src="/dosificador-rosa-resina-.jpg" alt="" />
            <img src="/dosificador-rosa-resina-.jpg" alt="" />
            <img src="/dosificador-rosa-resina-.jpg" alt="" />
          </div>
          <div>
            <div className="checkoutPrices">
              <span>Precio de referencia: </span>
              <span>30.30€</span>
            </div>
            <div className="checkoutPrices">
              <span>Descuento: </span>
              <span>-5.30€</span>
            </div>
            <div className="checkoutPrices">
              <span>Gastos de envio: </span>
              <span>3.50€</span>
            </div>
            <div className="checkoutPrices">
              <span>
                <strong>Subtotal: </strong>
              </span>
              <span>
                <strong>28.50€</strong>
              </span>
            </div>
          </div>
          <div className="confirmPurchase">
            <button>
              <strong>Comprar</strong>
            </button>
          </div>
        </div>
        <div className="paymentMethodBackground">
          <h1>Aceptamos</h1>
          <div className="paymentMethod">
            <img src="/Visa.svg" alt="visa" />
            <img src="/MasterCard.png" alt="" />
            <img src="/bizum.png" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
