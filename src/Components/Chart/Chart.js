import React from "react";
import { Doughnut } from "react-chartjs-2";

class Chart extends React.Component {
  render() {
    return (
      <div className="Chart">
        <Doughnut data={this.props.data} height="50%" options={this.props.options} />
      </div>
    );
  }
}

export default Chart;
