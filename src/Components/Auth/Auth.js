import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import "./Auth.css";
import { auth, setAuthRedirectPath } from "../../store/actions/index";

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  useEffect(()=>{
    if ( props.authRedirectPath !== '/' ) {
      props.onSetAuthRedirectPath();
    }
  },[]);

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data));
    props.onAuth(data.email, data.password, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className="Auth">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                Email is rquired
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
                Password is required
              </p>
            )}
          </div>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>

      <Button className="mt-2" variant="primary" type="button" onClick={switchAuthModeHandler}>
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onChangepassword: ( email ) => dispatch( changePassword( email ) ),
    onAuth: ( email, password, isSignup ) => dispatch( auth( email, password, isSignup ) ),
    onSetAuthRedirectPath: () => dispatch( setAuthRedirectPath( '/' ) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
