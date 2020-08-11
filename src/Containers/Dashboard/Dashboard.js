import React from "react";
import PieChart from "../../Components/Chart/Chart";
import "./Dashboard.css";

class Dashboard extends React.Component {
  state = {
    data: [
      { name: "Chicken", colour: "Red", value: 55 },
      { name: "Mutton", colour: "Yellow", value: 12 },
      { name: "Boneless", colour: "Blue", value: 23 },
      { name: "Butter Chicken", colour: "Orange", value: 45 },
      { name: "Chicken Tangri", colour: "Green", value: 35 },
      { name: "Chicken Lollipop", colour: "Violet", value: 6 },
      { name: "Chicken Kabab", colour: "Indigo", value: 17 },
    ],
  };
  render() {
    return (
      <main>
        <h1 style={{ marginBottom: "30px" }}>Dashboard</h1>
        <div className="chart__section">
          <div className="total__heading">
            <div>Total</div>
            <div>115 Kg</div>
          </div>
          <div
            className="lower__section"
            style={{ position: "relative", height: "100%", width: "80vw" }}
          >
            <div className="left__section">
              <PieChart data={this.state.data} />
            </div>
            <div className="right__section">
              {this.state.data.map((each) => {
                return (
                  <div className="each__box">
                    <div
                      className="color__box"
                      style={{ backgroundColor: `${each.colour}` }}
                    >
                      &nbsp;
                    </div>
                    <div className="value__box">
                      <div className="item__name">{each.name}</div>
                      <div className="item__value">{each.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Dashboard;
