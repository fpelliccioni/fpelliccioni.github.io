/*
Copyright Fernando Pelliccioni 2019-2021

Distributed under the Boost Software License, Version 1.0. (See accompanying
file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
*/


var twp_width_ref = 1389; //926;
var two_height_ref = 409.5; //273;

function escale_gen(a) {
    var h = twp_width * a / twp_width_ref
    var v = two_height * a / two_height_ref

    if (h < v) return h;
    return v;
}
function escale_x(a) {
    return escale_gen(a);
    // return twp_width * a / twp_width_ref
}

function escale_y(a) {
    return escale_gen(a);
    // return two_height * a / two_height_ref
}

function escale_font(a) {
    return escale_gen(a);
    // var o1 = twp_width * a / twp_width_ref
    // var o2 = two_height * a / two_height_ref
    // console.log("escale_font")
    // console.log(a)
    // console.log(o1)
    // console.log(o2)
    // return twp_width * a / twp_width_ref
}

function escale_other(a) {
    return escale_gen(a);
    // return twp_width * a / twp_width_ref
}

var defaultLeftMargin = 0;
var defaultTopMargin = 0;
var sequenceTotalHeight = 0;
var variableTotalHeight = 0;
var rectWidth = 0;
var rectHeight = 0;
var fontSize = 0;
var indexFontSize = 0;
var pointerFontSize = 0;
var labelFontSize = 0;
var pointerTriangleSize = 0;

var defaultElementColor = '#bfffb3'



function setSizes() {

    defaultLeftMargin = escale_x(10);
    defaultTopMargin = escale_y(0);
    sequenceTotalHeight = escale_y(130);
    variableTotalHeight = escale_y(70);


    // console.log(defaultLeftMargin)
    // console.log(defaultTopMargin)
    // console.log(sequenceTotalHeight)
    // console.log(variableTotalHeight)

    // rectWidth = escale_x(80);
    // rectHeight = escale_y(120);
    // fontSize = escale_font(100);

    rectWidth = escale_x(40);
    rectHeight = escale_y(60);
    fontSize = escale_font(32);
    indexFontSize = escale_font(15);
    pointerFontSize = escale_font(32);
    labelFontSize = escale_font(24);

    pointerTriangleSize = escale_other(5);
    arrowTriangleSize = escale_other(4);


    arrayElementSep = escale_x(40);
    sllElementSep = escale_x(88);
    dllElementSep = escale_x(120);

}

function drawArrayElement(two, x, y, text, index, color = defaultElementColor) {

    var textIndex = two.makeText(index, x, y + escale_y(8));
    textIndex.family = "FiraCode"; //"Source Code Pro";

    textIndex.size = indexFontSize
    textIndex.fill = 'white';

    var rect = two.makeRectangle(x, y + escale_y(45), rectWidth, rectHeight);
    rect.fill = color;
    rect.stroke = 'black'
    rect.linewidth = 1;
    // console.log(rect.x)
    // console.log(rect.width)
    // console.log(rect.translation._x)


    var text = two.makeText(text, x, y + escale_y(45) + escale_y(1.5));
    text.family = "FiraCode"; //"Source Code Pro";
    text.size = fontSize

    var group = two.makeGroup(rect, text);//, textIndex);
    // console.log(group.x)
    // return group;

    return {
        group: group,
        rect: rect
    };
}

function drawArrayPastLast(two, x, y) {
    var rect = two.makeRectangle(x, y + escale_y(45), rectWidth, rectHeight);
    rect.fill = '#cacaca';
    rect.stroke = 'black'
    rect.linewidth = 1;

    var group = two.makeGroup(rect);
    // return group;

    return {
        group: group,
        rect: rect
    };

}

// ------------------------------------------------------------------------------

function drawIterator(two, elem, text, color = '#99ff99') {
    var x = elem.rect.translation._x;
    var y = elem.rect.translation._y + elem.rect.height / 2 + escale_y(20);

    var tri = two.makePolygon(x, y, pointerTriangleSize)
    tri.fill = color;
    tri.noStroke();

    // var line = two.makeLine(x, y + pointerTriangleSize, x, y + 50);
    // line.stroke = color;

    // var text = two.makeText(text, x, y + 80);

    var text = two.makeText(text, x, y + escale_y(24));
    text.family = "FiraCode"; //"Source Code Pro";

    text.size = pointerFontSize //80
    text.alignment = 'center'
    text.baseline = 'middle'
    text.fill = color;

    // var group = two.makeGroup(tri, line, text);
    var group = two.makeGroup(tri, text);
    return group;
    // return {
    //     group: group,
    //     tri: tri
    // };
}

// function moveIteratorTo(two, it, elem) {
//     // console.log(it);
//     var tri = it.children[0]
//     it.translation.set(elem.rect.translation._x - tri.translation._x, 0);
//     // it.group.translation.set(elem.rect.translation._x - it.tri.translation._x, 0);
// }


function is_predicate(callable) {
    return callable.properties.inner_parameters == 1;
}

function is_relation(callable) {
    console.log("is_relation() callable:", callable);
    console.log("is_relation() callable.properties:", callable.properties);
    console.log("is_relation() callable.properties.inner_parameters:", callable.properties.inner_parameters);
    return callable.properties.inner_parameters == 2;
}

