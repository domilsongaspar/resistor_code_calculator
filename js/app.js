'use strict';

var run, addRing, removeRing, nRings = 3, container,
inputs = ['r1', 'r2', 'r3', 'rx'], rValues = [], rTol, resistence, result,
ab, abc, c, d, e, t, ppm;

const mxRings = 7, base = 10;

( function () {
    setRingColours();
    result = document.getElementById('result');
    run = document.getElementById('run');

    document.querySelectorAll('.colours select').forEach((elem) => {
        elem.onchange = function () {
            setRingColours();
        }
    });

    //Start the calc
    run.onclick = function () {        
        rValues = getRingsValue(inputs, nRings);
        rTol = getTolerenceValue(nRings);
        
        //Get the values for the calc
        ab = rValues[0] + rValues[1];
        ab = Number.parseInt(ab);
        c = rValues[2];
        d = rValues[3];
        t = ' &plusmn' + rTol + '\%';

        switch (nRings) {
            case 4:
                resistence = passTo(ab * Math.pow(base, c)) + switchMultiple(ab * Math.pow(base, c)) + t;
                break;
            case 5:                
                abc = Number.parseInt(ab + rValues[2]);
                resistence = passTo(abc * Math.pow(base, d)) + switchMultiple(abc * Math.pow(base, d)) + t;
                break;
            case 6:
                abc = Number.parseInt(ab + rValues[2]);
                ppm = document.getElementById('ppm').value;
                ppm = ' ' + ppm + ' PPM/K';

                if (d == '0.1' || d == '0.01') {
                    resistence = passTo(abc * d) + switchMultiple(abc * d) + t + ppm;
                } else {
                    resistence = passTo(abc * Math.pow(base, d)) + switchMultiple(abc * Math.pow(base, d)) + t + ppm;
                }

                break;
            default:
                resistence = passTo(ab * Math.pow(base, c)) + switchMultiple(ab * Math.pow(base, c)) + ' &plusmn20' + '\%';
        }

        result.innerHTML = `<span>Resultado: ${resistence}</span>`;
        result.classList.remove('hidden');
    }

    addRing = document.getElementById('moreRing');
    addRing.onclick = function () {
        let resistorVisible = document.querySelector('.resistor_img');
        if ((nRings + 1) < mxRings) nRings++;
            setArea(nRings);
            setRingColours();
            
            if (nRings - 3 < 4) {
                resistorVisible.children[nRings-4].classList.add('hidden');
                resistorVisible.children[nRings-3].classList.remove('hidden');
            }

            removeRing = document.querySelectorAll('.remove');
            removeRing.forEach( (el) => {
                el.onclick = function () {
                    setArea(--nRings);
                    if (nRings - 2 < 4) {
                        resistorVisible.children[nRings-2].classList.add('hidden');
                        resistorVisible.children[nRings-3].classList.remove('hidden');
                    }
                }
            });
    }
})();

function setArea (qRings) {
    container = document.querySelectorAll('.control');
    switch (qRings) {
        case 3:
            setHidden(container[0], container[1], container[2]);
            break;
        case 4:
            container[0].classList.remove('hidden');
            setHidden(container[1], container[2]);
            break;
        case 5:
            container[1].classList.remove('hidden');
            setHidden(container[0], container[2]);
            break;
        case 6:
            container[2].classList.remove('hidden');
            setHidden(container[0], container[1]);
            break;
    }
}

function setHidden (...hiddens) {
    hiddens.forEach( (container) => {
        if (!container.classList.contains('hidden')) {
            container.classList.add('hidden');
        }
    });
}

/**
 * @function getRingsValue
 * @param rings array
 * @returns array
 */

function getRingsValue (rings, qtd) {
    let values = [];

    for (let c = 0; c < 3; c++) {
        values[c] = document.getElementById(rings[c]).value;
    }

    switch (qtd) {
        case 4:
            values.push(getTolerenceValue(qtd));
            break;
        case 5:
            values.push(document.querySelector('#fiveRings select.rx').value);
            values.push(getTolerenceValue(qtd));
            break;
        case 6:
            values.push(document.querySelectorAll('#sixRings select.rx')[0].value);
            values.push(document.querySelectorAll('#sixRings select.rx')[1].value);
            values.push(getTolerenceValue(qtd));
            break;
    }

    return values;
}

