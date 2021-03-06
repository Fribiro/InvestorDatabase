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
      ifirstName: "",
      ilastName: null,
      iemail: null,
      ipassword: null,
      iconfirmPassword: null,
      formErrors: {
        ifirstName: "",
        ilastName: "",
        iemail: "",
        ipassword: "",
        iconfirmPassword: "",
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
      case "ifirstName":
        formErrors.ifirstName = value.length < 3 ? "Min. 3 characaters" : "";
        break;
      case "ilastName":
        formErrors.ilastName = value.length < 3 ? "Min. 3 characaters" : "";
        break;
      case "iemail":
        formErrors.iemail = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "ipassword":
        formErrors.ipassword = strongPassword.test(value)
          ? ""
          : "Weak password";
        break;
      case "iconfirmPassword":
        formErrors.iconfirmPassword =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  addInvestor = (e) => {
    let formData = { ...this.state };
    console.log(formData.ifirstName);
    Axios.post("http://localhost:5500/auth/investorsignup", {
      ifirstName: formData.ifirstName,
      ilastName: formData.ilastName,
      iemail: formData.iemail,
      ipassword: formData.ipassword,
      iconfirmPassword: formData.iconfirmPassword,
    }).then((res) => {
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
  };

  showEntrepreneurs = (e) => {
    Axios.get("http://localhost:5500/admin").then((results) => {
      
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
              <label htmlFor="ifirstName">First name</label>
              <input
                type="text"
                name="ifirstName"
                className={formErrors.ifirstName.length > 0 ? "error" : null}
                placeholder="First Name"
                onChange={this.handleChange}
              />
              {formErrors.ifirstName.length > 0 && (
                <small className="danger-error">{formErrors.ifirstName}</small>
              )}
            </div>
            <div className="input-group lastName">
              <label htmlFor="ilastName">Last Name</label>
              <input
                type="text"
                name="ilastName"
                className={formErrors.ilastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                onChange={this.handleChange}
              />
              {formErrors.ilastName.length > 0 && (
                <small className="danger-error">{formErrors.ilastName}</small>
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="iemail">Email</label>
            <input
              type="text"
              name="iemail"
              className={formErrors.iemail.length > 0 ? "error" : null}
              placeholder="Email"
              onChange={this.handleChange}
            />
            {formErrors.iemail.length > 0 && (
              <small className="danger-error">{formErrors.iemail}</small>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="ipassword">Password</label>
            <input
              type="password"
              name="ipassword"
              className={formErrors.ipassword.length > 0 ? "error" : null}
              placeholder="Password"
              onChange={this.handleChange}
            />
            {formErrors.ipassword.length > 0 && (
              <small className="danger-error">{formErrors.ipassword}</small>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="iconfirmPassword">Confirm Password</label>
            <input
              type="password"
              name="iconfirmPassword"
              className={
                formErrors.iconfirmPassword.length > 0 ? "error" : null
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
