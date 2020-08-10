import React, { Component } from "react";
import "./ReturnHubRow.css";

export default class ReturnHubRow extends Component {
  state = {
    object: {
      a: ["b", "c", "d"],
      b: ["e", "f", "g"],
    },
    selectedCategory: "a",
  };

  toggleCategoryHandler = (e) => {
    this.setState({
      selectedCategory: e.target.value,
    });
  };

  render() {
    return (
      <div className="row__container">
        <div className="input__field--div">
          <select
            name="category"
            id="category-name"
            className="select__menu--category"
            onChange={this.toggleCategoryHandler}
          >
            {Object.keys(this.state.object).map((each) => (
              <option value={each}>{each}</option>
            ))}
          </select>
        </div>
        <div className="input__field--div">
          <select
            name="sub-category"
            id="sub-category-name"
            className="select__menu--subcategory"
          >
            {this.state.object[this.state.selectedCategory].map((each) => (
              <option value={each}>{each}</option>
            ))}
          </select>
        </div>
        <div className="input__field--div">
          <input
            type="text"
            id="input__field product__UOM"
            placeholder="UOM"
            className="input__UOM"
            required
          />
        </div>
        <div className="input__field--div">
          <input
            type="text"
            id="input__field product__QTY"
            className="input__QTY"
            placeholder="QTY"
            required
          />
        </div>
      </div>
    );
  }
}
