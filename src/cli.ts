#!/usr/bin/env node
import * as commander from 'commander'
import * as chalk from 'chalk'
import search from './searcher'
import scrape, {Result} from './scraper'

const prettyPrint = (results: Result[]) => {
    console.log('\n')
    results.forEach(result => {
        console.log(chalk.green(result.word), result.hanja || '', chalk.gray(result.type))
        const hasMultipleMeanings = result.meanings.length > 1
        result.meanings.forEach((meaning, index) => {
            console.log('  ', chalk.underline(hasMultipleMeanings ? `${index + 1}. ${meaning.translation}` : meaning.translation))
            console.log('  ', chalk.italic(meaning.kr))
            console.log('  ', chalk.italic(meaning.en))
        })
        console.log('\n')
    })
}

commander
    .arguments('<search term>')
    .option('--json', 'Print output as JSON')
    .option('-r, --maxResults [number of results]', 'The maximum number of results to retrieve, default is 5', 5)
    .action(searchTerm => {
        search(searchTerm, commander.maxResults).then(scrape).then(results => {
            if (commander.json) {
                console.log(JSON.stringify(results))
            } else {
                prettyPrint(results)
            }
        })
    })
    .parse(process.argv)
