export const isLocalHost = (): boolean => process.env.NODE_ENV === "development"

export const getHost = (): string => {
  return isLocalHost() ? "http://localhost:3000" : "https://newquiz-app.vercel.app"
}
