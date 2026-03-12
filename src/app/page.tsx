import Image from 'next/image';
import Header from '../components/Header';
import Searchbar from '@/components/Searchbar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <body className="bg-[#e6e6e6]">
        {/* HEADER */}
        <Header></Header>

        {/* BOTON BUSQUEDA, FILTROS Y CARRITO */}
        <Searchbar></Searchbar>

        {/* FOOTER */}
        <Footer></Footer>
      </body>
    </>
  );
}
