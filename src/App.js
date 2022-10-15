import Header from "./components/Header/Header";
import Cards from "./components/Cards/Cards";
import CardDetails from "./components/CardsDetails.js/CardsDetails";
import { Routes, Route } from "react-router-dom";
import AddToFav from "./components/AddToFav/AddToFav";
import Signin from "./components/Auth/Signin/Signin";
import { useSelector } from "react-redux";
import { When } from "react-if";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { isSignin } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <When condition={isSignin}>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/new-comm" element={<Cards />} />
          <Route path="/new-comm/favorite" element={<AddToFav />} />
          <Route path="/new-comm/card/:id" element={<CardDetails />} />
          <Route path="/new-comm/cart" element={<Cart />} />
        </Routes>
      </When>
      <Signin />
    </div>
  );
}

export default App;
