import "./App.css";
import { ProductDetails } from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

const App = () => (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/products" Component={ProductList} />
          <Route path="/products/:id" Component={ProductDetails} />
          <Route path="/cart" Component={Cart} />
          <Route path="/checkout" Component={Checkout} />
          <Route path="/login" Component={Login} />
        </Routes>
      </Router>
    </CartProvider>
  </AuthProvider>
);

export default App;
