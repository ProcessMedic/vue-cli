module.exports = cli => {
  const {
    lintOn,
    eslintConfig
  } = require('@vue/cli-shared-utils/lib/pluginPrompts/eslint')

  cli.injectFeature({
    name: 'Linter / Formatter',
    value: 'linter',
    short: 'Linter',
    description: 'Check and enforce code quality with ESLint or Prettier',
    link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint',
    plugins: ['eslint'],
    checked: true
  })

  cli.injectPrompt({
    ...eslintConfig,
    name: 'eslintConfig',
    when: answers => answers.features.includes('linter'),
    choices: answers => [
      ...(
        answers.features.includes('ts')
          ? [{
            name: `TSLint`,
            value: 'tslint',
            short: 'TSLint'
          }]
          : []
      ),
      ...eslintConfig.choices
    ]
  })

  cli.injectPrompt({
    ...lintOn,
    when: answers => answers.features.includes('linter')
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('linter') && answers.eslintConfig !== 'tslint') {
      options.plugins['@vue/cli-plugin-eslint'] = {
        config: answers.eslintConfig,
        lintOn: answers.lintOn
      }
    }
  })
}