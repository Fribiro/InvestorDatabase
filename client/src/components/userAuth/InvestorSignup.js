import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const strongPassword = RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);

export default class InvestorSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InvestorFirstName: "",
      InvestorLastName: "",
      UserEmail: "",
      UserPassword: "",
      UserConfirmPassword: "",
      formErrors: {
        InvestorFirstName: "",
        InvestorLastName: "",
        UserEmail: "",
        UserPassword: "",
        UserConfirmPassword: "",
      },
      message: "",
      redirect: null,
      accesstoken: "",
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
      case "InvestorFirstName":
        formErrors.InvestorFirstName = value.length < 3 ? "Min. 3 characaters" : "";
        break;
      case "InvestorLastName":
        formErrors.InvestorLastName = value.length < 3 ? "Min. 3 characaters" : "";
        break;
      case "UserEmail":
        formErrors.UserEmail = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "UserPassword":
        formErrors.UserPassword = strongPassword.test(value)
          ? ""
          : "Min. 8 character, must contain an Uppercase, number & special character";
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

  addInvestor = (e) => {
    let formData = { ...this.state };
    console.log(formData.InvestorFirstName);
    Axios.post("http://localhost:5000/api/investor-signup", {
      InvestorFirstName: formData.InvestorFirstName,
      InvestorLastName: formData.InvestorLastName,
      UserEmail: formData.UserEmail,
      UserPassword: formData.UserPassword,
      UserConfirmPassword: formData.UserConfirmPassword,
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          redirect: "/login",
        });
      }
    }, (e) => {
      this.setState({
        message: e.response.data.message,
      });
    });
  };

  showEntrepreneurs = (e) => {
    Axios.get("http://localhost:5000/admin").then((results) => {
      
    });
  };

  render() {
    const { formErrors } = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <div className="name-control">
            <div className="input-group ">
              <label htmlFor="InvestorFirstName">First name</label>
              <input
                type="text"
                name="InvestorFirstName"
                className={formErrors.InvestorFirstName.length > 0 ? "error" : null}
                placeholder="First Name"
                onChange={this.handleChange}
              />
              {formErrors.InvestorFirstName.length > 0 && (
                <small className="danger-error">{formErrors.InvestorFirstName}</small>
              )}
            </div>
            <div className="input-group lastName">
              <label htmlFor="InvestorLastName">Last Name</label>
              <input
                type="text"
                name="InvestorLastName"
                className={formErrors.InvestorLastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                onChange={this.handleChange}
              />
              {formErrors.InvestorLastName.length > 0 && (
                <small className="danger-error">{formErrors.InvestorLastName}</small>
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
            onClick={this.addInvestor}
          >
            Register
          </button>
          
        </div>
      </div>
    );
  }
}
