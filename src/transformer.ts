import { Result } from './scraper'
import { isKorean } from './utils'

export interface Options {
  maximumMatches?: number
  matchExactly?: boolean
}

export function transform(query: string, results: Result[], options: Options): Promise<Result[]> {
  let transformed = results

  // Only do exact matches for queries in Korean
  if (options.matchExactly && isKorean(query)) {
    transformed = transformed.filter(
      result =>
        // Allow ~되다 ~하다 to be matched as well
        result.word === query || result.word + '하다' === query || result.word + '되다' === query
    )
  }

  if (options.maximumMatches) {
    transformed = transformed.slice(0, options.maximumMatches)
  }

  return Promise.resolve(transformed)
}
