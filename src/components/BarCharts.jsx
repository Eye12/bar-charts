import React, {Component} from "react";
import {
    strokeLine,
    strokeBar,
    writeText,
    getTextMaxWidth,
    getNumber,
    getMaxNumber,
    roundRect,
    circlePoint
} from "../utils/utils";
import {
    BASE_X_AXIS,
    BASE_Y_AXIS,
    BASE_AXIS_COLOR,
    BASE_PADDING,
    BASE_TEXT_MARGIN,
    BASE_FONT,
    BASE_LEFT_TOP_TITLE,
    BASE_LTOP_TITLE_TIPS,
    BASE_LTOP_TITLE_COLOR,
    BASE_LTOP_TITLE_TIPS_COLOR,
    BASE_SCALE_TEXT_COLOR,
    BASE_LTOP_TITLE_FONT,
    BASE_LTOP_TITLE_TIPS_FONT,
    BASE_LTOP_TITLE_MARGIN,
    BASE_TEXT_ALIGN,
    SCALE_BOUNDARY_GAP,
    SCALE_LENGTH,
    SCALE_DIRECTION_Y,
    FIRST_SCALE_X,
    FIRST_SCALE_Y,
    BASE_LINE,
    X_AXIS_SCALE_ALIGN,
    X_AXIS_TXT_ALIGN,
    BASE_BAR_PADDING,
    BAR_BG_COLOR,
    BASE_MARK_INDEX,
    MARK_LINE_COLOR,
    MARK_LINE_WIDTH,
    CIRCLE_POINT_COLOR,
    CIRCLE_POINT_RADIUS,
    ROUND_RECT_RADIUS,
    ROUND_RECT_PADDING,
    ROUND_RECT_MARGIN,
    MARK_FONT,
    ROUND_RECT_BGCOLOR,
    MARK_TEXT_COLOR
} from "../utils/globalConst";

class BarCharts extends Component {
    getDeviceWidth = () => {
        return window.innerWidth || document.documentElement.clientWidth;
    };
    ratio = (window.devicePixelRatio || 1);
    canvasHeight = this.props.height || 300;
    canvasWidth = this.props.width || this.getDeviceWidth();
    font = this.props.font || BASE_FONT;
    padding = this.props.padding || BASE_PADDING;
    textMargin = this.props.textMargin || BASE_TEXT_MARGIN;
    leftTopTitle = this.props.leftTopTitle || BASE_LEFT_TOP_TITLE;
    ltopTitleTips = this.props.ltopTitleTips || BASE_LTOP_TITLE_TIPS;
    ltopTitleFont = this.props.ltopTitleFont || BASE_LTOP_TITLE_FONT;
    ltopTitleTipsFont = this.props.ltopTitleTipsFont || BASE_LTOP_TITLE_TIPS_FONT;
    ltopTitleColor = this.props.ltopTitleColor || BASE_LTOP_TITLE_COLOR;
    ltopTitleTipsColor = this.props.ltopTitleTipsColor || BASE_LTOP_TITLE_TIPS_COLOR;
    ltopTitleMargin = this.props.ltopTitleMargin || BASE_LTOP_TITLE_MARGIN;
    scaleLength = this.props.scaleLength || SCALE_LENGTH;
    scaleDirectionY = this.props.scaleDirectionY || SCALE_DIRECTION_Y;
    scaleBoundaryGap = this.props.scaleBoundaryGap || SCALE_BOUNDARY_GAP;
    scaleTextFont = this.props.scaleTextFont || BASE_FONT;
    scaleTextColor = this.props.scaleTextColor || BASE_SCALE_TEXT_COLOR;
    yAxisTextAlign = this.props.yAxisTextAlign || BASE_TEXT_ALIGN;
    firstScaleX = this.props.firstScaleX || FIRST_SCALE_X;
    firstScaleY = this.props.firstScaleY || FIRST_SCALE_Y;
    axisColor = this.props.axisColor || BASE_AXIS_COLOR;
    gridDashX = this.props.gridDashX;
    gridColorX = this.props.gridColorX || BASE_AXIS_COLOR;
    xAxisScaleAlign = this.props.xAxisScaleAlign || X_AXIS_SCALE_ALIGN;
    xAxisTxtAlign = this.props.xAxisTxtAlign || X_AXIS_TXT_ALIGN;
    barPadding = this.props.barPadding || BASE_BAR_PADDING;
    barBgColor = this.props.barBgColor || BAR_BG_COLOR;
    markLineColor = this.props.markLineColor || MARK_LINE_COLOR;
    markLineWidth = this.props.markLineWidth || MARK_LINE_WIDTH;
    markLineDash = this.props.markLineDash;
    circlePointColor = this.props.circlePointColor || CIRCLE_POINT_COLOR;
    circlePointRadius = this.props.circlePointRadius || CIRCLE_POINT_RADIUS;
    roundRectRadius = this.props.roundRectRadius || ROUND_RECT_RADIUS;
    roundRectPadding = this.props.roundRectPadding || ROUND_RECT_PADDING;
    roundRectMargin = this.props.roundRectMargin || ROUND_RECT_MARGIN;
    markFont = this.props.markFont || MARK_FONT;
    markTextColor = this.props.markTextColor || MARK_TEXT_COLOR;
    roundRectBgColor = this.props.roundRectBgColor || ROUND_RECT_BGCOLOR;
    ltopTitleHeight = 0;
    axisStartX = 0;
    axisEndX = 0;
    axisStartY = 0;
    axisEndY = 0;

