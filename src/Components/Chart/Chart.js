import React from "react";
import "./Chart.css";
import { Doughnut } from "react-chartjs-2";

class Chart extends React.Component {
  render() {
    let labels = [];
    let values = [];
    let backgroundColors = [];
    this.props.data.map(each => labels.push(each.name));
    this.props.data.map(each => values.push(each.value));
    this.props.data.map(each => backgroundColors.push(each.colour));
    let data = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors,
          hoverBorderWidth: 1,
        },
      ]
    };
    return (
      <div className="Chart">
        <Doughnut data={data} height="50%" options={{
          legend: {
            display: false,
          },
          cutoutPercentage: 70,
          tooltips: {enabled: false},
          hover: {mode: null},
          maintainAspectRatio: false,
        }} />
      </div>
    );
  }
}

export default Chart;