function execute_callable() {
    if (arguments.length == 0) return undefined;
    var callable = arguments[0];
    if ( ! callable) return undefined;
    console.log("execute_callable() callable:", callable);
    console.log("execute_callable() callable.properties:", callable.properties);
    console.log("execute_callable() callable.properties.inner_parameters:", callable.properties.inner_parameters);
    if (arguments.length != callable.properties.inner_parameters + 1) return undefined;

    if (arguments[1] == '_') return undefined;

    var full_code = callable.properties.inner_code;
    full_code += callable.properties.inner_name + "(";
    full_code += arguments[1];

    if (callable.properties.inner_parameters == 2) {
        if (arguments[2] == '_') return undefined;
        full_code += ", ";
        full_code += arguments[2];
    }

    full_code += ");";

    console.log(full_code)
    var res = eval(full_code)
    // console.log(res)
    return res;

}

function toPaddedHexString(num, len) {
    str = num.toString(16);
    // console.log(num)
    // console.log(str)
    return "0".repeat(len - str.length) + str;
}

function rgb_to_str(color) {
    return "#" +
        toPaddedHexString(color.r, 2) +
        toPaddedHexString(color.g, 2) +
        toPaddedHexString(color.b, 2);
}

// function str_to_rgba(hex, a = 1){
//     var c;
//     if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
//         c= hex.substring(1).split('');
//         if(c.length== 3){
//             c= [c[0], c[0], c[1], c[1], c[2], c[2]];
//         }
//         c= '0x'+c.join('');
//         return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
//     }
//     throw new Error('Bad Hex');
// }

function str_to_rgba_str(hex, alpha = 1) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if ( ! result) return null;

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return 'rgba(' + [r, g, b, alpha].join(',') + ')';

    // return result ? rgba
    //   r: parseInt(result[1], 16),
    //   g: parseInt(result[2], 16),
    //   b: parseInt(result[3], 16)
    // } : null;
  }

function darker(color) {
    color.r -= 10;
    color.r %= 256;
    color.g -= 10;
    color.g %= 256;
    color.b -= 10;
    color.b %= 256;
    return color
}

function clone_color(color) {
    return { r: color.r, g: color.g, b: color.b };
}

function get_colors_array(n) {
    if (n == 2) {
        return [
            { r: 0xd8, g: 0x98, b: 0xa7 },          //red
            { r: 0xff, g: 0xa5, b: 0x2e },          //orange
            { r: 0xf6, g: 0xff, b: 0x5b },          //yellow
            { r: 191, g: 255, b: 179 },             //green
        ];
    }

    if (n == 3) {
        return [
            { r: 0xd8, g: 0x98, b: 0xa7 },          //red
            { r: 0xff, g: 0xa5, b: 0x2e },          //orange
            { r: 0xff, g: 0x41, b: 0xdf },          //pink
            { r: 0xf6, g: 0xff, b: 0x5b },          //yellow
            { r: 0xd1, g: 0x41, b: 0xff },          //purple
            { r: 0x41, g: 0x4c, b: 0xff },          //blue
            { r: 0x41, g: 0xc3, b: 0xff },          //cyan
            { r: 191, g: 255, b: 179 },             //green
        ];
    }

    return undefined;
}


function doColorWork(value, callables, green, red, defaultElementColor, prev) {
    var green_def = { r: 191, g: 255, b: 179 };
    var red_def = { r: 0xd8, g: 0x98, b: 0xa7 };

    // let color = colors[index];
    let color = defaultElementColor;

    if (callables) {
        console.log("doColorWork() callables is defined.");
        // console.log(`callables: ${callables}`)
        // console.log(`callables[0]: ${callables[0]}`)
        // console.log(`callables[1]: ${callables[1]}`)
        // console.log(`Array.isArray(callables): ${Array.isArray(callables)}`)
        if (Array.isArray(callables)) {
            console.log("doColorWork() callables is an array.");
            var colors_array = get_colors_array(callables.length);
            console.log(`callables.length: ${callables.length}`)
            if ( ! colors_array) {
                color = rgb_to_str(green);
            } else {
                var color_index = 0;
                for (let callable_idx = 0; callable_idx < callables.length; ++callable_idx) {
                    var current_callable = callables[callable_idx];
                    console.log(`callable_idx: ${callable_idx}`)
                    console.log(`current_callable: ${current_callable}`)
                    console.log(`value: ${value}`)
                    if (execute_callable(current_callable, value)) {
                        color_index ^= 1 << callable_idx;
                        // console.log(`predicate ${callable_idx} true`)
                    } else {
                        // console.log(`predicate ${callable_idx} false`)
                    }
                }
                // console.log(`color_index: ${color_index}`)
                color = rgb_to_str(colors_array[color_index]);

                // var start_color = clone_color(green_def);
                // red = clone_color(red_def);
                // for (let callable_idx = 0; callable_idx < callables.length; ++callable_idx) {
                //     var current_callable = callables[callable_idx];
                //     if (execute_callable(current_callable, value)) {
                //         start_color = darker(start_color)
                //     }
                // }
                // color = rgb_to_str(start_color);
            }

        } else {
            console.log("doColorWork() callables is not an array.");
            if (is_predicate(callables) && ! execute_callable(callables, value)) {
                console.log("doColorWork() callables is a predicate.");
                color = rgb_to_str(red);
            } else {
                console.log("doColorWork() callables is not a predicate.");
                color = rgb_to_str(green);
            }
            if (is_relation(callables)) {
                console.log("doColorWork() callables is a relation.");
                // if (index != 0) {
                if (prev) {
                    // let prev = arr[index - 1];

                    var res = execute_callable(callables, value, prev);
                    // console.log(res)
                    // console.log(res != undefined)
                    // console.log(! res)

                    if ( res != undefined && ! res) {
                        color = rgb_to_str(green);
                        green = darker(green)
                        red = clone_color(red_def);
                    } else {
                        color = rgb_to_str(red);
                        red = darker(red)
                        green = clone_color(green_def);
                    }
                } else {
                    color = rgb_to_str(green);
                    green = darker(green)
                }
            }
        }
    } else {
        color = rgb_to_str(green);
    }

    return color;
}

