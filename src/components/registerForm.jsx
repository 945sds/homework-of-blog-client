import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", username: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    username: Joi.string().required().min(3).max(20).label("Username"),
    password: Joi.string().required().min(8).max(30).label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers["token"]);
      
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
