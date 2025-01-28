Project 5 at Cerebrum Hub was named: “Automating testing of Jira Clone Front-End with Cypress”. 

Existing functionalities: Kanban board with the overview of all tasks; Open, see and edit task details; Add/remove comments; Add/remove tasks; Track spent time on specific tasks; Manage project general settings; Search.

The goal of the project was to cover more functionalities by the UI tests using the Cypress knowledge obtained in project 4. 

Functionalities to cover: Creating tasks; Deleting tasks; Creating, editing, deleting task comments; Time tracking functionality. Last but not least, solve JavaScript tasks.

In addition, I had to modify deletion test cases to POM format and we used random data plugin (faker) for creating a task: 

const randomTitle = faker.lorem.word();

const randomDescription = faker.lorem.sentence();

To make less repetition in writing code and just to make it more readable, constants were used.

I was victorious, leading to 100% result in project 5.



# Jira Clone tests

## Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies.

```sh
npm i
```

## Run tests

Run all tests available via first command.
You can specify other browser to run tests as well.

```sh
npx cypress run
npx cypress run --browser=chrome
```

## Observe test run results in CI
[![N|BuildStatus](https://iili.io/QOkZWQ.png)](https://freeimage.host/i/QOkZWQ)

