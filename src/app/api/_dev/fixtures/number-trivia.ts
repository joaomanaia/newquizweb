/**
 * Number trivia fixture data.
 * Each entry is a factual number-trivia pair matching the Numbers API response format.
 */
const triviaEntries = [
  {
    number: 42,
    question:
      "is the answer to the Ultimate Question of Life, the Universe, and Everything according to Douglas Adams.",
  },
  { number: 7, question: "is the number of continents on Earth." },
  { number: 206, question: "is the number of bones in the adult human body." },
  { number: 365, question: "is the number of days in a common year." },
  { number: 88, question: "is the number of keys on a standard piano." },
  { number: 1969, question: "is the year humans first landed on the Moon." },
  {
    number: 640,
    question: "is the number of kilobytes Bill Gates allegedly said should be enough for anybody.",
  },
  { number: 12, question: "is the number of pairs of ribs in the human body." },
  { number: 1024, question: "is the number of bytes in a kilobyte." },
  { number: 299792458, question: "is the speed of light in meters per second." },
  { number: 3, question: "is the number of primary colors." },
  { number: 52, question: "is the number of cards in a standard deck." },
  { number: 8848, question: "is the height of Mount Everest in meters." },
  { number: 26, question: "is the number of letters in the English alphabet." },
  { number: 100, question: "is the boiling point of water in degrees Celsius at sea level." },
  { number: 9, question: "is the number of planets in the solar system if you count Pluto." },
  {
    number: 1776,
    question: "is the year the United States Declaration of Independence was signed.",
  },
  { number: 5280, question: "is the number of feet in a mile." },
  { number: 64, question: "is the number of squares on a chessboard." },
  { number: 150, question: "is the original number of Pokémon in Generation I." },
] as const

export const NUMBER_TRIVIA_FIXTURES = triviaEntries.map(({ number, question }) => ({
  number,
  question,
}))
