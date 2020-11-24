//
// This file contains non-game-specific utility functions.
//

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//
// COMPATIBILITY
//

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               function(f) {setTimeout(f, 1000/60)};

let getTime;

if (window.performance.now) {
    getTime = function() { return window.performance.now() / 1000; };
} else if (window.performance.webkitNow) {
    getTime = function() { return window.performance.webkitNow() / 1000; };
} else {
    getTime = function() { return new Date().getTime() / 1000; };
}



//
// ERRORS
//

function error(cause) {
    const error = "[ERROR] " + cause;
    console.error(error);
    throw error;
}

function assert(predicate, message) {
    if(!predicate) {
        error(message);
    }
}



//
// GRAPHIC UTILITIES
//


const LONG_TIME_AGO = -1000;

function rgb(r, g, b) {
    if(g === undefined) {
        g = r;
        b = r;
    }

    return "rgb(" + Math.round(r) + ", " + Math.round(g) + ", " + Math.round(b) + ")";
}

function rgba(r, g, b, a) {
    if(b === undefined) {
        a = g;
        g = r;
        b = r;
    }

    a = (a === undefined ? 1 : a);

    return "rgba(" + Math.round(r) + ", " + Math.round(g) + ", " + Math.round(b) + ", " + a + ")";
}

function drawCircularShadow(ctx, x, y, radius, r, g, b) {
    if(r === undefined) {
        r = 0;
        g = 0;
        b = 0;
    } else if(g === undefined) {
        g = r;
        b = r;
    }

    ctx.save();

    const gradient = ctx.createRadialGradient(x, y, radius * 0.75, x, y, radius * 1.3);

    gradient.addColorStop(0, rgba(r, g, b, 1));
    gradient.addColorStop(0.33, rgba(r, g, b, 0.7));
    gradient.addColorStop(0.66, rgba(r, g, b, 0.4));
    gradient.addColorStop(1, rgba(r, g, b, 0));

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(x, y, radius * 1.5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

function fillCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function measureDrawn(image) {
    const pixels = image.getContext("2d").getImageData(0, 0, image.width, image.height).data;

    let left = image.width,
        right = 0,
        top = image.height,
        bottom = 0;

    for(let y = 0; y < image.height; ++y) {
        for(let x = 0; x < image.width; ++x) {
            const index = (y * image.width + x) * 4;

            if(pixels[index + 3] === 0)
                continue;

            if(x < left) left = x;
            if(x > right) right = x;
            if(y < top) top = y;
            if(y > bottom) bottom = y;
        }
    }

    // No filled in pixels
    if(left > right)
        return null;

    return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        width: (right - left) + 1,
        height: (bottom - top) + 1
    };
}

function convertHSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}



//
// NUMBER UTILITIES
//

function max(a, b) {
    return a > b ? a : b;
}

function min(a, b) {
    return a < b ? a : b;
}

function clamp(num, min, max) {
    return (num < min ? min : (num > max ? max : num));
}

function randElement(array) {
    return array[randInt(array.length)];
}

function rand(min, max) {
    if(min === undefined)
        return Math.random();

    if(max === undefined)
        return min * Math.random();

    return min + (max - min) * Math.random();
}

function randInt(min, max) {
    if (min === undefined)
        return -1;
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return clamp(Math.floor(rand(min, max)), min, max - 1);
}

function randBool() {
    return rand() < 0.5;
}

function signum(num) {
    return (num < 0 ? -1 : (num > 0 ? 1 : 0));
}

function abs(num) {
    return (num < 0 ? -num : num);
}

function square(num) {
    return num * num;
}

function ascending(num1, num2) {
    return num1 - num2;
}

function descending(num1, num2) {
    return num2 - num1;
}

function easeInOutSine(value) {
    return (1 - Math.cos(value * Math.PI)) / 2;
}

function easeOutSine(value) {
    return Math.sin(value * 0.5 * Math.PI);
}

function easeInSine(value) {
    return 1 - easeOutSine(1 - value);
}

function isWithin(x, y, left, top, width, height) {
    return x >= left && y >= top && x <= left + width && y <= top + height;
}

function formatNumber(num, totalLength, decimalPlaces) {
    if(decimalPlaces === undefined) decimalPlaces = 0;

    let string = num.toString(),
        dotIndex = string.indexOf('.');

    if(decimalPlaces === 0) {
        if(dotIndex !== -1) string = string.substring(0, dotIndex);
    } else {
        if(dotIndex === -1) {
            dotIndex = string.length;
            string += '.';
        }

        let decimals = string.length - dotIndex - 1,
            expectedLength = string.length + decimalPlaces - decimals;

        if(expectedLength < string.length) {
            string = string.substring(0, expectedLength);
        } else {
            while(string.length < expectedLength) {
                string += '0';
            }
        }
    }

    return pad(string, totalLength);
}

