import React from "react";
import _ from "lodash";
import { getUser } from "../services/userService";
import Articles from "./articles";
import { getArticle } from "./../services/articleService";

class User extends React.Component {
  state = {
    _id: "",
    name: "",
    description: "",
    email: "",
    liked_articles: [],
    published_articles: [],
  };

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id;

      const { data: user } = await getUser(userId);
      this.setState(_.pick(user, ["_id", "name", "description", "email"]));

      const { liked_articles, published_articles } = user;
      let All_liked_articles = [],
        All_published_articles = [];
      for (let liked_article of liked_articles) {
        const { data: article } = await getArticle(liked_article);
        All_liked_articles.push(article);
      }
      for (let published_article of published_articles) {
        const { data: article } = await getArticle(published_article);
        All_published_articles.push(article);
      }

      this.setState({
        liked_articles: All_liked_articles,
        published_articles: All_published_articles,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  render() {
    const {
      name,
      description,
      email,
      liked_articles,
      published_articles,
      test,
    } = this.state;
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
            <Articles test={test} articles={liked_articles} />
          </div>
          <div
            className="tab-pane fade"
            id="nav-publish"
            role="tabpanel"
            aria-labelledby="nav-publish-tab"
          >
            <Articles test={test} articles={published_articles} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default User;
