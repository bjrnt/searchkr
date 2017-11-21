import axios from 'axios'
import * as makeDebug from 'debug'

const debug = makeDebug('seonbi-core:searcher')
export async function search(term: string): Promise<string> {
  debug(`Querying for ${term}`)
  const response = await axios.get('https://krdict.korean.go.kr/eng/dicSearch/search', {
    params: {
      nationCode: 6,
      viewType: 'A',
      nation: 'eng',
      wordMatchFlag: 'N',
      mainSearchWord: term,
      blockCount: 10,
    },
  })
  debug(`Got response for ${term}`)
  return response.data
}