    constructor(props) {
        super(props);
        this.state = {
            xAxisDatas: props.xAxisDatas || BASE_X_AXIS,
            yAxisDatas: props.yAxisDatas || BASE_Y_AXIS,
            markIndex: props.markIndex !== undefined ? props.markIndex : BASE_MARK_INDEX
        }
    }

    componentDidMount() {
        window.onresize = () => {
            this.canvasWidth = this.getDeviceWidth();
            this.canvasUpdate();
        };
        this.canvasUpdate();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let {
            xAxisDatas,
            yAxisDatas,
            markIndex
        } = this.props;
        if(JSON.stringify(xAxisDatas) !== JSON.stringify(nextProps.xAxisDatas)) {
            this.setState({
                xAxisDatas: nextProps.xAxisDatas
            }, () => {
                this.canvasUpdate();
            })
        }

        if(JSON.stringify(yAxisDatas) !== JSON.stringify(nextProps.yAxisDatas)) {
            this.setState({
                yAxisDatas: nextProps.yAxisDatas
            }, () => {
                this.canvasUpdate();
            })
        }

        if(markIndex !== nextProps.markIndex) {
            this.setState({
                markIndex: nextProps.markIndex
            }, () => {
                this.canvasUpdate();
            })
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    // 画布大小生成
    canvasUpdate = () => {
        let {ratio, canvasHeight, canvasWidth} = this,
            chartBarCanvas = document.getElementById("chart-bar"),
            ctx = chartBarCanvas.getContext("2d");

        // 画布按ratio倍放大绘制
        chartBarCanvas.width = canvasWidth * ratio;
        chartBarCanvas.height = canvasHeight * ratio;
        // 显示时按ratio倍缩小还原回来
        chartBarCanvas.style.width = canvasWidth + "px";
        chartBarCanvas.style.height = canvasHeight + "px";

        this.painting(ctx);
    };

    painting = (ctx) => {
        // 先计算X轴旁边文字的开始位置，对齐方式按左对齐
        // 先计算X轴开始位置
        this.writeLTopTitle(ctx);
        this.drawAxis(ctx);
    };

    // 书写左上角标题
    writeLTopTitle = (ctx) => {
        let {
                padding,
                ratio,
                leftTopTitle,
                ltopTitleTips,
                ltopTitleFont,
                ltopTitleTipsFont,
                ltopTitleColor,
                ltopTitleTipsColor,
                ltopTitleHeight
            } = this,
            ltopTitleWidth = 0;

        if (leftTopTitle === "none" && ltopTitleTips === "none") {
            this.ltopTitleMargin = 0;
        } else if (leftTopTitle !== "none" && ltopTitleTips !== "none") {
            ltopTitleHeight = Math.max(getNumber(ltopTitleFont), getNumber(ltopTitleTipsFont))
        } else if (leftTopTitle !== "none" || ltopTitleTips !== "none") {
            ltopTitleHeight = leftTopTitle !== "none" ? getNumber(ltopTitleFont) : getNumber(ltopTitleTipsFont);
        }
        this.ltopTitleHeight = ltopTitleHeight;

        if (leftTopTitle !== "none") {
            let lTopTitleStart = {
                x: padding * ratio,
                y: padding * ratio + ltopTitleHeight
            };
            writeText(ctx, leftTopTitle, lTopTitleStart, ltopTitleFont, ltopTitleColor, BASE_TEXT_ALIGN);
            ltopTitleWidth = getTextMaxWidth(ctx, leftTopTitle, ltopTitleFont, true);
        }

        if (ltopTitleTips !== "none") {
            let ltopTitleTipsStart = {
                x: padding * ratio + ltopTitleWidth + 10,
                y: padding * ratio + ltopTitleHeight
            };
            writeText(ctx, ltopTitleTips, ltopTitleTipsStart, ltopTitleTipsFont, ltopTitleTipsColor, BASE_TEXT_ALIGN)
        }
    };

    // 绘制X、Y轴
    drawAxis = (ctx) => {
        let {
                padding,
                textMargin,
                axisColor,
                font,
                canvasWidth,
                canvasHeight,
                ratio,
                ltopTitleMargin,
                ltopTitleHeight,
                scaleLength,
                scaleDirectionY
            } = this,
            {yAxisDatas} = this.state,
            textMaxWidth = getTextMaxWidth(ctx, yAxisDatas, font),
            textMaxHeight = getNumber(font),
            scaleLengthY = scaleDirectionY === "left" ? scaleLength : 0,
            axisStartX = padding * ratio + textMaxWidth + textMargin + scaleLengthY,
            axisEndX = (canvasWidth - padding) * ratio,
            axisStartY = padding * ratio + ltopTitleHeight + ltopTitleMargin,
            axisEndY = (canvasHeight - padding) * ratio - textMaxHeight - textMargin,

            xAxisStart = {
                x: axisStartX,
                y: axisEndY
            },
            xAxisEnd = {
                x: axisEndX,
                y: axisEndY
            },
            yAxisStart = {
                x: axisStartX,
                y: axisStartY
            },
            yAxisEnd = {
                x: axisStartX,
                y: axisEndY
            };
        this.axisStartX = axisStartX;
        this.axisEndX = axisEndX;
        this.axisStartY = axisStartY;
        this.axisEndY = axisEndY;
        strokeLine(ctx, xAxisStart, xAxisEnd, undefined, axisColor);
        strokeLine(ctx, yAxisStart, yAxisEnd, undefined, axisColor);
        // 坐标轴绘制完成调用绘制刻度线函数
        this.drawScaleAndTxt(ctx);
    };

    // 画刻度线以及刻度线对应的文字（特别说明：柱状图也在该方法中绘制的）
    drawScaleAndTxt = (ctx) => {
        let {
                yAxisDatas,
                xAxisDatas,
                markIndex
            } = this.state,
            {
                padding,
                ratio,
                scaleBoundaryGap,
                scaleLength,
                scaleDirectionY,
                axisStartX,
                axisEndX,
                axisStartY,
                axisEndY,
                axisColor,
                firstScaleX,
                firstScaleY,
                scaleTextColor,
                scaleTextFont,
                yAxisTextAlign,
                textMargin,
                gridDashX,
                gridColorX,
                xAxisScaleAlign,
                xAxisTxtAlign,
                barPadding,
                barBgColor,
                markLineColor,
                markLineWidth,
                markLineDash,
                circlePointColor,
                circlePointRadius,
                roundRectRadius,
                roundRectPadding,
                roundRectMargin,
                markFont,
                roundRectBgColor,
                markTextColor
            } = this,
            xAxisTitles = [],
            xAxisFlexs = [],
            xAxisValues = [],
            yAxisTitles = [],
            yAxisFlexs = [],
            yAxisValues = [];

        ///*********************-整理x、y轴传入的基础数据-*********************///
        ///****************************************************************///

        // 检测传入的X、Y轴参数是否合法
        this.checkParams(xAxisDatas);
        this.checkParams(yAxisDatas);

        // 整理x轴数据
        for (let i in xAxisDatas) {
            let {title = "", flex = "undefined", value = undefined} = xAxisDatas[i];
            if (value === undefined) return console.error("value is required!");
            xAxisValues.push(value);
            xAxisTitles.push(title);
            xAxisFlexs.push(flex);
        }

        // 整理Y轴值
        for (let i in yAxisDatas) {
            let {title = "", flex = "undefined", value = undefined} = yAxisDatas[i];
            if (value === undefined) return console.error("value is required!");
            let patt = new RegExp(value, "i"),
                hasEqualValue = patt.test(String(yAxisValues));
            if (!hasEqualValue) yAxisValues.push(value);
            yAxisTitles.push(title);
            yAxisFlexs.push(flex);
        }
        yAxisValues.sort((a, b) => {
            return a - b
        });

        ///*********************-检查x、y轴基础数据中是否有启用flex属性-*********************///
        ///*****************************************************************************///

        // flex值优先级最高，这个决定后边的算法
        let totalFlexX = this.getTotalFlex(xAxisFlexs),
            totalFlexY = this.getTotalFlex(yAxisFlexs);

        // 如果启用了flex值，检查数据组中是否有改属性缺省项
        let yUsingFlex = totalFlexY && yAxisFlexs.toString().match(/undefined/i),
            xUsingFlex = totalFlexX && xAxisFlexs.toString().match(/undefined/i);
        if (yUsingFlex || xUsingFlex) return console.error("you has used flex property, some flex's value is missing");

        let xCurrentFlex = 0,
            xAxisScaleTotalLength = axisEndX - axisStartX - scaleBoundaryGap,
            xMaxValue = getMaxNumber(xAxisTitles),
            xUnitLength = totalFlexX ? (xAxisScaleTotalLength / totalFlexX).toFixed(2) : (xAxisScaleTotalLength / xMaxValue).toFixed(2),
            yAxisScaleTotalLength = axisEndY - axisStartY - scaleBoundaryGap,
            yUnitLength = !totalFlexY ? (yAxisScaleTotalLength / yAxisValues[yAxisValues.length - 1]).toFixed(2) : (yAxisScaleTotalLength / totalFlexY).toFixed(2),
            yAxisStartX = scaleDirectionY === "left" ? axisStartX - scaleLength : axisStartX,
            yAxisEndX = scaleDirectionY === "left" ? axisStartX : axisStartX + scaleLength,
            textStartX = yAxisTextAlign === "left" ? padding * ratio : yAxisStartX - textMargin,
            yCurrentFlex = 0,
            preventScaleStartX = axisStartX;

        ///******************************-x轴绘图-******************************///
        ///*******************************************************************///
        for (let i = 0; i < xAxisValues.length; i++) {
            xCurrentFlex += xAxisFlexs[i];
            let scaleStartX = axisStartX + (totalFlexX ? xUnitLength * xCurrentFlex : xUnitLength * getNumber(xAxisTitles[i]));
            scaleStartX = i === xAxisValues.length - 1 ? axisEndX - scaleBoundaryGap : scaleStartX;
            let barHeight = yUnitLength * xAxisValues[i], // 单个柱状图高度
                barWidth = scaleStartX - preventScaleStartX - 2 * barPadding,
                scaleCoord = {
                    startCoord: {
                        x: xAxisScaleAlign === "center" ? scaleStartX - xUnitLength / 2 : scaleStartX,
                        y: axisEndY
                    },
                    endCoord: {
                        x: xAxisScaleAlign === "center" ? scaleStartX - xUnitLength / 2 : scaleStartX,
                        y: axisEndY + scaleLength
                    }
                },
                barCoord = {
                    x: !i ? axisStartX - 1 + barPadding : preventScaleStartX + barPadding - 1,
                    y: axisEndY - barHeight
                };

            // 绘制x轴刻度线
            strokeLine(ctx, scaleCoord.startCoord, scaleCoord.endCoord, undefined, axisColor);
            // 绘制x轴文本
            if (xAxisScaleAlign === "center" || (xAxisScaleAlign !== "center" && xAxisTxtAlign === "center")) {
                let textCoord = {
                    x: scaleCoord.startCoord.x,
                    y: axisEndY + scaleLength + textMargin
                };
                writeText(ctx, xAxisTitles[i], textCoord, scaleTextFont, scaleTextColor, "center", "top");
            } else if (xAxisScaleAlign !== "center" && xAxisTxtAlign === "between") {
                let textCoord = {
                    x: scaleCoord.startCoord.x - xUnitLength / 2,
                    y: axisEndY + scaleLength + textMargin
                };
                writeText(ctx, xAxisTitles[i], textCoord, scaleTextFont, scaleTextColor, "center", "top");
            }
            // 绘制柱状图
            strokeBar(ctx, barCoord, barWidth, barHeight, barBgColor[i], undefined, undefined);

            preventScaleStartX = scaleStartX;
        }

        // x轴0点刻度线
        if (firstScaleX) strokeLine(ctx, {
            x: axisStartX,
            y: axisEndY
        }, {
            x: axisStartX,
            y: axisEndY + scaleLength
        }, undefined, axisColor);

        // x轴0点刻度线文字
        if (firstScaleX && xAxisTxtAlign === "center") {
            let textCoord = {
                x: axisStartX,
                y: axisEndY + scaleLength + textMargin
            };
            writeText(ctx, "0", textCoord, scaleTextFont, scaleTextColor, "center", "top");
        }

        ///******************************-y轴绘图-******************************///
        ///*******************************************************************///
        for (let i = 0; i < yAxisValues.length; i++) {
            yCurrentFlex += yAxisFlexs[i];
            let height = !totalFlexY ? yUnitLength * yAxisValues[i] : yUnitLength * yCurrentFlex,
                isLastScale = i === yAxisValues.length - 1,
                scaleCoord = {
                    startCoord: {
                        x: yAxisStartX,
                        y: isLastScale ? axisStartY + scaleBoundaryGap : axisEndY - height
                    },
                    endCoord: {
                        x: yAxisEndX,
                        y: isLastScale ? axisStartY + scaleBoundaryGap : axisEndY - height
                    }
                },
                textCoord = {
                    x: textStartX,
                    y: isLastScale ? axisStartY + scaleBoundaryGap : axisEndY - height
                },
                gridCoordX = {
                    startCoord: {
                        x: scaleDirectionY === "left" ? axisStartX : axisStartX + scaleLength,
                        y: isLastScale ? axisStartY + scaleBoundaryGap : axisEndY - height
                    },
                    endCoord: {
                        x: axisEndX,
                        y: isLastScale ? axisStartY + scaleBoundaryGap : axisEndY - height
                    }
                };

            // 与X轴平行的栅格线
            if (i) strokeLine(ctx, gridCoordX.startCoord, gridCoordX.endCoord, undefined, gridColorX, gridDashX);
            // Y轴刻度线
            if (!(!firstScaleY && !i)) strokeLine(ctx, scaleCoord.startCoord, scaleCoord.endCoord, undefined, axisColor);
            // Y轴文本
            if (!(!firstScaleY && !i)) writeText(ctx, yAxisTitles[i], textCoord, scaleTextFont, scaleTextColor, yAxisTextAlign, BASE_LINE);
        }

        ///*****************-绘制markLine、markPoint、markText-******************///
        ///********************************************************************///
        if (markIndex !== "none") {
            let flexSum = 0;
            if (totalFlexX) {
                for (let i = 0; i < markIndex; i++) {
                    flexSum += xAxisFlexs[i]
                }
            }
            let coordX = axisStartX + (totalFlexX ? xUnitLength * flexSum : xUnitLength * getNumber(xAxisTitles[markIndex]));
            coordX = markIndex === xAxisValues.length - 1 ? axisEndX - scaleBoundaryGap - xUnitLength / 2 : coordX + xUnitLength / 2;
            let startCoord = {
                    x: coordX,
                    y: axisEndY
                },
                endCoord = {
                    x: coordX,
                    y: axisEndY - yUnitLength * xAxisValues[markIndex]
                },
                // 以下部分变量用于roundRect和markText
                txtWidth = getTextMaxWidth(ctx, xAxisValues[markIndex], markFont, true),
                txtHeight = getNumber(markFont),
                {
                    paddingTop,
                    paddingBottom,
                    paddingLeft,
                    paddingRight
                } = this.getEachSidePadding(roundRectPadding),
                roundRectW = txtWidth + paddingLeft + paddingRight,
                roundRectH = Number(txtHeight) + paddingTop + paddingBottom,
                roundRectX = endCoord.x,
                roundRectY = endCoord.y - circlePointRadius - roundRectMargin - roundRectH;
            let markTxtCoord = {
                x: endCoord.x + paddingLeft,
                y: roundRectY + paddingTop + 2
            };
            strokeLine(ctx, startCoord, endCoord, markLineWidth, markLineColor, markLineDash);
            circlePoint(ctx, endCoord.x, endCoord.y, circlePointRadius, circlePointColor);
            roundRect(ctx, roundRectX, roundRectY, roundRectW, roundRectH, roundRectRadius, roundRectBgColor);
            writeText(ctx, xAxisValues[markIndex], markTxtCoord, markFont, markTextColor, "left", "top");
        }
    };

    getEachSidePadding = (paddingStr) => {
        let paddingArr = getNumber(paddingStr, true),
            paddingLeft = 0,
            paddingRight = 0,
            paddingTop = 0,
            paddingBottom = 0,
            paddingArrLength = paddingArr.length;
        switch (paddingArrLength) {
            case 1:
                paddingLeft = paddingRight = paddingTop = paddingBottom = paddingArr[0];
                break;
            case 2:
                paddingTop = paddingBottom = paddingArr[0];
                paddingLeft = paddingRight = paddingArr[1];
                break;
            case 3:
                paddingTop = paddingArr[0];
                paddingLeft = paddingRight = paddingArr[1];
                paddingBottom = paddingArr[2];
                break;
            case 4:
                paddingTop = paddingArr[0];
                paddingRight = paddingArr[1];
                paddingBottom = paddingArr[2];
                paddingLeft = paddingArr[3];
                break;
            default:
                break;
        }
        return {
            paddingTop: Number(paddingTop),
            paddingBottom: Number(paddingBottom),
            paddingLeft: Number(paddingLeft),
            paddingRight: Number(paddingRight)
        }
    };

    // 获取x、y轴flex的总数
    getTotalFlex = (flexArr) => {
        let totalFlex = 0;
        flexArr.map((item) => {
            totalFlex = item === "undefined" ? totalFlex : item + totalFlex;
        });
        return totalFlex;
    };

    checkParams = (params) => {
        if (!params) {
            return console.error(params + "is required, and its type should be Array!");
        } else if (!Array.isArray(params)) {
            return console.error("data type should be Array!")
        }
    };

    render() {
        return (
            <canvas id="chart-bar"/>
        );
    }
}

export default BarCharts;
