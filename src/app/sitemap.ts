import type { MetadataRoute, Route } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [addPage("/"), addPage("/list/multichoicequiz")]
}

type SitemapSingleItem = MetadataRoute.Sitemap[number]
type ChangeFrequency = SitemapSingleItem["changeFrequency"]

const siteUrl = "https://newquiz-app.vercel.app"

const addPage = (
  url: Route,
  changeFrequency?: ChangeFrequency,
  priority?: number,
  lastModified?: string | Date
): SitemapSingleItem => {
  return {
    url: `${siteUrl}${url}`,
    lastModified: lastModified,
    changeFrequency: changeFrequency,
    priority: priority,
  }
}
