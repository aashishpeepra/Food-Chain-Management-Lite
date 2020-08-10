import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Example extends React.Component {
  state = {
    startDate: new Date(this.props.date)
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
   ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        fixedHeight="300px"
      />
    );
  }
}