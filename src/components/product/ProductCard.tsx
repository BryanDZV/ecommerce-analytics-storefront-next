import Image from 'next/image';

export default function ProductCard() {
  return (
    <>
      <section className="product-card">
        <div className="background-card">
          <img src="/dosificador-rosa-resina-.jpg" alt="product" />
        </div>
        <div>
          <h3>titulo</h3>
        </div>
        <div>
          <p>precio</p>
        </div>
      </section>
    </>
  );
}
