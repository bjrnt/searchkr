import search from './searcher'
import scrape, { Result } from './scraper'
import transform, { Options } from './transformer'

export default async function seonbi(query: string, options: Options): Promise<Result[]> {
  const stringResponse = await search(query)
  const results = await scrape(stringResponse)
  const transformed = await transform(query, results, options)
  return transformed
}

export { Result, Meaning } from './scraper'
export { Options } from './transformer'
