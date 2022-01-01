import React from "react";
import { getArticles } from "../services/articleService";
import { Link } from "react-router-dom";
import Articles from "./articles";

class Home extends React.Component {
  state = {
    articles: [],
  };

  async componentDidMount() {
    const { data: articles } = await getArticles();
    this.setState({ articles });
  }

  render() {
    const { articles: allArticles } = this.state;
    const recommendArticle = allArticles[0];
    if (allArticles.length === 0) return <h1>There are no articles.</h1>;

    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1 className="display-4">{recommendArticle.title}</h1>
          <p className="lead">{recommendArticle.description}</p>
          <Link to={`/users/${recommendArticle.author._id}`}>
            {recommendArticle.author.name}
          </Link>
          <hr className="my-4" />
          <Link
            className="btn btn-primary btn-lg"
            to={`/articles/${recommendArticle._id}`}
            role="button"
          >
            Read More...
          </Link>
        </div>
        <Articles articles={allArticles} />
      </React.Fragment>
    );
  }
}

export default Home;
