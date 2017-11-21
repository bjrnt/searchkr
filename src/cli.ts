#!/usr/bin/env node
import * as commander from 'commander'
import * as chalk from 'chalk'
import seonbi, { Result } from './'

const prettyPrint = (results: Result[]) => {
  console.log('\n')
  results.forEach(result => {
    console.log(chalk.green(result.word), result.hanja || '', chalk.gray(result.type))
    const hasMultipleMeanings = result.meanings.length > 1
    result.meanings.forEach((meaning, index) => {
      console.log(
        '  ',
        chalk.underline(
          hasMultipleMeanings ? `${index + 1}. ${meaning.translation}` : meaning.translation
        )
      )
      console.log('  ', chalk.italic(meaning.kr))
      console.log('  ', chalk.italic(meaning.en))
    })
    console.log('\n')
  })
}

commander
  .arguments('<search term>')
  .option('--json', 'Print output as JSON')
  .option(
    '-m, --maximumMatches [number of matches]',
    'The maximum number of results to retrieve, default is 5',
    5
  )
  .option('--exact', 'Only return results that match the search term exactly')
  .action(query => {
    seonbi(query, {
      maximumMatches: commander.maximumMatches,
      matchExactly: commander.exact,
    }).then(results => {
      if (commander.json) {
        console.log(JSON.stringify(results))
      } else {
        prettyPrint(results)
      }
    })
  })
  .parse(process.argv)
