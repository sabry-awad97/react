// Our base cipher
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  " ",
];
const cipherLen = letters.length;
const cipherMaxIndex = cipherLen - 1;

const shiftMessage = (char: string, shiftBy: number): string => {
  // Get the index of the character in the cipher
  const index = letters.indexOf(char.toLowerCase());

  // If it's not a cipher character, return it as-is
  if (index < 0) return char;

  // Get the shifted index
  let shiftedIndex = shiftBy + index;

  // If shifted index is greater than cipher length, start at the beginning
  if (shiftedIndex > cipherMaxIndex) {
    shiftedIndex = shiftedIndex - cipherLen;
  }

  // If shifted index is lower than cipher length, start at the end
  if (shiftedIndex < 0) {
    shiftedIndex = shiftedIndex + cipherLen;
  }

  // Return the shifted letter
  return letters[shiftedIndex];
};
/**
 * Run the encryption algorithm
 */

export const runEncryption = (message: string, shiftBy: number) =>
  message
    .split("")
    .map(char => shiftMessage(char, shiftBy))
    .join("");
