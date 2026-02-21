# NewQuiz Web

Web version of the [NewQuiz Android](https://github.com/joaomanaia/newquiz) application.

[![Tests](https://github.com/joaomanaia/newquizweb/actions/workflows/test.yml/badge.svg)](https://github.com/joaomanaia/newquizweb/actions/workflows/test.yml)

## Project Status

A reimplementation of the original quiz game using a modern web stack.

### Implementation Progress

- [x] **Multi-choice Quiz**: Core logic and UI integrated with OpenTDB.
- [ ] **Comparison Quiz**: API support for countries, movies, and football clubs.
- [ ] **Number Trivia**: API integration for random number facts.
- [ ] **Other**: Logo quiz, Flag quiz, Wordle, and Maze modes.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19
- **API**: Hono
- **Styling**: Tailwind CSS v4, Shadcn UI with Material 3 design
- **Backend**: Firebase

## Getting Started

### Setup

1. Clone the repository.
2. Create a `.env` file:
3. Install dependencies and start:
   ```bash
   bun install
   bun dev
   ```

### Testing

```bash
bun test
```

## Repository Structure

- `src/app`: Next.js routes and Hono API (`/api`).
- `src/components`: UI and shared components.
- `src/core`: Domain logic and utilities.
- `src/model`: Data models and TypeScript definitions.

## Links

- [Android Repository](https://github.com/joaomanaia/newquiz)
- [Android App (Amazon Appstore)](https://www.amazon.com/gp/product/B08T8JN4P9)
