import React from "react";
import PieChart from "../../Components/Chart/Chart";

class Dashboard extends React.Component {
  state = {
    labels: ["Chicken", "Leg", "Thigh", "Bone", "Curry"],
    datasets: [
      {
        data: [10, 20, 30, 40, 50],
        backgroundColor: ["red", "pink", "green", "blue", "yellow"],
        hoverBackgroundColor: ["#ff471a","#ff80aa","#47d147","#0099cc","#ffff4d"],
        hoverBorderWidth: 1,
      },
    ],
  };
  render() {
    return (
      <main>
        <h1 style={{marginBottom: "30px"}}>Dashboard</h1>
        <PieChart
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets,
          }}
          options={{
            legend: {
              display: false,
            },
            cutoutPercentage: 70,
          }}
        />
      </main>
    );
  }
}

export default Dashboard;
