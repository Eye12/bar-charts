# bar-charts
This is a flexible bar charts. you can choose some properties as you want. to make the bar charts as you want
![Image text](https://raw.githubusercontent.com/Eye12/img-folder/master/img/bar-charts.jpg)

##Installation <br/>
npm install bar-charts-react --dev
/
yarn add bar-charts-react --dev

##Example <br/>
    
    import React, {Component} from "react";
    import ReactDOM from "react-dom";
    import BarCharts from "bar-charts-react";
    
    class Demo extends Component {
        render() {
            return (
                <BarCharts scaleDirectionY={"left"} xAxisScaleAlign={"side"} xAxisTxtAlign={"center"} firstScaleY={false} firstScaleX={true}
                           yAxisTextAlign={"right"} gridDashX={[5, 5, 5]} markLineDash={[2, 4, 2, 4]} barPaddinng={10} markIndex={5}/>
            );
        }
    }
    
    ReactDOM.render(<Demo/>, document.getElementById("root"));
    
    
##Properties <br/>

