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
                return <th>{each}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.data.data.map((each) => {
              return (
                <tr>
                  {Object.keys(each).map((per) => {
                    return <td>{each[per]}</td>;
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