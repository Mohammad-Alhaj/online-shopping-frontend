import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";
import { getDataById } from "../../store/API";

import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

import "./CardsDetails.css";
import { addCart } from "../../store/cart";
import Comments from "./comments/Comments";
import cookie from "react-cookies";

export default function CardDetails(props) {
  const { isLoading, oneItem } = useSelector((state) => state.items);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataById(id));
  }, [dispatch, id]);

  const handleAddToCard = (id) => {
    const sendData = {
      addToCart: true,
      amount: 0,
      userID: cookie.load("userID"),
      itemID: id,
    };
    dispatch(addCart(sendData));
  };

  return !isLoading ? (
    <div className="container-card-details">
      <div className="card-details">
        <Card
          style={{ maxWidth: "120rem" }}
          key={oneItem.id}
          className="card-item-details col"
        >
          <Card.Img
            variant="top"
            src={
              oneItem.image
                ? oneItem.image
                : "https://cdn.pixabay.com/photo/2015/06/10/16/36/mark-804938_640.jpg"
            }
          />
          <Card.Body className="body-text-card">
            <Card.Title className="text">{oneItem.title}</Card.Title>
            <Card.Text className="text">{oneItem.price}</Card.Text>
            <Card.Text className="text-dis">{oneItem.description}</Card.Text>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCard(oneItem.id)}
            >
              Add to card
            </button>
          </Card.Body>
        </Card>
      </div>
      <Comments itemId={oneItem.id} />
    </div>
  ) : (
    <CircularProgress />
  );
}
