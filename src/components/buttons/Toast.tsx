'use client';

import { useToastStore } from '@/store/useToastStore';

export default function Toast() {
  const { message } = useToastStore();

  if (!message) return null;

  return (
    <div className="toastContainer">
      <div className="toastContent">
        <img src="/shopping-cart.png" alt="Cart Check" className="toastIcon" />
        <p className="toastText">{message}</p>
      </div>
    </div>
  );
}
