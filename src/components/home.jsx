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

    if (allArticles.length === 0) return <p>There are no articles.</p>;

    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1 className="display-4">主推文章</h1>
          <p className="lead">文章描述</p>
          <Link to="#">作者</Link>
          <hr className="my-4" />
          <Link className="btn btn-primary btn-lg" to="#" role="button">
            Read More...
          </Link>
        </div>
        <Articles articles={allArticles} />
      </React.Fragment>
    );
  }
}

export default Home;
