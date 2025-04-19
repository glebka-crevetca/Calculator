let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operator = ['+', '-', 'X', '÷', 'log'];
const special = ['sin', 'cos', 'tan', '%', '√', 'n²', 'ln'];

const out = document.querySelector('.display-input p');

function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

function firstZero(str) {
    if (str[0] === '0' && str.length > 1) {
        str = str.slice(1);
    }
    return str;
}

function logorifm(x, y) {
    return Math.log(y) / Math.log(x);
}

document.querySelector('.MC').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('MC')) clearAll;

    out.textContent = '';
    const key = event.target.textContent;
    if (digit.includes(key)) {
        if (b==='' && sign==='') {
            a += key;
            a = firstZero(a);
            a = a.slice(0, 8);
            out.textContent = a;
        }
        else if (a!=='' && b!=='' && finish) {
            b += key;
            b = firstZero(b);
            finish = false;
            b = b.slice(0, 8);
            out.textContent = b;
        }
        else if (a!=='' && special.includes(key)) {
            b = ''
        }
        else {
            b += key;
            b = firstZero(b);
            b = b.slice(0, 8);
            out.textContent = b;
        }
        console.log(a, sign, b);
        return;
    }

    if (operator.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, sign, b);
        return;
    }
    if (key==='+/-') {
        if (sign==='-') {
            sign = '+';
        }
        if (sign==='+') {
            sign = '-';
        }
        out.textContent = sign;
        console.log(a, sign, b);
        return;
    }
    if (special.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, sign, b);
        return;
    }

    if (key === '=') {
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case 'X':
                a = a * b;
                break;
            case '÷':
                if (b==='0') {
                    out.textContent = 'Error';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            case 'log':
                a = logorifm(b, a);
                break;

            case '%':
                a = a / 100;
                break;
            case 'n²':
                a = a * a;
                break;   
            case '√':
                a = Math.sqrt(a);
                break;
            case 'sin':
                a = Math.sin(a);
                break;
            case 'cos':
                a = Math.cos(a);
                break;
            case 'tan':
                a = Math.tan(a);
                break;
            case 'ln':
                a = Math.log(a);
                break;
        }
        finish = true;
        a = Math.round(a*1000) / 1000;
        out.textContent = a;
        console.log(a, sign, b);
        b = '';
    }
}