function drawArray(two, chart, name, id, arr, capacity, callables, drawChart) {

    // console.log(arr)

    if (capacity == undefined) {
        capacity = arr.length
    }

    var elements = []
    var leftMargin = defaultLeftMargin;
    var topMargin = defaultTopMargin + id * sequenceTotalHeight;

    if (name) {
        name += ":"
        var text = two.makeText(name, leftMargin, topMargin +  escale_y(45));
        text.family = "FiraCode"; //"Source Code Pro";
        text.size = labelFontSize
        text.alignment = 'left'
        text.fill = '#99ff99';
        leftMargin += 14.46 * name.length
    }



    var green_def = { r: 191, g: 255, b: 179 };
    var red_def = { r: 0xd8, g: 0x98, b: 0xa7 };
    var green = clone_color(green_def);
    var red = clone_color(red_def);
    var colors = [];
    var borders = [];

    for (let index = 0; index < arr.length; ++index) {
        let value = arr[index];

        let prev = undefined;
        if (index != 0) {
            prev = arr[index - 1];
        }
        var color = doColorWork(value, callables, green, red, defaultElementColor, prev);

        if (drawChart) {
            colors.push(str_to_rgba_str(color, 0.2));
            borders.push(str_to_rgba_str(color, 1));
        }

        var e = drawArrayElement(two, leftMargin + rectWidth / 2 + index * arrayElementSep, topMargin, value, index, color);
        elements.push(e)
        // console.log(value);
    }

    // -------------------------------------------------
    // console.log(colors);
    // console.log(borders);

    if (drawChart) {
        if (chart == null) {
            chart = createChart();
        }

        chart.data = {
            labels: arr,
            datasets: [{
                // label: 'asdasd',
                data: arr,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 3
            }]
        };
        chart.update();
    }
    // -------------------------------------------------


    var cap_len = capacity - arr.length;

    // console.log(cap_len)

    for (let index = 0; index < cap_len; ++index) {
        var e = drawArrayPastLast(two, leftMargin + rectWidth / 2 + (arr.length + index) * arrayElementSep, topMargin);
        elements.push(e)
    }

    var e_last = drawArrayPastLast(two, leftMargin + rectWidth / 2 + (arr.length + cap_len) * arrayElementSep, topMargin);
    elements.push(e_last)

    two.update();

    return elements;
}


function drawArrayNamedElementFinish(x, name, text) {

    var min_width = 2 * escale_x(19.2) + escale_x(5);

    if (text && text.toString().length > 2) {
        var w = text.toString().length * escale_x(19.2) + escale_x(5);
    } else {
        var w = min_width
    }

    return x + escale_x(14.46) * name.length + w / 2 + w
}

function drawArrayNamedElementSimple(two, x, y, name, text, color = defaultElementColor) {

    // console.log(text)
    // console.log(text.toString())
    // console.log(text.toString().length)

    var min_width = 2 * escale_x(19.2) + escale_x(5);

    if (text != undefined && text.toString().length > 2) {
        var w = text.toString().length * escale_x(19.2) + escale_x(5);
    } else {
        // var w = rectWidth
        var w = min_width
    }

    if (name) {
        name += ":"
        var nameElement = two.makeText(name, x, y + escale_y(30));
        nameElement.family = "FiraCode"; //"Source Code Pro";
        nameElement.size = labelFontSize
        nameElement.alignment = 'left'
        nameElement.fill = '#99ff99';
        // leftMargin += 14.46 * name.length
    }

    var rect = two.makeRectangle(x + escale_x(14.46) * name.length + w / 2, y + escale_y(30), w, rectHeight);
    rect.fill = color;
    rect.stroke = 'black'
    rect.linewidth = 1;

    var textElement = two.makeText(text, x + escale_x(14.46) * name.length + w / 2, y + escale_y(30) + escale_y(1.5));
    textElement.family = "FiraCode"; //"Source Code Pro";
    textElement.size = fontSize

    var group = two.makeGroup(nameElement, rect, textElement);

    return {
        group: group,
        rect: rect,
        x_finish: x + escale_x(14.46) * name.length + w / 2 + w,
        y: y,
    };
}

