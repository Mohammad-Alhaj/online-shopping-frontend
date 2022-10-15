import React, { useState, useRef } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../store/auth";
import Signup from "../Signup/Signup";
import { Alert, CircularProgress } from "@mui/material";
export default function Signin(props) {
  const dispatch = useDispatch();

  const { isSignin, errorSignin, isLoading } = useSelector(
    (state) => state.auth
  );
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignin = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(signin(data));
    usernameRef.current.value = null;
    passwordRef.current.value = null;
  };

  return (
    <>
      {errorSignin && (
        <Alert severity="error">The username or password is incorrect</Alert>
      )}
      {!isSignin ? (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === "tab1"}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === "tab1"}>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form1"
                type="text"
                inputRef={usernameRef}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                inputRef={passwordRef}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
              </div>

              {!isLoading ? (
                <MDBBtn className="mb-4 w-100" onClick={handleSignin}>
                  Sign in
                </MDBBtn>
              ) : (
                <CircularProgress />
              )}
            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === "tab2"}>
              <Signup />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      ) : null}
    </>
  );
}
