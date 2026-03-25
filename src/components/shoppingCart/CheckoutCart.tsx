import FlexibleImage from '@/app/components/FlexibleImage';
import ShoppingCard from './ShoppingCard';
import { useCartStore } from '@/store/useCartStore';
import { useDiscountStore } from '@/store/useDiscountStore';

export default function CheckoutCart() {
  const cart = useCartStore((state) => state.cart)

  const code = useDiscountStore((state) => state.code)
  const appliedCode = useDiscountStore((state) => state.appliedCode)
  const discountAmount = useDiscountStore((state) => state.discountAmount)
  const errorMessage = useDiscountStore((state) => state.errorMessage)
  const successMessage = useDiscountStore((state) => state.successMessage)
  const setCode = useDiscountStore((state) => state.setCode)
  const applyCode = useDiscountStore((state) => state.applyCode)
  const resetDiscount = useDiscountStore((state) => state.resetDiscount) 

  const subtotal = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity
  }, 0)

  const total = subtotal - discountAmount

  const displayedImages = cart.slice(0, 3)

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
              <span>Subtotal: </span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="checkoutPrices">
              <span>Descuento: </span>
              <span>- {discountAmount.toFixed(2)} €</span>
            </div>
            <div className="checkoutPrices">
              <span>Gastos de envio: </span>
              <span>GRATIS</span>
            </div>
            <div className="checkoutPrices">
              <span>
                <strong>Total: </strong>
              </span>
              <span>
                <strong>{total.toFixed(2)} €</strong>
              </span>      
            </div>
            <div className='checkoutDiscountBox'>
              <span>
                <input 
                  className='checkoutDiscountInput'
                  type="text"
                  placeholder='Discount code'
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
              </span>
              <span>
                <button 
                 type='button'
                 className='checkoutDiscountButton'
                 onClick={() => applyCode(subtotal)}
                >Apply</button>
              </span>
            </div>
            {errorMessage &&(
              <p className='checkoutDiscountError'>{errorMessage}</p>
            )}

            {successMessage &&(
              <p className='checkoutDiscountSuccess'>{successMessage}</p>
            )}

            {appliedCode &&(
              <div className='checkoutAppliedCode'>
                <span>Applied code: {appliedCode}</span>
              <button
                type='button'
                className='checkoutResetCodeButton'
                onClick={resetDiscount}
              ><img width={20} src="/trash.png" alt="trash"/></button>
            </div>    
          )}
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