function drawArrayUnnamedElement(two, x, y, text, maxTextLen, color = defaultElementColor) {

    var min_width = 2 * escale_x(19.2) + escale_x(5);

    if (maxTextLen == undefined) {
        if (text != undefined) {
            maxTextLen = text.toString().length;
        } else {
            maxTextLen = 1;
        }
    }

    if (maxTextLen > 2) {
        var w = maxTextLen * escale_x(19.2) + escale_x(5);
    } else {
        // var w = rectWidth
        var w = min_width
    }

    var rect = two.makeRectangle(x + escale_x(14.46), y + escale_y(30), w, rectHeight);
    rect.fill = color;
    rect.stroke = 'black'
    rect.linewidth = 1;

    var textElement = two.makeText(text, x + escale_x(14.46), y + escale_y(30) + escale_y(1.5));
    textElement.family = "FiraCode"; //"Source Code Pro";
    textElement.size = fontSize

    // var group = two.makeGroup(nameElement, rect, textElement);
    // return {
    //     // group: group,
    //     rect: rect,
    //     x_finish: x + escale_x(14.46)  + w,
    //     y: y,
    // };

    return x + escale_x(14.46)  + w;
}


function last_elem(dic) {
    var key = Object.keys(dic)[Object.keys(dic).length - 1];
    return dic[key];
}

function drawVariable(two, name, value, initTop) {

    // console.log(name)
    // console.log(value)

    var elements = []

    if ( ! initTop) {
        initTop = defaultTopMargin
    }

    if (Object.keys(variables).length > 0) {
        var last = last_elem(variables);
        var leftMargin = last.elements[0].x_finish;
        var topMargin = last.elements[0].y;

        // console.log('drawArrayNamedElementFinish')
        var finish = drawArrayNamedElementFinish(leftMargin, name, value);
        if (finish > two.width) {
            var leftMargin = defaultLeftMargin;
            topMargin = topMargin + variableTotalHeight;
        }
    } else {
        var topMargin = initTop
        var leftMargin = defaultLeftMargin;
    }

    // console.log('drawArrayNamedElementSimple')

    // var e = drawArrayNamedElementSimple(two,  leftMargin + rectWidth / 2, topMargin + 30, name, value);
    var e = drawArrayNamedElementSimple(two, leftMargin, topMargin, name, value);
    elements.push(e)

    two.update();

    return elements;
}


// ----------------------------------------------------------------------------
// Single-linked Lists
// ----------------------------------------------------------------------------

function drawSingleLinkedList(two, chart, name, id, arr, capacity, callables, drawChart) {

    // console.log(arr)

    if (capacity == undefined) {
        capacity = arr.length
    }

    var elements = []
    var leftMargin = defaultLeftMargin;
    var topMargin = defaultTopMargin + id * sequenceTotalHeight;

    if (name) {
        name += ":"
        var text = two.makeText(name, leftMargin, topMargin +  escale_y(45));
        text.family = "FiraCode"; //"Source Code Pro";
        text.size = labelFontSize
        text.alignment = 'left'
        text.fill = '#99ff99';
        leftMargin += 14.46 * name.length
    }

    var green_def = { r: 191, g: 255, b: 179 };
    var red_def = { r: 0xd8, g: 0x98, b: 0xa7 };
    var green = clone_color(green_def);
    var red = clone_color(red_def);
    var colors = [];
    var borders = [];

    for (let index = 0; index < arr.length; ++index) {
        let value = arr[index];

        // // let color = colors[index];
        // let color = defaultElementColor;

        // if (callables) {
        //     // console.log(`callables: ${callables}`)
        //     // console.log(`callables[0]: ${callables[0]}`)
        //     // console.log(`callables[1]: ${callables[1]}`)
        //     // console.log(`Array.isArray(callables): ${Array.isArray(callables)}`)
        //     if (Array.isArray(callables)) {
        //         var colors_array = get_colors_array(callables.length);
        //         if ( ! colors_array) {
        //             color = rgb_to_str(green);
        //         } else {
        //             var color_index = 0;
        //             for (let callable_idx = 0; callable_idx < callables.length; ++callable_idx) {
        //                 var current_callable = callables[callable_idx];
        //                 if (execute_callable(current_callable, value)) {
        //                     color_index ^= 1 << callable_idx;
        //                     // console.log(`predicate ${callable_idx} true`)
        //                 } else {
        //                     // console.log(`predicate ${callable_idx} false`)
        //                 }
        //             }
        //             // console.log(`color_index: ${color_index}`)
        //             color = rgb_to_str(colors_array[color_index]);

        //             // var start_color = clone_color(green_def);
        //             // red = clone_color(red_def);
        //             // for (let callable_idx = 0; callable_idx < callables.length; ++callable_idx) {
        //             //     var current_callable = callables[callable_idx];
        //             //     if (execute_callable(current_callable, value)) {
        //             //         start_color = darker(start_color)
        //             //     }
        //             // }
        //             // color = rgb_to_str(start_color);
        //         }

        //     } else {
        //         if (is_predicate(callables) && ! execute_callable(callables, value)) {
        //             color = rgb_to_str(red);
        //         } else {
        //             color = rgb_to_str(green);
        //         }
        //         if (is_relation(callables)) {
        //             if (index != 0) {
        //                 let prev = arr[index - 1];

        //                 var res = execute_callable(callables, value, prev);
        //                 // console.log(res)
        //                 // console.log(res != undefined)
        //                 // console.log(! res)

        //                 if ( res != undefined && ! res) {
        //                     color = rgb_to_str(green);
        //                     green = darker(green)
        //                     red = clone_color(red_def);
        //                 } else {
        //                     color = rgb_to_str(red);
        //                     red = darker(red)
        //                     green = clone_color(green_def);
        //                 }
        //             } else {
        //                 color = rgb_to_str(green);
        //                 green = darker(green)
        //             }
        //         }
        //     }
        // } else {
        //     color = rgb_to_str(green);
        // }


        let prev = undefined;
        if (index != 0) {
            prev = arr[index - 1];
        }

        var color = doColorWork(value, callables, green, red, defaultElementColor, prev);

        if (drawChart) {
            colors.push(str_to_rgba_str(color, 0.2));
            borders.push(str_to_rgba_str(color, 1));
        }

        var e = drawSingleLinkedListElement(two, leftMargin + rectWidth / 2 + index * sllElementSep, topMargin, value, index, color);
        elements.push(e)

        // console.log(value);
    }

    // -------------------------------------------------
    // console.log(colors);
    // console.log(borders);

    if (drawChart) {
        if (chart == null) {
            chart = createChart();
        }

        chart.data = {
            labels: arr,
            datasets: [{
                // label: 'asdasd',
                data: arr,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 3
            }]
        };
        chart.update();
    }
    // -------------------------------------------------


    var cap_len = capacity - arr.length;

    // console.log(cap_len)

    for (let index = 0; index < cap_len; ++index) {
        var e = drawSingleLinkedListPastLast(two, leftMargin + rectWidth / 2 + (arr.length + index) * sllElementSep, topMargin);
        elements.push(e)
    }

    var e_last = drawSingleLinkedListPastLast(two, leftMargin + rectWidth / 2 + (arr.length + cap_len) * sllElementSep, topMargin);
    elements.push(e_last)

    two.update();

    return elements;
}

