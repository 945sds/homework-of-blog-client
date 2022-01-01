import React from "react";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Articles extends React.Component {
  state = {
    articles: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
  };

    componentDidMount() {
    this.setState({ articles: this.props.articles });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getWorkedArticles = () => {
    const {
      articles: allArticles,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;

    let filtered = allArticles;

    if (searchQuery)
      filtered = allArticles.filter((article) =>
        article.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const articles = paginate(filtered, currentPage, pageSize);

    return articles;
  };

  render() {
    const {
      articles: allArticles,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;

    if (allArticles.length === 0) return <p>There are no articles.</p>;

    const articles = this.getWorkedArticles();

    return (
      <React.Fragment>
        <SearchBox
          value={searchQuery}
          onChange={this.handleSearch}
          placeholder="Search articles"
        />
        {articles.map((article) => (
          <div key={article._id} className="card">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
              <Link to={`/articles/${article._id}`} className="btn btn-primary">
                Read more...
              </Link>
            </div>
          </div>
        ))}
        <Pagination
          itemsCount={allArticles.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Articles;
