import React, { Component } from 'react'
import Axios from 'axios'
import {Redirect} from "react-router-dom"

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const strongPassword = RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const mediumPassword = RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export default class EntrepreneurSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      efirstName: "",
      elastName: null,
      eemail: null,
      epassword: null,
      econfirmPassword: null,
      formErrors: {
        efirstName: "",
        elastName: "",
        eemail: "",
        epassword: "",
        econfirmPassword: "",
      },
      message: "",
      redirect: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "efirstName":
        formErrors.efirstName =
          value.length < 3 ? "min. 3 characaters" : "";
        break;
      case "elastName":
        formErrors.elastName = value.length < 3 ? "min. 3 characaters" : "";
        break;
      case "eemail":
        formErrors.eemail = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "epassword":
        // formErrors.epassword =
        //   value.length < 6 ? "minimum 6 characaters required" : "";
        switch (name) {
          case "strongpwd":
            formErrors.epassword.strongpwd = strongPassword.test(value)
              ? ""
              : "strong password";
            break;
          case "mediumpwd":
            formErrors.epassword.mediumpwd = mediumPassword.test(value)
              ? ""
              : "medium password";
            break;
          case "weakpwd":
            formErrors.epassword.weakpwd =  "weak password";
            break;
          default:
            break;
        }
        break;
      case "econfirmPassword":
        formErrors.econfirmPassword =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  addInvestor = (e) => {
    let formData = { ...this.state };
    console.log(formData.efirstName);
    Axios.post("http://localhost:5500/auth/entrepreneursignup", {
      efirstName: formData.efirstName,
      elastName: formData.elastName,
      eemail: formData.eemail,
      epassword: formData.epassword,
      econfirmPassword: formData.econfirmPassword,
    }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({
          redirect: "/login",
        });
      } 
    }, (e) => {
         this.setState({
           message: e.response.data.message,
         });    
     });
  }

  showEntrepreneurs = (e) => {
    Axios.get("http://localhost:5500/admin").then((results) => {

    })
  }

  render() {
    const { formErrors } = this.state;

    if(this.state.redirect){
    return <Redirect to={this.state.redirect}/>
    }
    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <div className="name-control">
            <div className="input-group ">
              <label htmlFor="efirstName">First name</label>
              <input
                type="text"
                name="efirstName"
                className={formErrors.efirstName.length > 0 ? "error" : null}
                placeholder="First Name"
                onChange={this.handleChange}
              />
              {formErrors.efirstName.length > 0 && (
                <small className="danger-error">{formErrors.efirstName}</small>
              )}
            </div>
            <div className="input-group lastName">
              <label htmlFor="elastName">Last Name</label>
              <input
                type="text"
                name="elastName"
                className={formErrors.elastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                onChange={this.handleChange}
              />
              {formErrors.elastName.length > 0 && (
                <small className="danger-error">{formErrors.elastName}</small>
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="eemail">Email</label>
            <input
              type="text"
              name="eemail"
              className={formErrors.eemail.length > 0 ? "error" : null}
              placeholder="Email"
              onChange={this.handleChange}
            />
            {formErrors.eemail.length > 0 && (
              <small className="danger-error">{formErrors.eemail}</small>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="epassword">Password</label>
            <input
              type="password"
              name="epassword"
              className={formErrors.epassword.length > 0 ? "error" : null}
              placeholder="Password"
              onChange={this.handleChange}
            />
            {/* {formErrors.epassword.length > 0 && (
              <small className="danger-error">{formErrors.epassword}</small>
            )} */}
            {formErrors.epassword.mediumpwd && (
              <small className="danger-error">
                {formErrors.epassword.mediumpwd}
              </small>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="econfirmPassword">Confirm Password</label>
            <input
              type="password"
              name="econfirmPassword"
              className={
                formErrors.econfirmPassword.length > 0 ? "error" : null
              }
              placeholder="Password"
              onChange={this.handleChange}
            />
            {/* {formErrors.econfirmPassword.length > 0 && (
              <small className="danger-error">
                {formErrors.econfirmPassword}
              </small>
            )} */}
          </div>
          {this.state.message && (
            <small className="danger-error">{this.state.message}</small>
          )}
          <button
            type="button"
            className="login-btn"
            onClick={this.addInvestor}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}