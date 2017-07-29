#!/usr/bin/env node
import * as commander from 'commander'
import * as chalk from 'chalk'
import search from './searcher'
import scrape, {Match} from './scraper'

const prettyPrint = (hits: Match[]) => {
    console.log('\n')
    hits.forEach(hit => {
        console.log(chalk.green(hit.word), hit.hanja || '', chalk.gray(hit.type))
        hit.meanings.forEach(meaning => {
            console.log('  ', chalk.underline(meaning.translation))
            console.log('  ', chalk.italic(meaning.kr))
            console.log('  ', chalk.italic(meaning.en))
        })
        console.log('\n')
    })
}

commander
    .arguments('<search term>')
    .option('--json', 'Print output as JSON')
    .action(searchTerm => {
        search(searchTerm).then(scrape).then(hits => {
            if (commander.json) {
                console.log(JSON.stringify(hits))
            } else {
                prettyPrint(hits)
            }
        })
    })
    .parse(process.argv)
