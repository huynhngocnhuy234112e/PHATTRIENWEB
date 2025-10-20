function getValues() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    return { a, b, c };
}

function showResult(text) {
    document.getElementById('result').value = text;
}

function solveQuadratic() {
    const { a, b, c } = getValues();

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        showResult("Please input a, b, c!");
        return;
    }

    if (a === 0) {
        if (b === 0) {
        showResult(c === 0 ? "∞ many solutions" : "No solution");
        } else {
        showResult(`Linear eq: x = ${(-c / b).toFixed(3)}`);
        }
        return;
    }

    const delta = b * b - 4 * a * c;

    if (delta < 0) {
        showResult("No real roots");
    } else if (delta === 0) {
        const x = -b / (2 * a);
        showResult(`x1 = x2 = ${x.toFixed(3)}`);
    } else {
        const sqrtDelta = Math.sqrt(delta);
        const x1 = (-b - sqrtDelta) / (2 * a);
        const x2 = (-b + sqrtDelta) / (2 * a);
        showResult(`x1=${x1.toFixed(3)} ; x2=${x2.toFixed(3)}`);
    }
}

function clearFields() {
    ['a', 'b', 'c', 'result'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('a').focus();
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnSolve').addEventListener('click', solveQuadratic);
    document.getElementById('btnClear').addEventListener('click', clearFields);
});
