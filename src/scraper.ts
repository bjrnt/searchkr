import * as cheerio from 'cheerio'
import * as makeDebug from 'debug'

const debug = makeDebug('searchkr:scraper')

export interface Result {
    word: string,
    hanja: string | null,
    type: string,
    meanings: Meaning[]
}

export interface Meaning {
    translation: string,
    en: string,
    kr: string
}

const getWord = ($: Cheerio): string => $.find('strong').first().text()
const getType = ($: Cheerio): string => {
    const type = $.find('em').text().trim()
    return type.replace(/[\t\n ]+/g, ' ')
}
const getHanja = ($: Cheerio): string | null => {
    const hanja = $.find('p').first().text()
    const matchedHanja = hanja.match(/\((.+)\)/g)
    if (matchedHanja) {
        return matchedHanja[0].substr(1, matchedHanja[0].length - 2)
    }
    return null
}
const getTrans = ($: Cheerio): string => $.find('p.manyLang6').first().text().replace(/[\t\n ]+/g, ' ').trim()
const getKr = ($: Cheerio): string => $.find('p.sub_p1').first().text()
const getEn = ($: Cheerio): string => $.find('p.sub_p1.manyLang6').first().text()

export default function scrape(body: string): Result[] {
    debug('Parsing body')
    const $ = cheerio.load(body, {
        normalizeWhitespace: true
    })
    const results = $('ul.search_list').children().toArray()
    // No search results
    if($(results[0]).text().match('No result')) {
        debug('No results found')
        return []
    }
    // At least one hit
    return results.map(result => {
        const elem = $(result)
        const word = getWord(elem)
        const type = getType(elem)
        const hanja = getHanja(elem)
        const meanings = elem.find('ol').children().toArray().map(e => ({
            translation: getTrans($(e)),
            kr: getKr($(e)),
            en: getEn($(e))
        }))

        const res = { word, type, hanja, meanings }
        debug(`Scraped result ${JSON.stringify(res)}`)
        return res
    })
}
