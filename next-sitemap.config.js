/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://newquiz-app.vercel.app/",
  generateRobotsTxt: true,
}