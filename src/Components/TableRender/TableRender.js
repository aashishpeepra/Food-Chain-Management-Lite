import React from "react";
import "./TableRender.css";

class TableRender extends React.Component {
  render() {
   
    return (
      <div className="table__container">
        <table>
          <thead>
            <tr>
              {this.props.data.headings.map((each) => {
                return <th key={each}>{each}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.data.data.map((each) => {
              return (
                <tr key={each.subCategory}>
                  {Object.keys(each).map((per) => {
                    return <td key={each[per]+Math.random()}>{each[per]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableRender;