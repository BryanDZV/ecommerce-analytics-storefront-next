import Image from 'next/image';
export default function Searchbar() {
  return (
    <>
      <section>
        <div className="flex items-center justify-center">
          <hr />
          <h1>Busca tu producto</h1>
          <hr />
        </div>

        <div>
          <hr />
          <div className="w-[30%] bg-[#d0ccb9]">
            <img className="w-[10%]" src="/filter.png" alt="filter" />
          </div>
          <div className="bg-marron">
            <img
              className="w-[10%]"
              src="/shopping-cart.png"
              alt="shopping cart"
            />
          </div>
        </div>
      </section>
    </>
  );
}
