import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { marked } from "marked";
import { getArticle } from "../services/articleService";

class Article extends React.Component {
  state = {
    title: "",
    description: "",
    body: "",
    author: {},
  };

  async componentDidMount() {
    try {
      const articleId = this.props.match.params.id;

      const { data: article } = await getArticle(articleId);
      this.setState(
        _.pick(article, ["title", "description", "body", "author"])
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  render() {
    const { title, description, body, author } = this.state;
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>
            <Link to={`/users/${author._id}`}>{author.name}</Link>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(body) }} />
      </React.Fragment>
    );
  }
}

export default Article;
