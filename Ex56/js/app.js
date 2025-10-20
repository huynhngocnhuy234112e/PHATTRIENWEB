const $ = id => document.getElementById(id);
const input = () => $('input').value || '';

function setResult(text) {
    $('result').value = text;
}

function getWords(str) {
    const m = str.match(/[\p{L}\p{N}]+/gu);
    return m ? m : [];
}

function enterData() {
    setResult(input());
}

function countUpper() {
    const arr = input().match(/[\p{Lu}]/gu); // Uppercase Unicode
    const n = arr ? arr.length : 0;
    setResult(`Uppercase characters: ${n}`);
}

function toUppercase() {
    setResult(input().toUpperCase());
}

function oneWordPerLine() {
    const words = getWords(input());
    setResult(words.join('\n'));
}

function toLowercase() {
    setResult(input().toLowerCase());
}

function wordCount() {
    const words = getWords(input());
    setResult(`Word count: ${words.length}`);
}

function countLower() {
    const arr = input().match(/[\p{Ll}]/gu); // Lowercase Unicode
    const n = arr ? arr.length : 0;
    setResult(`Lowercase characters: ${n}`);
}

function printVowelsConsonants() {
    const str = input();
    const vowelsSet = new Set(['a','e','i','o','u']);
    let v = 0, c = 0, vList = [], cList = [];

    for (const ch of str) {
        // chỉ xét chữ cái (Unicode)
        if (/\p{L}/u.test(ch)) {
        const lower = ch.toLowerCase();
        if (vowelsSet.has(lower)) {
            v++; vList.push(ch);
        } else {
            c++; cList.push(ch);
        }
        }
    }
    setResult(
        `Vowels (${v}): ${vList.join(' ')}\n` +
        `Consonants (${c}): ${cList.join(' ')}`
    );
}

window.addEventListener('DOMContentLoaded', () => {
    $('input').addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') enterData();
    });
});
