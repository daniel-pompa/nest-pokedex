# Pokedex API

A **scalable RESTful API** built with **NestJS** and **TypeScript**, designed as a learning-oriented project focused on **clean architecture**, **best practices**, and **real-world backend patterns**.

The goal of this project is to deepen knowledge in backend development with Node.js, emphasizing modular design, maintainability, and scalability.

This API uses **MongoDB** as a database and can be run locally using **Docker**.

## Table of Contents

* [Requirements](#requirements)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Available Scripts](#available-scripts)
* [License](#license)
* [Author](#author)

## Requirements

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Docker Desktop](https://img.shields.io/badge/Docker%20Desktop-2496ED.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/products/docker-desktop/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the **LTS version**. npm is installed automatically.
> Docker Desktop includes Docker Engine and Docker Compose.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
docker --version
docker compose version
```

## Tech Stack

This project utilizes the following technologies:

<p>
  <a href="#"><img src="https://skillicons.dev/icons?i=nestjs" width="40" height="40" alt="NestJS" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=ts" width="40" height="40" alt="TypeScript" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=docker" width="40" height="40" alt="Docker" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=mongodb" width="40" height="40" alt="MongoDB" /></a>
</p>

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/nest-pokedex.git
```

2. **Navigate to the project directory:**

```bash
cd nest-pokedex
```

3. **Install dependencies:**

```bash
npm install
```

4. **Create environment variables**

Copy the example file and adjust values if needed:

```bash
cp .env.example .env
```

> [!NOTE]
> The default MongoDB connection uses a local database named `database`.
> You can change the database name in the `.env` file.

5. **Install Nest CLI:**

```bash
npm install -g @nestjs/cli
```

6. **Start local infrastructure using Docker:**

```bash
docker compose up -d
```

7. **Run the development server:**

```bash
npm run start:dev
```

> [!NOTE]
> By default, the API will be available at <http://localhost:3000>

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run start:dev` | Starts the application in development mode with hot-reload. |
| `npm run build` | Compiles the application into the `dist` directory. |
| `npm run start:prod` | Runs the compiled application in production mode. |
| `npm run lint` | Runs ESLint to detect and fix code style issues. |

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge to see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

[⬆️ Back to Top](#table-of-contents)
