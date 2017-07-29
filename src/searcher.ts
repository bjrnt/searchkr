import axios from 'axios'

export default (term: string): Promise<string> =>
  axios
    .get('https://krdict.korean.go.kr/eng/dicSearch/search', {
      params: {
        nationCode: 6,
        viewType: 'A',
        nation: 'eng',
        wordMatchFlag: 'N',
        mainSearchWord: term,
      },
    })
    .then(response => {
      return response.data
    })
