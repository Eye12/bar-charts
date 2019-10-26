# bar-charts
This is a flexible and self-adaption bar charts. <br/>
you can choose some properties as you like to make the bar charts as you want.<br/>
<br/>
<img src="https://raw.githubusercontent.com/Eye12/img-folder/master/img/bar-charts.jpg" width="400px" height="auto" />

## Installation <br/>
npm install bar-charts-react --dev
/
yarn add bar-charts-react --dev

## Example <br/>
    
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
    
    
## Properties <br/>
| 属性 | 说明 | 类型 | 默认值 |
|:-------------:|:-------------:|:-------------:|:-------------:|
| width | 画布宽 | number | 设备屏幕可视宽度值 |
| height | 画布高 | number | 300 |
| xAxisDatas | X轴相关数据 | array | BASE_X_AXIS（见./utils/globalConst.js） |
| yAxisDatas | Y轴相关数据 | array | BASE_Y_AXIS（见./utils/globalConst.js） |
| markIndex | 显示指定柱子标记索引值 | number | "none" |
| font | 文字大小以及字体样式 | string | 20px Arial |
| padding | 画布内边距 | number | 20 |

