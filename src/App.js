

import { CartProvider } from './components/context/cart-context';
import Header from "./components/layout/Header";
import Meals from "./components/content/Meals";

function App() {

  return (
    <CartProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
