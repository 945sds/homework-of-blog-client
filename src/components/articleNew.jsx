import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { createArticle } from "../services/articleService";

class ArticleNew extends Form {
  state = {
    data: { title: "", description: "", body: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().min(1).max(10).label("Title"),
    description: Joi.string().required().min(1).max(30).label("Description"),
    body: Joi.string().required().min(1),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await createArticle(data);

    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>新建文章</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderTextarea("body", "Body")}
          {this.renderButton("Punish")}
        </form>
      </div>
    );
  }
}

export default ArticleNew;
