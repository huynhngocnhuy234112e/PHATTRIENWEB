function getValues() {
    const a = document.getElementById('a').value.trim();
    const b = document.getElementById('b').value.trim();
    const c = document.getElementById('c').value.trim();
    return {
        a: a === '' ? NaN : parseFloat(a),
        b: b === '' ? NaN : parseFloat(b),
        c: c === '' ? NaN : parseFloat(c)
    };
}

function showResult(val) {
    const out = document.getElementById('result');
    if (Number.isNaN(val)) {
        out.value = 'NaN';
    } else {
        out.value = (Math.abs(val) >= 1e12 || (Math.abs(val) > 0 && Math.abs(val) < 1e-6))
        ? val.toExponential(6)
        : Number(val.toFixed(12)).toString();
    }
}

function ensureNumbers(...nums) {
    return nums.every(n => typeof n === 'number' && !Number.isNaN(n));
}

function deg2rad(deg) {
    return deg * Math.PI / 180;
}

function calcMax() {
    const { a, b, c } = getValues();
    if (!ensureNumbers(a, b, c)) return showResult(NaN);
    showResult(Math.max(a, b, c));
}

function calcMin() {
    const { a, b, c } = getValues();
    if (!ensureNumbers(a, b, c)) return showResult(NaN);
    showResult(Math.min(a, b, c));
}

function calcSinA() {
    const { a } = getValues();
    if (!ensureNumbers(a)) return showResult(NaN);
    showResult(Math.sin(deg2rad(a)));
}

function calcCosA() {
    const { a } = getValues();
    if (!ensureNumbers(a)) return showResult(NaN);
    showResult(Math.cos(deg2rad(a)));
}

function calcPowAB() {
    const { a, b } = getValues();
    if (!ensureNumbers(a, b)) return showResult(NaN);
    showResult(Math.pow(a, b));
}

function clearAll() {
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('c').value = '';
    document.getElementById('result').value = '';
    document.getElementById('a').focus();
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnMax').addEventListener('click', calcMax);
    document.getElementById('btnMin').addEventListener('click', calcMin);
    document.getElementById('btnSin').addEventListener('click', calcSinA);
    document.getElementById('btnCos').addEventListener('click', calcCosA);
    document.getElementById('btnPow').addEventListener('click', calcPowAB);
    document.getElementById('btnClear').addEventListener('click', clearAll);

    ['a','b','c'].forEach((id, idx, arr) => {
        const el = document.getElementById(id);
        el.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const next = arr[idx + 1];
            (next ? document.getElementById(next) : document.getElementById('btnMax')).focus();
        }
        });
    });
});
