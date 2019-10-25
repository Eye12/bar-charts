/**
 * @Author: wyy
 * @Date: 2019/9/27
 * @Description:
 **/
import {
    BASE_COLOR,
    BASE_FONT
} from "./globalConst";

export const strokeLine = (ctx, startCoord, endCoord, width = 1, color, dash = undefined) => {
    ctx.beginPath();
    if (dash !== undefined) ctx.setLineDash(dash);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(startCoord.x, startCoord.y);
    ctx.lineTo(endCoord.x, endCoord.y);
    ctx.closePath();
    ctx.stroke();
};

export const strokeBar = (ctx, startCoord, width, height, bgColor = BASE_COLOR, borderWidth = undefined, borderColor = BASE_COLOR) => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(startCoord.x, startCoord.y, width, height);
    if (borderWidth !== undefined) {
        ctx.beginPath();
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;
        ctx.moveTo(startCoord.x, startCoord.y);
        ctx.lineTo(startCoord.x, startCoord.y + height);
        ctx.lineTo(startCoord.x + width, startCoord.y + height);
        ctx.lineTo(startCoord.x + width, startCoord.y);
        ctx.lineTo(startCoord.x, startCoord.y);
        ctx.closePath();
        ctx.stroke();
    }
};

export const writeText = (ctx, text, startCoord, font = BASE_FONT, color, textAlign, baseLine = "bottom") => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;  // 可选值：left、center、right
    ctx.textBaseline = baseLine; // 可选值：top、middle、bottom
    ctx.fillText(text, startCoord.x, startCoord.y)
};

export const roundRect = (ctx, x, y, w, h, r, bgColor) => {
    if (w < 2 * r) r = w / 2;
    if (w < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();
};

export const circlePoint = (ctx, x, y, r, bgColor) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();
};

// 获取一组文本数据中的最大宽度值
export const getTextMaxWidth = (ctx, data, font, isSingle = false) => {
    let maxWidth = 0;
    ctx.font = font;
    if (isSingle) {
        maxWidth = ctx.measureText(data).width;
    } else {
        data.map((item) => {
            maxWidth = Math.max(ctx.measureText(item.title).width, maxWidth);
        })
    }
    return Math.round(maxWidth);
};

// 提取字符串中的数字
export const getNumber = (str = undefined, resArr = false) => {
    if (str) {
        let patt = /([0-9]\d*)(\.\d*)?/g,
            res = str.match(patt);
        if (res) {
            if(resArr) {
                return res;
            }else {
                return res[0];
            }
        } else {
            return res;
        }
    } else {
        console.error("getNumber function does't get transmit params!")
    }
};

// 获取一组数据中的最大值
export const getMaxNumber = (arr) => {
    let maxNumber = 0;
    arr.map((item) => {
        maxNumber = maxNumber > getNumber(item) ? maxNumber : getNumber(item);
    });
    return maxNumber;
};
