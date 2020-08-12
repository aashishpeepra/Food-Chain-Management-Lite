import React from "react";
import ReturnHubRow from "../../../Components/ReturnHubRow/ReturnHubRow";
import "./ReturnFromHub.css";
import { db } from "../../../firebase";
class ReturnFromHub extends React.Component {
  state = {
    rows: [<ReturnHubRow key="0" />],
    returnDate: null,
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
  fetchFromFirebase = (collection, doc, cb) => {
    db.collection(collection).doc(doc).get().then(data => {
      console.log(data.data());
      cb(data.data());
    })
      .catch(err => {
        console.log('error while fetching', err);
      })
  }
  converArrayIntoObjectClassify = (data) => {
    let result = {};
    let data2 = [...data];
    data2.forEach(element => {
      let key = element["category"];
      delete element["category"];
      if (result[key] === undefined)
        result[key] = [element]
      else
        result[key].push(element);
    });
    console.log(result);
    return result;
  }
  upDateToFirebase = () => {
    console.log("hERE")
    this.fetchFromFirebase("entry", "hub1", (prevData) => {
      if (prevData.entry === undefined)
        prevData = [];
      else
        prevData = prevData.entry;
      let data = this.converArrayIntoObjectClassify(this.state.data);

      prevData.push({ data: data, date: this.state.date });
      console.log(prevData)
      db.collection("entry").doc("hub1").set({
        name: "hub1",
        incharge: "X Men",
        entry: prevData
      })
    })
  }
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

    let reasonArray = document.querySelectorAll(".input__reason");
    let reasonValues = [];
    reasonArray.forEach(each => reasonValues.push(each.value));

    let returnDate = document.getElementById('input__field return__date').value || null;

    for (let i = 0; i < categoryNameArray.length; i++) {
      dataArray.push({
        category: categoryNames[i],
        subCategory: subCategoryNames[i],
        UOM: UOMs[i],
        quantity: quantityValues[i],
        reason: reasonValues[i],
      });
    }

    this.setState({
      data: dataArray,
      returnDate: returnDate,
    });
    console.log(this.state.data)
    this.upDateToFirebase();

  };

  render() {
    return (
      <section id="return__from__hub">

        <h1 className="form__heading">Return From Hub</h1>
        {this.state.rows.map(function (each, index) {
          return each;
        })}
        <p onClick={this.addReturnHubRow} className="return__add">Add More</p>
        <div className="return__date__input--div">
          <label for="input__field--label" className="return__field--label">
            Return Date
          </label>
          <input type="text" id="input__field return__date" className="return__date__input" required />
        </div>
        <button type="submit" onClick={this.called} className="return__submit">
          SUBMIT
        </button>
      </section>
    );
  }
}

export default ReturnFromHub;
