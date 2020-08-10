import React from "react";
import ReturnHubRow from "../../../Components/ReturnHubRow/ReturnHubRow";
import "../../../Styles/basicStyle.css";

class ReturnFromHub extends React.Component {
  state = {
    rows: [<ReturnHubRow key="0" />],
    returnDate: null,
    reasonForReturn: null,
    data: [],
  };

  addReturnHubRow = () => {
    this.setState({
      rows: this.state.rows.concat(
        <ReturnHubRow key={this.state.rows.length} />
      ),
    });
    console.log("done");
  };

  called = () => {

    let dataArray = [];

    let categoryNameArray = document.querySelectorAll(".select__menu--category");
    let categoryNames = [];
    categoryNameArray.forEach(each => categoryNames.push(each.value));

    let subCategoryNameArray = document.querySelectorAll(".select__menu--subcategory");
    let subCategoryNames = [];
    subCategoryNameArray.forEach(each => subCategoryNames.push(each.value));

    let UOMArray = document.querySelectorAll(".input__UOM");
    let UOMs = [];
    UOMArray.forEach(each => UOMs.push(each.value));

    let quantityArray = document.querySelectorAll(".input__QTY");
    let quantityValues = [];
    quantityArray.forEach(each => quantityValues.push(each.value));

    let returnDate = document.getElementById('input__field return__date').value || null;
    
    let reasonForReturn = document.getElementById('input__field return__reason').value || null;

    for(let i=0; i<categoryNameArray.length; i++) {
      dataArray.push({
        category: categoryNames[i],
        subCategory: subCategoryNames[i],
        UOM: UOMs[i],
        quantity: quantityValues[i],
      });
    }

    this.setState({
      data: dataArray,
      returnDate: returnDate,
      reasonForReturn: reasonForReturn,
    });

    console.log(this.state);

  };

  render() {
    return (
      <section>
        <h1 className="form__heading">Return From Hub</h1>
        {this.state.rows.map(function (each, index) {
          return each;
        })}
        <p onClick={this.addReturnHubRow}>Add One</p>
        <div className="input__field--div">
          <label for="input__field--label" className="input__field--label">
            Return Date
          </label>
          <input type="text" id="input__field return__date" required />
        </div>
        <div className="textarea__field--div">
          <label for="input__field--label" className="input__field--label">
            Reason for return
          </label>
          <textarea id="input__field return__reason" col="50" rows="5" />
        </div>
        <button type="submit" onClick={this.called}>
          SUBMIT
        </button>
      </section>
    );
  }
}

export default ReturnFromHub;
