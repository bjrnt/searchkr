import search from './searcher'
import scrape, { Result } from './scraper'

export default (term: string): Promise<Result[]> => search(term).then(scrape)

export { Result, Meaning } from './scraper'
