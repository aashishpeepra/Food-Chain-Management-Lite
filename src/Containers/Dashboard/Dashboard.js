import React from "react";
import PieChart from "../../Components/Chart/Chart";

class Dashboard extends React.Component {
  state = {
    data: [
      { name: "Chicken", colour: "Red", value: 55 },
      { name: "Mutton", colour: "Yellow", value: 12 },
      { name: "Boneless", colour: "Blue", value: 23 },
      { name: "Butter Chicken", colour: "Orange", value: 45 },
    ],
  };
  render() {
    return (
      <main>
        <h1 style={{ marginBottom: "30px" }}>Dashboard</h1>
        <PieChart data={this.state.data} />
      </main>
    );
  }
}

export default Dashboard;
