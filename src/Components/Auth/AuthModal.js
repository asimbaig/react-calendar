import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { auth, setAuthRedirectPath } from "../../store/actions/index";

const AuthModal = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data));
    props.onAuth(data.email, data.password, isSignup);
    props.onHide();
    <Redirect to="/" />
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  // let authRedirect = null;
  // if (props.isAuthenticated) {
  //   authRedirect = <Redirect to={props.authRedirectPath} />;
  // }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                name="email"
                ref={register({ required: true, maxLength: 100 })}
                placeholder="Email"
              />
              {errors.email && (
                <p style={{ color: "red" }}>
                  This Field is required & must less than 100 characters
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                name="password"
                ref={register({ required: true, maxLength: 100 })}
                placeholder="Password"
              />
              {errors.password && (
                <p style={{ color: "red" }}>
                  This Field is required & must less than 100 characters
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Submit
          </Button>
          <Button
            className="mt-2"
            variant="primary"
            type="button"
            onClick={switchAuthModeHandler}
          >
            SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.token !== null,
//     authRedirectPath: state.authRedirectPath,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/")),
  };
};

export default connect(null, mapDispatchToProps)(AuthModal);
