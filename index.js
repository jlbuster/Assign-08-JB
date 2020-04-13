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
      type: 'input',
      message: 'What commands should you run to install dependancies',
      name: 'installation'
    },
    {
      type: 'input',
      message: 'How would you describe how to use this program?',
      name: 'usage'
    },
    {
      type: 'list',
      name: 'license',
      message: 'What licenses would you like in your READ.me?',
      choices: ['MIT', 'Unilicense', 'Mozilla 2.0', 'Apache 2.0']
    },
    {
      type: 'input',
      message: 'What would you like to say to any possible contributors?',
      name: 'contributing'
    },
    {
      type: 'input',
      message: 'What command(s) do you need to run, if any, in order to test the program?',
      name: 'tests'
    },
    {
      type: 'input',
      message: 'What does the user need to do if they have any questions?',
      name: 'questions'
    }
    ]).then(function (answers) {

    console.log(answers)

      axios.get(`https://api.github.com/users/${answers.username}`)
      .then(githubResponse => {
        //console.log('My Data', githubResponse.data)

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

\`\`\`
${answers.installation}
\`\`\`

## Usage

${answers.usage}

## License

This project uses the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

${answers.questions}

If you have any other questions please email me at ${githubResponse.data.email}.

![My image](${githubResponse.data.avatar_url})`

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