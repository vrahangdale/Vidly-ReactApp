import React from "react";
import Form from "./common/form";
import Select from "./common/select";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: getGenres(),
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.any()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    //call the server
    console.log("saved new movie");
  };
  render() {
    return (
      <div>
        <h1>Add New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {/* name , label, type */}
          {this.renderInput("title", "Title")}
          {/* <Select name="genre" label="Genre" /> */}
          {this.renderSelect("genre", "Genre")}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
