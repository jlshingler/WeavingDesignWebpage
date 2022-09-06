'use strict'

/* Declare Global Variables */

const changeWeaveBtn = document.querySelector('#weave-btn');
const changeOverUnderBtn = document.querySelector('#over-under-btn');
const reset = document.querySelector('.reset');
const baseRow = document.querySelector('.base');
const grid = document.querySelector('.grid');
//const colorSelector = ['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black'];
const colorSelector = ['white', 'red', 'yellow', 'blue'];
const defaultSize = 24;
var columnCount = 24; // this one can be updated
var rowCount = 12;
var isOverUnder = true;
var weaveStyles = ['Vertical', 'Diagonal'];
var weaveStyle = 'Vertical';

/* Event Listeners */
changeWeaveBtn.addEventListener('click', function () {
    var elem = document.getElementById('weave');
    let index = weaveStyles.indexOf(elem.textContent);
    let newIndex = index + 1;
    if (index == weaveStyles.length - 1) {
        newIndex = 0;
    }
    weaveStyle = weaveStyles[newIndex];
    elem.textContent = weaveStyle;
    resetGrids();
});

changeOverUnderBtn.addEventListener('click', function () {
    var elem = document.getElementById('over-under');
    var btn = document.getElementById('over-under-btn');
    var text = "Over / Under:";
    var btnText = "Make Under Over";
    isOverUnder = !isOverUnder;
    if (!isOverUnder) {
        text = "Under / Over:"
        btnText = "Make Over Under"
    }
    elem.textContent = text;
    btn.textContent = btnText;
    resetGrids();
});

reset.addEventListener('click', function () {
    resetGrids();
});

/* Functions */
function resetGrids() {
    var baseElems = document.getElementsByClassName('base-item');
    var gridElems = document.getElementsByClassName('grid-item');
    for (let i = 0; i < baseElems.length; i++) {
        baseElems[i].style.backgroundColor = colorSelector[0];
    }
    for (let i = 0; i < gridElems.length; i++) {
        gridElems[i].style.backgroundColor = colorSelector[0];
    }
}

function makeGrid(rows, cols) {
    grid.style.setProperty('grid-template-columns', 'repeat(' + cols / 2 + ', 1fr)');
    for (let i = 0; i < (rows); i++) {
        for (let j = 0; j < (cols / 2); j++) {
            let cell = document.createElement("div");
            //cell.innerText = i;
            cell.id = "grid-item-" + i + "-" + j;
            grid.appendChild(cell).className = "grid-item";
        }
    };
}

function baseGrid(cols) {
    baseRow.style.setProperty('grid-template-columns', 'repeat(' + cols + ', 1fr)');
    for (let i = 0; i < cols; i++) {
        let cell = document.createElement("div");
        cell.className = "base-item";
        cell.id = "base-item-" + i;
        cell.style.setProperty('background-color', colorSelector[0]);
        cell.onclick = function () { changeColor(cell); };
        baseRow.appendChild(cell);
    }
}

function changeColor(elem) {
    let currentColor = elem.style.backgroundColor;
    let index = colorSelector.indexOf(currentColor);
    let newIndex = index + 1;
    if (index == colorSelector.length - 1) {
        newIndex = 0;
    }

    elem.style.backgroundColor = colorSelector[newIndex];
    let baseNum = parseInt(elem.id.split('-')[2]);
    if (weaveStyle == 'Vertical') {
        for (let i = 0; i < rowCount; i++) {
            if (isOverUnder) { // Over Under -- Working
                let elemID = baseNum;
                if (elemID < rowCount * columnCount) {
                    if (baseNum % 2 == 0) { // handle even base numbers
                        if (i % 2 != 0) { // fill on odd rows
                            var elem = document.getElementById('grid-item-' + i + '-' + elemID / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    } else { // handle odd base numbers
                        if (i % 2 == 0) { // fill on even rows
                            var elem = document.getElementById('grid-item-' + i + '-' + (elemID - 1) / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    }
                }
            } else { //Under Over
                let elemID = baseNum;
                if (elemID < rowCount * columnCount) {
                    if (baseNum % 2 !== 0) { // handle odd base numbers
                        if (i % 2 != 0) { // fill on odd rows
                            var elem = document.getElementById('grid-item-' + i + '-' + (elemID - 1) / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    } else { // handle even base numbers
                        if (i % 2 == 0) { // fill on even rows
                            var elem = document.getElementById('grid-item-' + i + '-' + elemID / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    }
                }
            }
        }
    }
    if (weaveStyle == 'Diagonal') {
        for (let i = 0; i < rowCount; i++) {
            if (isOverUnder) {
                // elemID = baseNum - row
                // if elemID < 0: elemID = elemID + columnCount (reset to the end of the row)
                // color based on which is odd vs even (ie which color is on top)
                let elemID = baseNum - (i * 2);
                if (elemID < 0) {
                    elemID = elemID + columnCount;
                }
                if (elemID < columnCount) {
                    if (baseNum % 2 == 0) { // handle even base numbers
                        if (i % 2 == 0) { // fill on even rows
                            var elem = document.getElementById('grid-item-' + i + '-' + elemID / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    } else { // handle odd base numbers
                        if (i % 2 != 0) { // fill on odd rows
                            var elem = document.getElementById('grid-item-' + i + '-' + (elemID - 1) / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    }
                }
            } else { //Under Over
                // elemID = baseNum - row
                // if elemID < 0: elemID = elemID + columnCount (reset to the end of the row)
                // color based on which is odd vs even (ie which color is on top)
                let elemID = baseNum - (i * 2);
                if (elemID < 0) {
                    elemID = elemID + columnCount;
                }
                if (elemID < rowCount * columnCount) {
                    if (baseNum % 2 == 0) { // handle even base numbers
                        if (i % 2 != 0) { // fill on odd rows
                            var elem = document.getElementById('grid-item-' + i + '-' + elemID / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    } else { // handle odd base numbers
                        if (i % 2 == 0) { // fill on even rows
                            var elem = document.getElementById('grid-item-' + i + '-' + (elemID - 1) / 2);
                            elem.style.backgroundColor = colorSelector[newIndex];
                        }
                    }
                }
            }
        }
    }

};

/* Call Functions */

baseGrid(defaultSize); //default cols
makeGrid(rowCount, defaultSize);