function drawSingleLinkedListElement(two, x, y, text, index, color = defaultElementColor) {

    var textIndex = two.makeText(index, x, y + escale_y(8));
    textIndex.family = "FiraCode"; //"Source Code Pro";

    textIndex.size = indexFontSize
    textIndex.fill = 'white';

    var rect = two.makeRectangle(x, y + escale_y(45), rectWidth, rectHeight);
    rect.fill = color;
    rect.stroke = 'black'
    rect.linewidth = 1;
    // console.log(rect.x)
    // console.log(rect.width)
    // console.log(rect.translation._x)



    var nextRect = two.makeRectangle(x + (rectWidth * 3 / 4), y + escale_y(45), (rectWidth / 2), rectHeight);
    nextRect.fill = '#cacaca';
    nextRect.stroke = 'black'
    nextRect.linewidth = 1;

    var arrowCircle = two.makeCircle(x + (rectWidth * 3 / 4), y + escale_y(45) + escale_y(1.5), 2);
    arrowCircle.stroke = "white";
    arrowCircle.fill = "white";

    var arrowLine = two.makeLine(x + (rectWidth * 3 / 4),
                                 y + escale_y(45) + escale_y(1.5),
                                 x + rectWidth + (rectWidth / 2),
                                 y + escale_y(45) + escale_y(1.5));
    arrowLine.stroke = "white";
    arrowLine.fill = "white";

    var arrowTri = two.makePolygon(x + rectWidth + escale_x(20),
                                   y + escale_y(45) + escale_y(1.5),
                                   arrowTriangleSize)
    arrowTri.fill = "white";
    arrowTri.noStroke();
    arrowTri.rotation = (Math.PI / 2);

    var text = two.makeText(text, x, y + escale_y(45) + escale_y(1.5));
    text.family = "FiraCode"; //"Source Code Pro";
    text.size = fontSize

    var group = two.makeGroup(rect, text, nextRect, arrowCircle, arrowLine, arrowTri);//, textIndex);
    // console.log(group.x)
    // return group;

    return {
        group: group,
        rect: rect
    };
}

function drawSingleLinkedListPastLast(two, x, y, text, index, color = defaultElementColor) {

    var rect = two.makeRectangle(x, y + escale_y(45), rectWidth, rectHeight);
    rect.fill = '#cacaca';
    rect.stroke = 'black'
    rect.linewidth = 1;

    var nextRect = two.makeRectangle(x + (rectWidth * 3 / 4), y + escale_y(45), (rectWidth / 2), rectHeight);
    nextRect.fill = '#cacaca';
    nextRect.stroke = 'black'
    nextRect.linewidth = 1;

    var arrowCircle = two.makeCircle(x + (rectWidth * 3 / 4), y + escale_y(45) + escale_y(1.5), 2);
    arrowCircle.stroke = "black";
    arrowCircle.fill = "black";

    var group = two.makeGroup(rect, nextRect, arrowCircle);

    return {
        group: group,
        rect: rect
    };
}


// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Double-linked Lists
// ----------------------------------------------------------------------------

