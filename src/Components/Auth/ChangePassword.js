import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import "./Auth.css";
import { setAuthRedirectPath, changePassword } from "../../store/actions/index";
import { useHistory } from "react-router-dom";

const ChangePassword = (props) => {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  useEffect(()=>{
    if ( props.authRedirectPath !== '/' ) {
      props.onSetAuthRedirectPath();
    }
  },[]);

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data));
    props.onChangePassword(data.password);
    history.push('/');
  };

  return (
    <div className="Auth">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">New Password</label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              name="password"
              ref={register({ required: true, maxLength: 100 })}
              placeholder="New password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                Password is rquired
              </p>
            )}
          </div>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
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
    onChangePassword: ( password ) => dispatch( changePassword( password ) ),
    onSetAuthRedirectPath: () => dispatch( setAuthRedirectPath( '/' ) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
