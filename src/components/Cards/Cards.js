
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getData, postData, updateData, deleteCard } from "../../store/API";
import UpdateCards from "./UpdataCards";
import PostCards from "./postCard";
import DeleteCard from "./DeleteCard";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "./Card.css";
import cookie from "react-cookies";
import { addFav } from "../../store/favorite";


export default function Cards(props) {
  const { items, isLoading, error } = useSelector((state) => state.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const postDatas = (data) => {
    dispatch(postData(data));
  };

  const updatedata = (data) => {
    dispatch(updateData(data));
  };
  const deleteCards = (data) => {
    dispatch(deleteCard(data));
  };

  // handle favorite page
  const handleAddToFav = (data) => {
    let sendData = {
      addToFiv: true,
      userID: cookie.load("userID"),
      itemID: data.id,
    };
    dispatch(addFav(sendData));
  };

  return !isLoading ? (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <PostCards postData={postDatas} />
      <div className="container-cards">
        <div className="cards">
          {items.map((ele, idx) => (
            <div className="product-card" key={ele.id}>
              <div className="badge">
                {ele.userID === parseInt(cookie.load("userID"))
                  ? "My Item"
                  : null}
              </div>
              <div className="product-tumb">
                <Link to={`/new-comm/card/${ele.id}`}>
                  <img
                    alt="product"
                    src={
                      ele.image
                        ? ele.image
                        : "https://cdn.pixabay.com/photo/2015/06/10/16/36/mark-804938_640.jpg"
                    }
                  />
                </Link>
              </div>

              <div className="product-details">
                <h4>
                  <p className="title-card">{ele.title}</p>
                </h4>
                <p>{ele.description}</p>
                <div className="product-bottom-details">
                  <div className="product-price">
                    <small>$96.00</small>
                    {ele.price}
                  </div>
                  <div className="product-links">
                    <div onClick={() => handleAddToFav(ele)}>
                      <i className="fa fa-heart" />
                    </div>
                    <div>
                      <DeleteCard id={ele.id} deleteCards={deleteCards} />
                    </div>
                    <div>
                      <UpdateCards data={updatedata} id={ele.id} />
                    </div>
                  </div>
                </div>
            
                  <a href={`/new-comm/card/${ele.id}`}>More detail</a>
       
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <CircularProgress />
  );
}
