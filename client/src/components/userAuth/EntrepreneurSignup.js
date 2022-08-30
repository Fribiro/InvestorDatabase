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


export default class EntrepreneurSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EntrepreneurFirstName: "",
      EntrepreneurLastName: "",
      UserEmail: "",
      UserPassword: "",
      UserConfirmPassword: "",
      formErrors: {
        EntrepreneurFirstName: "",
        EntrepreneurLastName: "",
        UserEmail: "",
        UserPassword: "",
        UserConfirmPassword: "",
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
      case "EntrepreneurFirstName":
        formErrors.EntrepreneurFirstName =
          value.length < 3 ? "min. 3 characaters" : "";
        break;
      case "EntrepreneurLastName":
        formErrors.EntrepreneurLastName = value.length < 3 ? "min. 3 characaters" : "";
        break;
      case "UserEmail":
        formErrors.UserEmail = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "UserPassword":
        formErrors.UserPassword = strongPassword.test(value)
          ? ""
          : "Weak password";
        break;
      case "UserConfirmPassword":
        formErrors.UserConfirmPassword =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  addEntrepreneur = (e) => {
    let formData = { ...this.state };
    console.log(formData.EntrepreneurFirstName);
    Axios.post("http://localhost:5000/api/entrepreneur-signup", {
      EntrepreneurFirstName: formData.EntrepreneurFirstName,
      EntrepreneurLastName: formData.EntrepreneurLastName,
      UserEmail: formData.UserEmail,
      UserPassword: formData.UserPassword,
      UserConfirmPassword: formData.UserConfirmPassword,
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
    Axios.get("http://localhost:5000/admin").then((results) => {

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
              <label htmlFor="EntrepreneurFirstName">First name</label>
              <input
                type="text"
                name="EntrepreneurFirstName"
                className={formErrors.EntrepreneurFirstName.length > 0 ? "error" : null}
                placeholder="First Name"
                onChange={this.handleChange}
              />
              {formErrors.EntrepreneurFirstName.length > 0 && (
                <small className="danger-error">{formErrors.EntrepreneurFirstName}</small>
              )}
            </div>
            <div className="input-group lastName">
              <label htmlFor="EntrepreneurLastName">Last Name</label>
              <input
                type="text"
                name="EntrepreneurLastName"
                className={formErrors.EntrepreneurLastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                onChange={this.handleChange}
              />
              {formErrors.EntrepreneurLastName.length > 0 && (
                <small className="danger-error">{formErrors.EntrepreneurLastName}</small>
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="UserEmail">Email</label>
            <input
              type="text"
              name="UserEmail"
              className={formErrors.UserEmail.length > 0 ? "error" : null}
              placeholder="Email"
              onChange={this.handleChange}
            />
            {formErrors.UserEmail.length > 0 && (
              <small className="danger-error">{formErrors.UserEmail}</small>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="UserPassword">Password</label>
            <input
              type="password"
              name="UserPassword"
              className={formErrors.UserPassword.length > 0 ? "error" : null}
              placeholder="Password"
              onChange={this.handleChange}
            />
            {/* {formErrors.UserPassword.length > 0 && (
              <small className="danger-error">{formErrors.UserPassword}</small>
            )} */}
            {formErrors.UserPassword.length > 0 && (
              <small className="danger-error">{formErrors.UserPassword}</small>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="UserConfirmPassword">Confirm Password</label>
            <input
              type="password"
              name="UserConfirmPassword"
              className={
                formErrors.UserConfirmPassword.length > 0 ? "error" : null
              }
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          {this.state.message && (
            <small className="danger-error">{this.state.message}</small>
          )}
          <button
            type="button"
            className="login-btn"
            onClick={this.addEntrepreneur}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}