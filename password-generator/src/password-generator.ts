const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

export function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

export function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

export function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

export function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