function drawDoubleLinkedList(two, chart, name, id, arr, capacity, callables, drawChart) {

    // console.log(arr)

    if (capacity == undefined) {
        capacity = arr.length
    }

    var elements = []
    var leftMargin = defaultLeftMargin;
    var topMargin = defaultTopMargin + id * sequenceTotalHeight;

    if (name) {
        name += ":"
        var text = two.makeText(name, leftMargin, topMargin +  escale_y(45));
        text.family = "FiraCode"; //"Source Code Pro";
        text.size = labelFontSize
        text.alignment = 'left'
        text.fill = '#99ff99';
        leftMargin += 14.46 * name.length
    }

    var green_def = { r: 191, g: 255, b: 179 };
    var red_def = { r: 0xd8, g: 0x98, b: 0xa7 };
    var green = clone_color(green_def);
    var red = clone_color(red_def);
    var colors = [];
    var borders = [];

    for (let index = 0; index < arr.length; ++index) {
        let value = arr[index];

        let prev = undefined;
        if (index != 0) {
            prev = arr[index - 1];
        }
        var color = doColorWork(value, callables, green, red, defaultElementColor, prev);

        if (drawChart) {
            colors.push(str_to_rgba_str(color, 0.2));
            borders.push(str_to_rgba_str(color, 1));
        }

        var e = drawDoubleLinkedListElement(two, leftMargin + rectWidth / 2 + index * dllElementSep, topMargin, value, index, color);
        elements.push(e)

        // console.log(value);
    }

    // -------------------------------------------------
    // console.log(colors);
    // console.log(borders);

    if (drawChart) {
        if (chart == null) {
            chart = createChart();
        }

        chart.data = {
            labels: arr,
            datasets: [{
                // label: 'asdasd',
                data: arr,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 3
            }]
        };
        chart.update();
    }
    // -------------------------------------------------


    var cap_len = capacity - arr.length;

    // console.log(cap_len)

    for (let index = 0; index < cap_len; ++index) {
        var e = drawDoubleLinkedListPastLast(two, leftMargin + rectWidth / 2 + (arr.length + index) * dllElementSep, topMargin);
        elements.push(e)
    }

    var e_last = drawDoubleLinkedListPastLast(two, leftMargin + rectWidth / 2 + (arr.length + cap_len) * dllElementSep, topMargin);
    elements.push(e_last)

    two.update();

    return elements;
}

function drawDoubleLinkedListElement(two, x, y, text, index, color = defaultElementColor) {

    var textIndex = two.makeText(index, x + (rectWidth * 3/4), y + escale_y(8));
    textIndex.family = "FiraCode"; //"Source Code Pro";
    textIndex.size = indexFontSize
    textIndex.fill = 'white';

    var prevRect = two.makeRectangle(x, y + escale_y(45), (rectWidth / 2), rectHeight);
    prevRect.fill = '#cacaca';
    prevRect.stroke = 'black'
    prevRect.linewidth = 1;

    var rect = two.makeRectangle(x + (rectWidth * 3/4), y + escale_y(45), rectWidth, rectHeight);
    rect.fill = color;
    rect.stroke = 'black'
    rect.linewidth = 1;
    // console.log(rect.x)
    // console.log(rect.width)
    // console.log(rect.translation._x)

    var nextRect = two.makeRectangle(x + rectWidth + (rectWidth * 1 / 2), y + escale_y(45), (rectWidth / 2), rectHeight);
    nextRect.fill = '#cacaca';
    nextRect.stroke = 'black'
    nextRect.linewidth = 1;


    // Right arrow --------------------------------
    var rightArrowCircle = two.makeCircle(x + rectWidth + (rectWidth * 1 / 2),
                                          y + escale_y(35) + escale_y(1.5), 2);
    rightArrowCircle.stroke = "white";
    rightArrowCircle.fill = "white";

    var rightArrowLine = two.makeLine(x + rectWidth + (rectWidth * 1 / 2),
                                 y + escale_y(35) + escale_y(1.5),
                                 x + rectWidth + rectWidth + (rectWidth / 2),
                                 y + escale_y(35) + escale_y(1.5));
    rightArrowLine.stroke = "white";
    rightArrowLine.fill = "white";

    var rightArrowTri = two.makePolygon(x + rectWidth + rectWidth + escale_x(20),
                                   y + escale_y(35) + escale_y(1.5),
                                   arrowTriangleSize)
    rightArrowTri.fill = "white";
    rightArrowTri.noStroke();
    rightArrowTri.rotation = (Math.PI / 2);

    // Left arrow --------------------------------
    var leftArrowCircle = two.makeCircle(x,
                                         y + escale_y(55) + escale_y(1.5), 2);

    if (index == 0) {
        leftArrowCircle.stroke = "black";
        leftArrowCircle.fill = "black";
    } else {
        leftArrowCircle.stroke = "white";
        leftArrowCircle.fill = "white";
    }

    if (index != 0) {
        var leftArrowLine = two.makeLine(x,
                                    y + escale_y(55) + escale_y(1.5),
                                    x - rectWidth,
                                    y + escale_y(55) + escale_y(1.5));
        leftArrowLine.stroke = "white";
        leftArrowLine.fill = "white";

        var leftArrowTri = two.makePolygon(x - rectWidth - escale_x(2),
                                    y + escale_y(55) + escale_y(1.5),
                                    arrowTriangleSize)
        leftArrowTri.fill = "white";
        leftArrowTri.noStroke();
        leftArrowTri.rotation = (Math.PI / -2);
    }

    var text = two.makeText(text, x + (rectWidth * 3/4), y + escale_y(45) + escale_y(1.5));
    text.family = "FiraCode"; //"Source Code Pro";
    text.size = fontSize

    if (index == 0) {
        var group = two.makeGroup(rect, text, prevRect, nextRect, rightArrowCircle, rightArrowLine, rightArrowTri, leftArrowCircle);
    } else {
        var group = two.makeGroup(rect, text, prevRect, nextRect, rightArrowCircle, rightArrowLine, rightArrowTri, leftArrowCircle, leftArrowLine, leftArrowTri);
    }
    // console.log(group.x)
    // return group;

    return {
        group: group,
        rect: rect
    };
}

