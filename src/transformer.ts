import { Result } from './scraper'

export interface Options {
  maximumMatches?: number
  matchExactly?: boolean
}

export default function transform(
  query: string,
  results: Result[],
  options: Options
): Promise<Result[]> {
  let transformed = results

  if (options.matchExactly) {
    transformed = transformed.filter(result => result.word === query)
  }

  if (options.maximumMatches) {
    transformed = transformed.slice(0, options.maximumMatches)
  }

  return Promise.resolve(transformed)
}
