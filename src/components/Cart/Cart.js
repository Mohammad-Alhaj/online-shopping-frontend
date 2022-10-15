import { useSelector, useDispatch } from "react-redux";
import { getAllCarts, removeCartItem } from "../../store/cart";
import { getData } from "../../store/API";
import "./Cart.css";
import { useEffect } from "react";
export default function Cart(props) {
  const { cartList } = useSelector((state) => state.cartSlice);
  const { items } = useSelector((state) => state.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCarts());
    dispatch(getData());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <>
      <h2 className="page-title">Shopping Cart</h2>
      {cartList.length > 0 ? (
        <>
          <div className="subtitle-item cart-container">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Action</p>
          </div>
          {cartList.map((cart) =>
            items
              .filter((item) => item.id === cart.itemID)
              .map((ele) => (
                <div className="" key={ele.id}>
                  <div className="cart-container">
                    <div className="item">
                      <input
                        type="image"
                        className="item-image"
                        src={ele.image}
                        alt="image"
                      />
                      <div className="item-info">{ele.title}</div>
                    </div>

                    <div className="price">{ele.price}</div>
                    <div className="quantity">{cart.amount}</div>
                    <div className="btn-item-cart">
                      <button
                        className="remove btn-cart"
                        onClick={() => handleRemove(cart.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </>
      ) : (
        <p className="empty">THE CART IS EMPTY</p>
      )}
    </>
  );
}
