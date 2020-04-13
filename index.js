const inquirer = require('inquirer')
const fs = require('fs')
const axios = require('axios')

inquirer
    .prompt([{
        type: 'input',
        message: 'Please enter your github username',
        name: 'username'
    },
    {
      type: 'input',
      message: 'Please enter the title of your project',
      name: 'title'
    },
    {
      type: 'input',
      message: 'Please enter a brief description of your project',
      name: 'description'
    },
    {
      type: 'list',
      name: 'license',
      message: 'What licenses would you like in your READ.me?',
      choices: ['MIT', 'Unilicense', 'Mozilla 2.0', 'Apache 2.0']
    }
    ]).then(function (answers) {

    console.log(answers)

      axios.get(`https://api.github.com/users/${answers.name}`)
      .then(githubResponse => {
       // console.log('My Data', githubResponse.data)

        const content = `# ${answers.title}

## Description

${answers.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#questions)
* [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

${answers.license}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

${answers.questions}`

    fs.writeFile('README.md', content, err => {
      if (err) {
        console.error(err)
        return
      }
    })
      })
      .catch(err => {
        console.log('User not found')
      })

        
    })