import axios from 'axios'

export default (term: string, maxNumHits: number = 10): Promise<string> =>
  axios
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
      return response.data
    })
