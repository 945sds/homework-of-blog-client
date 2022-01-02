import React from "react";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Articles extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getWorkedArticles = (allArticles) => {
    const { currentPage, pageSize, searchQuery } = this.state;

    let filtered = allArticles;

    if (searchQuery)
      filtered = allArticles.filter((article) =>
        article.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const articles = paginate(filtered, currentPage, pageSize);

    return { notPagedCount: filtered.length, articles };
  };

  render() {
    const { currentPage, pageSize, searchQuery } = this.state;

    const { articles: allArticles } = this.props;

    if (allArticles.length === 0) return <p>There are no articles.</p>;

    const { notPagedCount, articles } = this.getWorkedArticles(allArticles);

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
          itemsCount={notPagedCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Articles;
