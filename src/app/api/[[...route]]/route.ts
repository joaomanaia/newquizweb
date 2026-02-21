import { Hono } from "hono"
import { logger } from "hono/logger"
import { handle } from "hono/vercel"
import comparisonquiz from "../comparisonquiz"
import multichoicequiz from "./multichoicequiz"
import numberTrivia from "./numberTrivia"

const app = new Hono().basePath("/api")

app.use(logger())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/comparisonquiz", comparisonquiz)
  .route("/multichoicequiz", multichoicequiz)
  .route("/numberTrivia", numberTrivia)

export const GET = handle(app)
export const POST = handle(app)
export type AppType = typeof routes