function drawDoubleLinkedListPastLast(two, x, y, text, index, color = defaultElementColor) {

    var prevRect = two.makeRectangle(x, y + escale_y(45), (rectWidth / 2), rectHeight);
    prevRect.fill = '#cacaca';
    prevRect.stroke = 'black'
    prevRect.linewidth = 1;

    var rect = two.makeRectangle(x + (rectWidth * 3 / 4), y + escale_y(45), rectWidth, rectHeight);
    rect.fill = '#cacaca';
    rect.stroke = 'black'
    rect.linewidth = 1;

    var nextRect = two.makeRectangle(x + rectWidth + (rectWidth * 1 / 2), y + escale_y(45), (rectWidth / 2), rectHeight);
    nextRect.fill = '#cacaca';
    nextRect.stroke = 'black'
    nextRect.linewidth = 1;

    // Right arrow --------------------------------
    var rightArrowCircle = two.makeCircle(x + rectWidth + (rectWidth * 1 / 2),
                                          y + escale_y(35) + escale_y(1.5), 2);
    rightArrowCircle.stroke = "black";
    rightArrowCircle.fill = "black";


    // Left arrow --------------------------------
    var leftArrowCircle = two.makeCircle(x,
                                         y + escale_y(55) + escale_y(1.5),
                                         2);
    leftArrowCircle.stroke = "white";
    leftArrowCircle.fill = "white";

    var leftArrowLine = two.makeLine(x,
                                    y + escale_y(55) + escale_y(1.5),
                                    x - rectWidth,
                                    y + escale_y(55) + escale_y(1.5));
    leftArrowLine.stroke = "white";
    leftArrowLine.fill = "white";

    var leftArrowTri = two.makePolygon(x - rectWidth - escale_x(2),
                                       y + escale_y(55) + escale_y(1.5),
                                       arrowTriangleSize)
    leftArrowTri.fill = "white";
    leftArrowTri.noStroke();
    leftArrowTri.rotation = (Math.PI / -2);


    var group = two.makeGroup(rect, nextRect, prevRect, rightArrowCircle, leftArrowCircle, leftArrowLine, leftArrowTri);

    return {
        group: group,
        rect: rect
    };
}


// ----------------------------------------------------------------------------


function drawCountedRange(f, n) {

    // console.log(iterators_int[f.name]);
    // console.log(iterators_gui[f.name]);

    var color = iterators_gui[f.name].children[0].fill;
    // console.log(color);

    var elem = f.data.elements[f.index];
    var x = elem.rect.translation._x;
    var y = elem.rect.translation._y + elem.rect.height / 2 + escale_y(24);

    if (n != 0) {
        var elem_last = f.data.elements[f.index + n - 1];
        var x_last = elem_last.rect.translation._x + rectWidth / 2;
        var y_last = elem_last.rect.translation._y + elem_last.rect.height / 2 + escale_y(20);
    } else {
        var elem_last = f.data.elements[f.index + n];
        var x_last = elem_last.rect.translation._x + rectWidth / 2;
        var y_last = elem_last.rect.translation._y + elem_last.rect.height / 2 + escale_y(20);
    }

    var line = two.makeLine(x + escale_x(10), y, x_last, y);
    line.stroke = color;
    line.fill = color;

    // var x1 = two.makeLine(x, y, x, y + 100);
    // x1.stroke = "blue";

    // var x2 = two.makeLine(x_last, y, x_last, y + 100);
    // x2.stroke = "green";

    // var x3 = two.makeLine(elem_last.rect.translation._x, y, elem_last.rect.translation._x, y + 100);
    // x3.stroke = "red";


    // console.log("-------------------------")
    // console.log(x)
    // console.log(x_last)
    // console.log(elem_last.rect.translation._x)
    // console.log("-------------------------")

    var line2 = two.makeLine(x_last, y, x_last, y - escale_y(15));
    line2.stroke = color;
    line2.fill = color;

    var line3 = two.makeLine(x - escale_x(10), y, x - rectWidth / 2, y);
    line3.stroke = color;
    line3.fill = color;

    var line4 = two.makeLine(x - rectWidth / 2, y, x - rectWidth / 2, y - escale_y(15));
    line4.stroke = color;
    line4.fill = color;

    two.update();

    // var tri = two.makePolygon(x, y, pointerTriangleSize)
    // tri.fill = color;
    // tri.noStroke();

    // // var line = two.makeLine(x, y + pointerTriangleSize, x, y + 50);
    // // line.stroke = color;

    // // var text = two.makeText(text, x, y + 80);

    // var text = two.makeText(text, x, y + 30);
    // text.family = "FiraCode"; //"Source Code Pro";

    // text.size = pointerFontSize //80
    // text.alignment = 'center'
    // text.baseline = 'middle'
    // text.fill = color;

    // // var group = two.makeGroup(tri, line, text);
    // var group = two.makeGroup(tri, text);
    // return group;
    // // return {
    // //     group: group,
    // //     tri: tri
    // // };
}

