import React, {Component} from "react";
import ReactDOM from "react-dom";
import ChartBar from "./ChartBar";
import "./style/global.scss";

class Index extends Component {
    render() {
        return (
            <ChartBar scaleDirectionY={"left"} xAxisScaleAlign={"side"} xAxisTxtAlign={"center"} firstScaleY={false} firstScaleX={true}
                      yAxisTextAlign={"right"} gridDashX={[5, 5, 5]} markLineDash={[2, 4, 2, 4]} barPaddinng={10} markIndex={5}/>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById("root"));
