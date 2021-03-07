import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import "./Auth.css";
import { setAuthRedirectPath, changeEmail } from "../../store/actions/index";
import { useHistory } from "react-router-dom";

const ChangeEmail = (props) => {
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
    props.onChangeEmail(data.email);
    history.push('/')
  };

 

  

  return (
    <div className="Auth">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">New Email</label>
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
    onChangeEmail: ( email ) => dispatch( changeEmail( email ) ),
    onSetAuthRedirectPath: () => dispatch( setAuthRedirectPath( '/' ) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
