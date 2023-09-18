# To-Do List

This is a Vue.js Single Page Application (SPA) for managing to-do list in the Star Wars universe. It allows you to add, delete, and mark items as done. Additionally, it provides autocomplete suggestions for Star Wars characters and their home planets using data from swapi.dev.

## Table of Contents

- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Local Development](#local-development)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Deployment

![Vercel](https://vercelbadge.vercel.app/api/zohresalimi/vue-todo-list)

## Demo

[See demo here](https://vue-todo-list-ghus.vercel.app/)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/zohresalimi/vue-todo-list.git

   ```

2. Change to the project directory:

   ```sh
   cd vue-todo-list
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

## Features

- The to-do list is saved in LocalStorage, ensuring that the list is persisted even after a page refresh.
- You can add items to the list using the input field and the "Add" button.
- Autocomplete suggestions for Star Wars characters and their home planets are available when typing "@" followed by at least one character.
- Items can be deleted using the trashcan icon button.
- Items can be marked as done by checking a checkbox.

## Usage

#### Start the Application:

###### To launch the development server and run the application locally, use the following command:

    npm run dev

Open your browser and navigate to http://localhost:5173 to access the application.

#### Local Development

##### For local development, you can use the following npm scripts:

    npm run dev ---> Start the development server.
    npm run test:unit ---> Run unit tests.

### Technologies Used

#### This project employs a stack of modern technologies, including:

- Vue.js 3
- Vite (Build tool)
- SWAPI (Star Wars API)
- TypeScript
- ESLint (Code linting)
- Other dependencies (listed in package.json)
