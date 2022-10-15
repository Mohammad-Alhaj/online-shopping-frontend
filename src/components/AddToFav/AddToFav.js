import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFav, removeFavorite } from "../../store/favorite";
import { getData } from "../../store/API";
import cookie from "react-cookies";
import "./AddToFav.css";
import { Link } from "react-router-dom";

export default function AddToFav(props) {
  const { favoriteList } = useSelector((state) => state.favoriteSlice);
  const { items } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFav());
    dispatch(getData());
  }, [dispatch]);

  // Remove item from favorite list
  const handleRemove = (ele) => {
    dispatch(removeFavorite(ele.id));
  };
  return (
    <>
      <h2 className="page-title">Favorite List</h2>

      {favoriteList.length > 0 ? (
        <>
          {favoriteList
            .filter((ele) => ele.userID === parseInt(cookie.load("userID")))
            .map((ele) =>
              items
                .filter((item) => item.id === ele.itemID)
                .map((item) => (
                  <div className="container-fav" key={item.id}>
                    <Card
                      style={{ width: "18rem" }}
                      key={item.id}
                      className="my-4 ms-4"
                    >
                      <Link to={`/new-comm/card/${item.id}`}>
                        <Card.Img variant="top" src={item.image} />
                      </Link>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Button
                          variant="danger"
                          onClick={() => handleRemove(ele)}
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))
            )}
        </>
      ) : (
        <p className="empty">THE FAVORITE LIST IS EMPTY</p>
      )}
    </>
  );
}
