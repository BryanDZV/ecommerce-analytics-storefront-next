import Header from '@/components/Header';
import ShoppingCartContainer from '@/components/shoppingCart/ShoppingCartContainer';
import Footer from '@/components/Footer';
import SearchbarShoppingCart from '@/components/SearchbarShoppingCart';
export default function CartPage() {
  return (
    <main>
      <Header></Header>
      <SearchbarShoppingCart></SearchbarShoppingCart>
      <ShoppingCartContainer></ShoppingCartContainer>
      <Footer></Footer>
    </main>
  );
}
