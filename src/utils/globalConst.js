/**
 * @Author: wyy
 * @Date: 2019/9/28
 * @Description:
 **/
const BASE_FONT = "20px Arial";
const BASE_AXIS_COLOR = "#BFC1CC";
const BASE_COLOR = "black";
const BASE_LTOP_TITLE_FONT = "24px Arial";
const BASE_LTOP_TITLE_TIPS_FONT = "16px Arial";
const BASE_LTOP_TITLE_COLOR = "#91939E";
const BASE_LTOP_TITLE_TIPS_COLOR = "#BFC1CC";
const BASE_SCALE_TEXT_COLOR = "#BFC1CC";
const BASE_PADDING = 20;
const BASE_TEXT_MARGIN = 10;
const BASE_LEFT_TOP_TITLE = "利率%";
const BASE_LTOP_TITLE_TIPS = "(档位左包含)";
const BASE_LTOP_TITLE_MARGIN = 30;
const BASE_TEXT_ALIGN = "left";
const BASE_LINE = "middle";
const SCALE_BOUNDARY_GAP = 20; // X、Y轴刻度线边界距离
const SCALE_DIRECTION_X = "bottom"; // X轴刻度线方向
const SCALE_DIRECTION_Y = "left"; // Y轴刻度线方向
const SCALE_LENGTH = 6; // 刻度线长度
const FIRST_SCALE_X = true; // Y轴开始刻度线是否要
const FIRST_SCALE_Y = false; // Y轴开始刻度线是否要
const BASE_BAR_PADDING = 0; // 柱子内边距
const X_AXIS_SCALE_ALIGN = "side"; // side为刻度线存在柱子两边 center为刻度线存在柱子中间
const X_AXIS_TXT_ALIGN = "center"; // center为文字与刻度线居中对齐 between为文字存在于两刻度线之间
const BASE_MARK_INDEX = "none"; // 默认无标记
const MARK_LINE_COLOR = "#ff3822";
const MARK_LINE_WIDTH = 2;
const CIRCLE_POINT_COLOR = MARK_LINE_COLOR;
const CIRCLE_POINT_RADIUS = 8;
const ROUND_RECT_BGCOLOR = MARK_LINE_COLOR;
const ROUND_RECT_RADIUS = 18;
const ROUND_RECT_PADDING = "8, 26";
const ROUND_RECT_MARGIN = 10;
const MARK_FONT = BASE_FONT;
const MARK_TEXT_COLOR = "#fff";

const BASE_Y_AXIS = (() => {
    let dataArr = [];
    for (let i = 0; i < 6; i++) {
        dataArr.push({
            title: !i ? i : i.toFixed(4),
            flex: i === 0 ? 0 : 1,
            value: i
        });
    }
    return dataArr;
})();

const BASE_X_AXIS = (() => {
    let dataArr = [];
    for (let i = 1; i < 8; i++) {
        dataArr.push({
            title: i * 5 + "万",
            flex: 1,
            value: (1 + 0.5 * i).toFixed(2)
        });
    }
    return dataArr;
})();

const BAR_BG_COLOR = (() => {
    let dataArr = [];
    for (let i = 1; i < 8; i++) {
        let bgColor = "rgba(76, 96, 191, " + (0.1 + 0.05 * i).toFixed(2) + ")";
        dataArr.push(bgColor);
    }
    return dataArr;
})();

export {
    BASE_Y_AXIS,
    BASE_X_AXIS,
    BASE_FONT,
    BASE_AXIS_COLOR,
    BASE_COLOR,
    BASE_PADDING,
    BASE_TEXT_MARGIN,
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
    BASE_LINE,
    SCALE_DIRECTION_X,
    SCALE_DIRECTION_Y,
    SCALE_LENGTH,
    FIRST_SCALE_X,
    FIRST_SCALE_Y,
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
};
