import axios from 'axios'
import * as makeDebug from 'debug'

const debug = makeDebug('searchkr:searcher')
export default (term: string, maxNumHits: number = 10): Promise<string> => {
  debug(`Querying for ${term}`)
  return axios
    .get('https://krdict.korean.go.kr/eng/dicSearch/search', {
      params: {
        nationCode: 6,
        viewType: 'A',
        nation: 'eng',
        wordMatchFlag: 'N',
        mainSearchWord: term,
        blockCount: maxNumHits
      },
    })
    .then(response => {
      debug(`Got response for ${term}`)
      return response.data
    })
}