function getRingsText (qtd) {
    let elems = [], values = [], query = '#threeRings .ring';

    elems = document.querySelectorAll(query);
    elems.forEach((el) => {
        for (let i of el.children) {
            if (el.value == i.value) {
                values.push(i.textContent);
            }
        }
    });    

    switch (qtd) {
        case 4:
            query = '#fourRings .ring';
            queryChanges(query, values);
            break;
        case 5:
            query = '#fiveRings .ring';
            queryChanges(query, values);
            break;
        case 6:
            query = '#sixRings .ring';
            queryChanges(query, values);
            break;
    }       

    return values;
}

function queryChanges (query, values) {
    let elems = document.querySelectorAll(query);
    elems.forEach((el) => {
        for (let i of el.children) {
            if (el.value == i.value) {
                values.push(i.textContent);
            }
        }            
    });
}

function getTolerenceValue (qRings) {
    let tol = '';
    switch (qRings) {
        case 4:
            tol = document.getElementsByClassName('tol')[0].value;
            break;
        case 5:
            tol = document.getElementsByClassName('tol')[1].value;
            break;
        case 6:
            tol = document.getElementsByClassName('tol')[2].value;
            break;
    }

    return tol;
}

function setRingColours () {
    let colourValues = getRingsText(nRings);    
    let colours = {
        "Preto":"#000000",
        "Castanho": "#a52a2a",
        "Vermelho": "#ff0000",
        "Laranja": "#ff9800",
        "Amarelo": "#e9e900",
        "Verde": "#06c506",
        "Azul": "#047fcf",
        "Violeta": "#790079",
        "Cinza": "#808080",
        "Branco": "#ffffff",
        "Dourado": "#f5d006",
        "Prateado": "#c0c0c0"
    },
    bars = [],
    barColours = [];

    for (let i in colourValues) {
        barColours.push(colours[colourValues[i]]);
    }

    switch (nRings) {
        case 3:
            for (let i = 1; i < nRings+1; i++) {
                bars[i-1] = document.querySelector('#resistor_3r rect.ring'+i);
            }

            for (let i = 0; i < bars.length; i++) {
                bars[i].style.fill = barColours[i];
            }
            break;
        case 4:
                for (let i = 1; i < nRings+1; i++) {
                    bars[i-1] = document.querySelector('#resistor_4r rect.ring'+i);
                }
    
                for (let i = 0; i < bars.length; i++) {
                    bars[i].style.fill = barColours[i];
                }
            break;
        case 5:
                for (let i = 1; i < nRings+1; i++) {
                    bars[i-1] = document.querySelector('#resistor_5r rect.ring'+i);
                }
                
                for (let i = 0; i < bars.length; i++) {
                    bars[i].style.fill = barColours[i];
                }
            break;
        case 6:
                for (let i = 1; i < nRings+1; i++) {
                    bars[i-1] = document.querySelector('#resistor_6r rect.ring'+i);
                }
    
                for (let i = 0; i < bars.length; i++) {
                    bars[i].style.fill = barColours[i];
                }
            break;
    }

    for (let j = 0; j < barColours.length; j++) {
        bars[j].style.fill = barColours[j];
    }
}

function switchMultiple (value) {
    if (value >= Math.pow(10, 3) && value < Math.pow(10, 6)) {
        return 'K&#x3A9';
    } else if (value >= Math.pow(10, 6) && value < Math.pow(10, 9)) {
        return 'M&#x3A9';
    } else if (value >= Math.pow(10, 9) && value < Math.pow(10, 13)) {
        return 'G&#x3A9';
    }

    return '&#x3A9';
}

function passTo (value) {
    if (value >= Math.pow(10, 3) && value < Math.pow(10, 6)) {
        return passToKilo(value);
    } else if (value >= Math.pow(10, 6) && value < Math.pow(10, 9)) {
        return passToMega(value);
    } else if (value >= Math.pow(10, 9) && value < Math.pow(10, 13)) {
        return passToGiga(value);
    }

    return value;
}

function passToKilo (value) {
    return value / Math.pow(10, 3);
}

function passToMega (value) {
    return value / Math.pow(10, 6);
}

function passToGiga (value) {
    return value / Math.pow(10, 9);
}