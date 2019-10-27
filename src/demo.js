import React, {Component} from "react";
import ReactDOM from "react-dom";
import BarCharts from "./components/BarCharts";
import "./style/global.scss";

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxisDatas: [
                {title: "5万", flex: 1, value: "1.50"},
                {title: "10万", flex: 1, value: "2.00"},
                {title: "15万", flex: 1, value: "2.50"},
                {title: "20万", flex: 1, value: "3.00"},
                {title: "25万", flex: 1, value: "3.50"},
                {title: "30万", flex: 1, value: "4.00"},
                {title: "35万", flex: 1, value: "4.50"}
            ],
            yAxisDatas: [
                {title: 0, value: 0},
                {title: "1.0000", value: 1},
                {title: "2.0000", value: 2},
                {title: "3.0000", value: 3},
                {title: "4.0000", value: 4},
                {title: "5.0000", value: 5}
            ],
            markIndex: 5
        }
    }

    click = () => {
        // this.barCharts.rePainting();
        this.setState({
            yAxisDatas: [
                {title: 0, flex: 0, value: 0},
                {title: "1.0000", flex: 1, value: 1},
                {title: "2.0000", flex: 2, value: 2},
                {title: "3.0000", flex: 3, value: 3},
                {title: "4.0000", flex: 1, value: 4},
                {title: "5.0000", flex: 1, value: 5}
            ],
            markIndex: 1
        });
    };

    render() {
        let {
            xAxisDatas,
            yAxisDatas,
            markIndex
        } = this.state;
        return (
            <div>
                <BarCharts ref={node => this.barCharts = node} xAxisDatas={xAxisDatas} yAxisDatas={yAxisDatas} scaleDirectionY={"left"}
                           xAxisScaleAlign={"side"}
                           xAxisTxtAlign={"center"} firstScaleY={false} firstScaleX={true} markIndex={markIndex}
                           yAxisTextAlign={"right"} gridDashX={[5, 5, 5]} markLineDash={[2, 4, 2, 4]} barPaddinng={10}/>
                <div onClick={this.click}>click me</div>
            </div>
        );
    }
}

ReactDOM.render(<Demo/>, document.getElementById("root"));
