import React from "react";
import _ from "lodash";
import { getUser } from "../services/userService";

class User extends React.Component {
  state = {
    name: "",
    description: "",
    email: "",
  };

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id;

      const { data: user } = await getUser(userId);
      this.setState(_.pick(user, ["name", "description", "email"]));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  render() {
    const { name, description, email } = this.state;
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">{name}</h1>
            <p className="lead">{description}</p>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-link active"
              id="nav-like-tab"
              data-toggle="tab"
              href="#nav-like"
              role="tab"
              aria-controls="nav-like"
              aria-selected="true"
            >
              点赞过的文章
            </a>
            <a
              className="nav-link"
              id="nav-publish-tab"
              data-toggle="tab"
              href="#nav-publish"
              role="tab"
              aria-controls="nav-publish"
              aria-selected="false"
            >
              发表的文章
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane active"
            id="nav-like"
            role="tabpanel"
            aria-labelledby="nav-like-tab"
          >
            功能正在开发中...
          </div>
          <div
            className="tab-pane fade"
            id="nav-publish"
            role="tabpanel"
            aria-labelledby="nav-publish-tab"
          >
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default User;
