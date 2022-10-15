import { Alert, CircularProgress } from "@mui/material";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React, { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../store/auth";
export default function Signup(props) {
  const dispatch = useDispatch();

  const { errorSignup, isLoading } = useSelector((state) => state.auth);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);

  const handleSinup = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };
    dispatch(signup(data));
    usernameRef.current.value = null;
    passwordRef.current.value = null;
    roleRef.current.value = null;
  };
  return !isLoading ? (
    <>
      {errorSignup && <Alert severity="error">{errorSignup}</Alert>}
      <MDBInput
        wrapperClass="mb-4"
        label="Username"
        id="form1"
        type="text"
        inputRef={usernameRef}
      />

      <MDBInput
        wrapperClass="mb-4"
        label="Email"
        id="form1"
        type="email"
        placeholder=""
        inputRef={roleRef}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form1"
        type="password"
        inputRef={passwordRef}
      />

      <MDBBtn className="mb-4 w-100" onClick={handleSinup}>
        {" "}
        Sign up
      </MDBBtn>
    </>
  ) : (
    <CircularProgress />
  );
}
