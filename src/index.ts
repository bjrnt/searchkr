import search from './searcher'
import scrape, {Match} from './scraper'

export default (term: string): Promise<Match[]> => search(term).then(scrape)
