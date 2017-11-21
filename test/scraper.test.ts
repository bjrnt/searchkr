import scrape from '../src/scraper'
import * as fs from 'fs'

const hanjaBody = fs.readFileSync('test/test-pages/hanja.txt').toString()
const noResultsBody = fs.readFileSync('test/test-pages/no-results.txt').toString()
const oneResultBody = fs.readFileSync('test/test-pages/one-result.txt').toString()
const englishResultBody = fs.readFileSync('test/test-pages/english.txt').toString()
const multipleMeaningBody = fs.readFileSync('test/test-pages/multiple-meanings.txt').toString()

describe('Scraper', () => {
  describe('when there are no matches', () => {
    it('returns an empty array', () => {
      expect(scrape(noResultsBody).length).toEqual(0)
    })
  })

  describe('when there are hanja', () => {
    it('returns the correct hanja', () => {
      const result = scrape(hanjaBody)
      expect(result[0].hanja).toBe('漢字')
      expect(result[3].hanja).toBe('漢字音')
    })

    it('matches the snapshot', () => {
      expect(scrape(hanjaBody)).toMatchSnapshot()
    })
  })

  describe('when there is only one result', () => {
    it('returns one match', () => {
      expect(scrape(oneResultBody).length).toEqual(1)
    })

    it('matches the snapshot', () => {
      expect(scrape(oneResultBody)).toMatchSnapshot()
    })
  })

  describe('when searching for an English word', () => {
    it('results the correct number of results', () => {
      expect(scrape(englishResultBody).length).toEqual(10)
    })

    it('matches the snapshot', () => {
      expect(scrape(englishResultBody)).toMatchSnapshot()
    })
  })

  describe('when there are multiple meanings', () => {
    it('returns a match with the correct number of meanings', () => {
      expect(scrape(multipleMeaningBody)[0].meanings.length).toEqual(3)
    })

    it('does not return numbers in the meanings', () => {
      const result = scrape(multipleMeaningBody)[0]
      result.meanings.forEach(meaning => {
        expect(meaning.translation).not.toMatch(/[0-9]+\. /)
      })
    })

    it('matches the snapshot', () => {
      expect(scrape(multipleMeaningBody)).toMatchSnapshot()
    })
  })
})