function drawBoundedRange(f, l) {
    // console.log(f);
    // console.log(l);

    // console.log(iterators_int[f.name]);
    // console.log(iterators_gui[f.name]);

    var color = iterators_gui[f.name].children[0].fill;
    // console.log(color);

    var elem = f.data.elements[f.index];
    var x = elem.rect.translation._x;
    var y = elem.rect.translation._y + elem.rect.height / 2 + escale_y(24);


    var n = l.index - f.index

    if (n != 0) {
        var elem_last = f.data.elements[f.index + n - 1];
        var x_last = elem_last.rect.translation._x + rectWidth / 2;
        var y_last = elem_last.rect.translation._y + elem_last.rect.height / 2 + escale_y(20);
    } else {
        var elem_last = f.data.elements[f.index + n];
        var x_last = elem_last.rect.translation._x + rectWidth / 2;
        var y_last = elem_last.rect.translation._y + elem_last.rect.height / 2 + escale_y(20);
    }


    var line = two.makeLine(x + escale_x(10), y, x_last, y);
    line.stroke = color;
    line.fill = color;

    // var x1 = two.makeLine(x, y, x, y + 100);
    // x1.stroke = "blue";

    // var x2 = two.makeLine(x_last, y, x_last, y + 100);
    // x2.stroke = "green";

    // var x3 = two.makeLine(elem_last.rect.translation._x, y, elem_last.rect.translation._x, y + 100);
    // x3.stroke = "red";


    // console.log("-------------------------")
    // console.log(x)
    // console.log(x_last)
    // console.log(elem_last.rect.translation._x)
    // console.log("-------------------------")

    var line2 = two.makeLine(x_last, y, x_last, y - escale_y(15));
    line2.stroke = color;
    line2.fill = color;


    var line3 = two.makeLine(x - escale_x(10), y, x - rectWidth / 2, y);
    line3.stroke = color;
    line3.fill = color;

    var line4 = two.makeLine(x - rectWidth / 2, y, x - rectWidth / 2, y - escale_y(15));
    line4.stroke = color;
    line4.fill = color;


    two.update();


}

function drawTrackedVariables(two, tracks, track_data) {
    // name, id, arr, capacity, callables) {

    console.log("drawTrackedVariables")

    if (track_data.length == 0) return;


    var x = defaultLeftMargin;
    // var y = defaultTopMargin + 0 * rectHeight;
    // var y = defaultTopMargin + seqn * sequenceTotalHeight;

    if (Object.keys(variables).length > 0) {
        console.log("Object.keys(variables).length > 0 -- IF")
        var last = last_elem(variables);
        var y = last.elements[0].y;
        y = y + variableTotalHeight;
    } else {
        console.log("Object.keys(variables).length > 0 -- ELSE")
        var y = defaultTopMargin + seqn * sequenceTotalHeight;
    }

    console.log("defaultLeftMargin: ", defaultLeftMargin);
    console.log("defaultTopMargin: ", defaultTopMargin);
    console.log("rectHeighrectHeight: ", x);

    console.log("x: ", x);
    console.log("y: ", y);



    for (let i = 0; i < tracks.length; ++i) {
        var track_value = tracks[i];
        var name = track_value.name;

        console.log("x: ", x);
        console.log("y: ", y);
        console.log("track_value: ", track_value);
        console.log("name: ", name);

        x = drawArrayUnnamedElement(two, x, y, name, 2); //, color = defaultElementColor)
    }

    for (var i = 0; i < track_data.length; ++i) {
        var current_track = track_data[i];

        y += rectHeight;
        x = defaultLeftMargin;

        for (var j = 0; j < current_track.length; ++j) {
            var d = current_track[j];
            x = drawArrayUnnamedElement(two, x, y, d.value, 2); //, color = defaultElementColor)
        }
    }

    two.update();



    // var elements = []
    // var leftMargin = defaultLeftMargin;
    // var topMargin = defaultTopMargin + id * sequenceTotalHeight;

    // if (name) {
    //     name += ":"
    //     var text = two.makeText(name, leftMargin, topMargin +  escale_y(45));
    //     text.family = "FiraCode"; //"Source Code Pro";
    //     text.size = labelFontSize
    //     text.alignment = 'left'
    //     text.fill = '#99ff99';
    //     leftMargin += 14.46 * name.length
    // }



    // var green_def = { r: 191, g: 255, b: 179 };
    // var red_def = { r: 0xd8, g: 0x98, b: 0xa7 };
    // var green = clone_color(green_def);
    // var red = clone_color(red_def);
    // var colors = [];
    // var borders = [];

    // for (let index = 0; index < arr.length; ++index) {
    //     let value = arr[index];

    //     let prev = undefined;
    //     if (index != 0) {
    //         prev = arr[index - 1];
    //     }
    //     var color = doColorWork(value, callables, green, red, defaultElementColor, prev);

    //     if (drawChart) {
    //         colors.push(str_to_rgba_str(color, 0.2));
    //         borders.push(str_to_rgba_str(color, 1));
    //     }

    //     var e = drawArrayElement(two, leftMargin + rectWidth / 2 + index * arrayElementSep, topMargin, value, index, color);
    //     elements.push(e)
    //     // console.log(value);
    // }



    // var cap_len = capacity - arr.length;

    // // console.log(cap_len)

    // for (let index = 0; index < cap_len; ++index) {
    //     var e = drawArrayPastLast(two, leftMargin + rectWidth / 2 + (arr.length + index) * arrayElementSep, topMargin);
    //     elements.push(e)
    // }

    // var e_last = drawArrayPastLast(two, leftMargin + rectWidth / 2 + (arr.length + cap_len) * arrayElementSep, topMargin);
    // elements.push(e_last)

    // two.update();

    // return elements;
}
