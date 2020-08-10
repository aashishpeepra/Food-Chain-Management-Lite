import React from "react";
import "../../../Styles/basicStyle.css";

class ReturnFromHub extends React.Component {
  state = {
    productName: "Chicken Medium Curry Cut Skin Less",
    quantity: 0,
    weight: null,
    returnDate: null,
    reasonForReturn: null,
  };

  called = () => {
    let name = document.querySelector(".select__menu").value;
    let qty = document.getElementById("input__field product__qty").value;
    let weight = document.getElementById("input__field product__wg").value;
    let retDate = document.getElementById("input__field return__date").value;
    let reason = document.getElementById("input__field return__reason").value;

    this.setState({
      productName: name,
      quantity: qty,
      weight: weight,
      returnDate: retDate,
      reasonForReturn: reason,
    });

    console.log(this.state);
  };

  render() {
    return (
      <section>
        <h1 className="form__heading">Return From Hub</h1>
        <div className="input__field--div">
          <label for="input__field" className="input__field--label">
            Product Name
          </label>
          <select name="cars" id="name" class="select__menu">
            <option value="Chicken Medium Curry Cut Skin Less">
              Chicken Medium Curry Cut Skin Less
            </option>
            <option value="Chicken Small Curry Cut Skin Less">
              Chicken Small Curry Cut Skin Less
            </option>
            <option value="Full Legs Skinless">Full Legs Skinless</option>
            <option value="Breast Boneless">Breast Boneless</option>
            <option value="Leg Boneless">Leg Boneless</option>
            <option value="Thighs Boneless">Thighs Boneless</option>
            <option value="Drumsticks Skinless(Thangidi)">
              Drumsticks Skinless(Thangidi)
            </option>
            <option value="Full Wings">Full Wings</option>
            <option value="Lollipops">Lollipops</option>
          </select>
        </div>
        <div className="input__field--div">
          <label for="input__field" className="input__field--label">
            QNTY
          </label>
          <input type="text" id="input__field product__qty" required />
        </div>
        <div className="input__field--div">
          <label for="input__field--label" className="input__field--label">
            Weight
          </label>
          <input type="text" id="input__field product__wg" required />
        </div>
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
