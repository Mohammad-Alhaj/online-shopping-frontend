import { useDispatch, useSelector } from "react-redux";
import { getComments, addComments } from "../../../store/comments";
import { getAllUser } from "../../../store/users";
import cookie from "react-cookies";
import "./Comments.css";
import { useEffect, useRef } from "react";

import { Accordion } from "react-bootstrap";

export default function Comments({ itemId }) {
  const dispatch = useDispatch();
  const { commentsList } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.usersSlice);


  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getComments());
  }, [dispatch]);


  const commentsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      comment: commentsRef.current.value,
      userID: cookie.load("userID"),
      itemID: itemId,
    };
    dispatch(addComments(data));
    commentsRef.current.value = null;
  };
  return (
    <div className="comments-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <div className="show-all-comments">
            <Accordion.Header>Show all Comments</Accordion.Header>
          </div>
          <Accordion.Body>
            <>
              <section className="content-item" id="comments">
                <div className="container">
                  <div className="row_comment">
                    <div className="col-sm-8__">
                      <form onSubmit={handleSubmit}>
                        <div className="new_sumb">
                          <div className="new_comment">
                            <h3 className="pull-left">Add your comment</h3>
                          </div>
                          <div>
                            <button type="submit" className="add_comment">
                              Add
                            </button>
                          </div>
                        </div>

                        <fieldset>
                          <div className="user-comments">
                            <div className="col-sm-3 col-lg-2 hidden-xs">
                              <img
                                className="img-responsive"
                                alt="dummy-img"
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              />
                            </div>
                            <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                              <textarea
                                className="form-control"
                                id="message"
                                placeholder="Your message"
                                required=""
                                defaultValue={""}
                                ref={commentsRef}
                              />
                            </div>
                          </div>
                        </fieldset>
                      </form>
                      <h3> Comments</h3>

                      {commentsList.filter((ele) => ele.itemID === itemId)
                        .length ? (
                        <>
                          {commentsList
                            .filter((ele) => ele.itemID === itemId)
                            .map((ele) => (
                              <div key={ele.id}>
                                {userInfo
                                  .filter(
                                    (ele_user) => ele_user.id === ele.userID
                                  )
                                  .map((elem) => (
                                    <div
                                      className="media edit_bot_com"
                                      key={elem.id}
                                    >
                                      <p className="pull-left">
                                        {!elem.image ? (
                                          <img
                                            className="media-object"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            alt=""
                                          />
                                        ) : (
                                          <img
                                            className="media-object"
                                            src={elem.image}
                                            alt=""
                                          />
                                        )}
                                      </p>
                                      {/* <div> */}
                                      <div className="action_info">
                                        <div className="media-body">
                                          <h4 className="media-heading">
                                            {elem.username}
                                          </h4>

                                          <p className="comment_text">
                                            {ele.comment}
                                          </p>
                                          <ul className="list-unstyled list-inline media-detail pull-right"></ul>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </>
                      ) : (
                        <h2 style={{ color: "gray" }}>No Comments Yet</h2>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
