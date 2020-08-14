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
    // let temp=this.cb!=undefined?cb(this.state.startDate):null;
  };
   ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  render() {
    console.log(this.props)
    return (
      <DatePicker
        selected={this.props.selected}
        onChange={date=>this.props.change(date)}
        fixedHeight="300px"
      />
    );
  }
}