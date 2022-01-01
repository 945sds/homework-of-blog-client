import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Article from "./components/article";
import User from "./components/user";
import ArticleNew from "./components/articleNew";
import { getCurrentUser } from "./services/authService";
import Logout from "./components/logout";

class App extends React.Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/users/:id" component={User} />
            <Route
              path="/articles/new"
              render={(props) => {
                if (user === null) return <Redirect to="/login" />;
                return <ArticleNew {...props} />;
              }}
            />
            <Route path="/articles/:id" exact component={Article} />
            <Route path="/" exact component={Home} />
            <Redirect path="/articles" to="/" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
