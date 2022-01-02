import React from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";
import { getArticle, like, unlike } from "../services/articleService";
import Like from "./common/like";
import { getCurrentUser } from "../services/authService";
import { getUser } from "../services/userService";

class Article extends React.Component {
  state = {
    _id: "",
    title: "",
    description: "",
    body: "",
    author: {},
    like_number: 0,
    liked: false,
  };

  async componentDidMount() {
    try {
      const articleId = this.props.match.params.id;

      const { data: article } = await getArticle(articleId);
      this.setState(article);

      const user = getCurrentUser();
      if (user) {
        const { data } = await getUser(user._id);
        if (data.liked_articles.includes(articleId)) {
          this.setState({ liked: true });
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  handleLike = async () => {
    if (getCurrentUser()) {
      if (this.state.liked === true) {
        const { data: article } = await unlike(this.state._id);
        this.setState({ ...article, liked: false });
      } else {
        const { data: article } = await like(this.state._id);
        this.setState({ ...article, liked: true });
      }
    }
  };

  render() {
    const { title, description, body, author, like_number, liked } = this.state;
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>
            {!getCurrentUser() && (
              <Link to="/login">
                <Like
                  onClick={() => this.handleLike()}
                  liked={liked}
                  number={like_number}
                />
              </Link>
            )}
            {getCurrentUser() && (
              <Like
                onClick={() => this.handleLike()}
                liked={liked}
                number={like_number}
              />
            )}
            <Link to={`/users/${author._id}`}>{author.name}</Link>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(body) }} />
      </React.Fragment>
    );
  }
}

export default Article;