// Initially faded out
function createFade(defaultInDuration, defaultOutDuration) {
    if(defaultInDuration === undefined) {
        defaultInDuration = -1;
    }

    if(defaultOutDuration === undefined) {
        defaultOutDuration = defaultInDuration;
    }

    const fade = {
        defaultInDuration: defaultInDuration,
        defaultOutDuration: defaultOutDuration,

        isFadeIn: false,
        start: LONG_TIME_AGO,
        duration: -1
    };

    fade.fade = function(isFadeIn, duration) {
        const currentValue = this.get();

        this.start = getTime();
        this.isFadeIn = isFadeIn;
        this.duration = (duration !== undefined ? duration : (isFadeIn ? this.defaultInDuration : this.defaultOutDuration));

        if(isFadeIn) {
            this.start -= currentValue * this.duration;
        } else {
            this.start -= (1 - currentValue) * this.duration;
        }

        return this;
    }.bind(fade);

    fade.fadeIn = function(duration) {
        return this.fade(true, duration);
    }.bind(fade);

    fade.fadeOut = function(duration) {
        return this.fade(false, duration);
    }.bind(fade);

    fade.visible = function() {
        return this.fade(true, 0);
    }.bind(fade);

    fade.invisible = function() {
        return this.fade(false, 0);
    }.bind(fade);

    const getRaw0To1 = function() {
        const time = getTime();

        if(time >= this.start + this.duration)
            return 1;
        if(time <= this.start)
            return 0;

        return (time - this.start) / this.duration;
    }.bind(fade);

    fade.get = function() {
        const raw = getRaw0To1();

        return (this.isFadeIn ? raw : 1 - raw);
    }.bind(fade);

    return fade;
}

function createStagedFade(inDuration, stayDuration, outDuration) {
    if(inDuration === undefined || stayDuration === undefined || outDuration === undefined)
        throw "createStagedFade: Must specify inDuration, stayDuration and outDuration";

    const fade = {
        start: getTime(),

        fade: createFade(inDuration, outDuration),

        inDuration: inDuration,
        stayDuration: stayDuration,
        outDuration: outDuration
    };

    fade.get = function() {
        const time = getTime() - this.start;

        if(stayDuration >= 0 && this.fade.isFadeIn && time >= inDuration + stayDuration) {
            const timeDiff = time - (inDuration + stayDuration);

            this.fade.fadeOut();
            this.fade.start -= timeDiff;
        }

        return this.fade.get();
    }.bind(fade);

    fade.fade.fadeIn();

    return fade;
}



//
// STRING STUFF
//

function pad(value, length, prefix) {
    if(value.length >= length) return value;
    if(prefix === undefined) prefix = ' ';

    let string = value;

    while(string.length < length) {
        string = prefix + string;
    }

    return string.substring(string.length - length, string.length);
}



//
// VECTORS
//

const VEC_NEG1 = new Vector2D(-1, -1);

function Vector2D(x, y) {
    this.x = x;
    this.y = y;
}

Vector2D.prototype.toString = function() {
    return "Vector2D(" + this.x + ", " + this.y + ")";
};

/**
 * Create a vector with the given {@param x} and {@param y} components.
 */
function vec(x, y) {
    if (typeof x !== "number" || typeof y !== "number")
        throw "x and y must be numbers: " + x + ", " + y;
    if (isNaN(x) || isNaN(y))
        throw "x and y cannot be NaN: " + x + ", " + y;
    if (x === -1 && y === -1)
        return VEC_NEG1;
    return new Vector2D(x, y);
}

/**
 * Construct a list of vectors from a list of pairs of coordinates in the form [x1, y1, x2, y2, ..., xn, yn].
 */
function vecList() {
    if (arguments.length % 2 !== 0)
        throw "Arguments must be of even length";

    const vecs = [];
    for (let index = 0; index < arguments.length; index += 2) {
        const x = arguments[index],
              y = arguments[index + 1],
              v = vec(x, y);

        vecs.push(v);
    }
    return vecs;
}

function vecAdd(v1, v2) {
    return vec(v1.x + v2.x, v1.y + v2.y);
}

function vecSub(v1, v2) {
    return vec(v1.x - v2.x, v1.y - v2.y);
}

function vecMul(v, mul) {
    return vec(mul * v.x, mul * v.y);
}

/**
 * Linearly interpolate between {@param v1} and {@param v2} with {@param t}
 * giving the distance moved from v1 to v2 as a value from 0 to 1 inclusive.
 */
function vecLin(v1, v2, t) {
    return vec(
        v1.x * (1 - t) + v2.x * t,
        v1.y * (1 - t) + v2.y * t
    );
}

function vecLenSquared(v) {
    return v.x * v.x + v.y * v.y;
}

function vecLen(v) {
    return Math.sqrt(vecLenSquared(v));
}

/**
 * Get the dot product of {@param v1} and {@param v2}.
 */
function vecDot(v1, v2) {
    return v1.x * v2.x + v1.y * v2;
}

/**
 * Get the vector projection of {@param v1} onto {@param v2}.
 */
function vecProject(v1, v2) {
    return vecDot(v1, v2) / vecLen(v2);
}

function vecMidpoint(v1, v2) {
    return vec(
        (v1.x + v2.x) / 2,
        (v1.y + v2.y) / 2
    );
}

function vecEquals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
}

function vecDist(v1, v2) {
    return vecLen(vecSub(v1, v2));
}

function vecListIndexOf(locations, v) {
    for(let index = 0; index < locations.length; ++index) {
        if(vecEquals(locations[index], v))
            return index;
    }
    return -1;
}

function vecListContains(locations, v) {
    return vecListIndexOf(locations, v) !== -1;
}