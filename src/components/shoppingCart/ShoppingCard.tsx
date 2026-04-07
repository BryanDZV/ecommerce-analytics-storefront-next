'use client';
import FlexibleImage from '@/components/FlexibleImage';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '@/types/cart';
import { Divide } from 'lucide-react';
import { useState } from 'react';

//we define the props for the ShoppingCard component, which will receive a product of type CartItem
type ShoppingCardProps = {
  product: CartItem;
};

export default function ShoppingCard({ product }: ShoppingCardProps) {
  //we use the useCartStore hook to get the removeFromCart function from our cart store
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const cartItems = useCartStore((state) => state.cart);
  const totalItems = cartItems.length;

  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);

    setTimeout(() => {
      removeFromCart(product.id);
    }, 800);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (Number.isNaN(value)) {
      return;
    }
    if (value === 0) {
      setShowConfirmModal(true);
      return;
    }
    if (value < 0) {
      return;
    }
    updateQuantity(product.id, value);
  };

  return (
    <>
      {showConfirmModal && (
        <div className="confirmOverlay">
          <div className="confirmModal">
            <p className="confirmModalTitle">
              Eliminar el producto de la cesta
            </p>

            <div className="confirmActions">
              <button
                type="button"
                className="confirmCancelButton"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="confirmDeleteButton"
                onClick={() => {
                  removeFromCart(product.id);
                  setShowConfirmModal(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`mainShopCart ${isRemoving ? 'fade-out' : ''}`}>
        <div className="productContainerImage">
          <div className="productShopImage">
            <FlexibleImage
              className="imageShopCart"
              src={product.image}
              alt={product.name}
              fill
            />
          </div>
        </div>
        <div>
          <div className="nameDescriptionBox">
            <div className="nameDescriptionText">
              <strong>{product.name}</strong>
              <p>{product.description}</p>
            </div>
            <div>
              <button className="removeProduct" onClick={handleRemove}>
                <img width={40} src="/trash.png" alt="close" />
              </button>
            </div>
          </div>
          <div className="priceAndQuantity">
            <span>Precio por unidad:</span>
            <span>{Math.round(product.price)}€</span>
            <span>Cantidad: </span>
            {
              <div>
                <input
                  value={product.quantity}
                  className="quantityProduct"
                  type="number"
                  min="0"
                  onChange={handleQuantityChange}
                  aria-label='Indicate Quantity'
                />
              </div>
            }

            <span>Subtotal: </span>
            <span>{product.price * product.quantity}€</span>
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
