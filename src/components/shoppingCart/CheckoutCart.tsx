export default function CheckoutCart() {
  return (
    <>
      <section className="checkoutMain">
        <div className="checkoutBox">
          <h2>Resumen del pedido</h2>
          <div className="checkoutProductImage">
            <img src="/dosificador-rosa-resina-.jpg" alt="" />
            <img src="/dosificador-rosa-resina-.jpg" alt="" />
            <img src="/dosificador-rosa-resina-.jpg" alt="" />
          </div>
          <div>
            <div className="checkoutPrices">
              <span>Precio de referencia: </span>
              <span>3.30€</span>
            </div>
            <div className="checkoutPrices">
              <span>Descuentos: </span>
              <span>-1.30€</span>
            </div>
            <div className="checkoutPrices">
              <span>Subtotal: </span>
              <span>2.00€</span>
            </div>
          </div>
          <div className="confirmPurchase">
            <button>Comprar Ahora 3 articulos</button>
          </div>
        </div>
        <div>
          <h1>Aceptamos</h1>
          <p>tarjeta</p>
          <p>Tarjeta</p>
          <p>Tarjeta</p>
        </div>
      </section>
    </>
  );
}
