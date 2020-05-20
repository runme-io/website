# How to contribute #

We'd love to accept your patches and contributions to this project. There are
a just a few small guidelines you need to follow.
[First please read the Code of Conduct].

[First please read the Code of Conduct]: ./CODE_OF_CONDUCT.md

## Proposing a change ##

When wanting to propose or discuss a change feel free to open a new issue.
When wanting to discuss your proposal before opening a new issue feel free
to reach out to the maintainers on [Discord].

[Discord]: https://chat.jexia.com

## Reporting issues ##

Bugs, feature requests, and development-related questions should be directed to
our [GitHub issue tracker]. If reporting a bug, please try and provide as much
context as possible such as your operating system, browser version, and anything
else that might be relevant to the bug. For feature requests, please explain what
you're trying to do, and how the requested feature would help you do that.

[GitHub issue tracker]: https://github.com/runme-io/website/issues

## Coding Style Guidelines

The source code is written in vanilla JS with ES2019 features, using [Sapper],
which is the app framework from [Svelte]. We are following [StandardJS] with
some custom rules setup with [ESLint] and [Editorconfig] rules. We strongly
recommend to use a code editor with good support for these tools, like [VSCode],
[Sublime] or [Webstorm], so that it is easy to integrate new code into our code base.

[Sapper]: https://sapper.svelte.dev
[Svelte]: https://svelte.dev
[StandardJS]: https://standardjs.com
[ESLint]: https://eslint.org
[Editorconfig]: http://editorconfig.org
[VSCode]: https://code.visualstudio.com
[Webstorm]: https://www.jetbrains.com/webstorm
[Sublime]: https://www.sublimetext.com

## First Run

After cloning the project and installing the dependencies with `npm install`
(or `yarn`) you'll need to create your own `.env` file (see [.env.example]). For now,
you don't need to fill in `RUNME_API_HOST`, `RUNME_API_SECURE` and `DEPLOYMENT_HOST`
as these variables are intendend for production purposes.

In order for the application being able to make requests to create the button, a [Jexia]
project is required, with an [api key and secret] as well as three [datasets]:
`applications`, `builds` and `counters`. No setup is needed in these datasets.

After that you should be able start coding. You can run the local server for development
purposes with `npm run dev` then go to [localhost:3000](http://localhost:3000)
and start clicking around.

You can also double check if the local environment is fully working by building the
project with `npm run build`.

[.env.example]: ./.env.example
[Jexia]: https://www.jexia.com
[api key and secret]: https://docs.jexia.com/#creating-the-api-polices
[datasets]: https://docs.jexia.com/#create-dataset

## Main Development Commands

Command | Description
------------------ | -----------
`commit` | Commit convention helper (see related topic below)
`dev` | Runs local server with livereload
`lint` | Runs lint script. We discourage this for now as it will fail by default. As we implemented these rules later in development, there are still some files that require linting. We plan to fix them gradually, and we are making use of [lint-staged], so every time you commit, your piece of code that was changed will be automatically linted.
`test` | There are no implemented automated tests yet ☹️
`build` | Build the project locally
`start` | Start the project in production mode in port `80` (requires `build` first)

[lint-staged]: https://github.com/okonet/lint-staged

## Commit Message Format

This repository follows a strict **Commit Message Conventions**, which leads to more
readable messages that are easy to follow when looking through the project history.
Also, we plan to use git commit messages to generate the changelog and increment
semantic versioning, by using [Semantic Release]. Use `npm run commit` to commit your
changes with [Commitizen], a command line based wizard for easy commit message
formatting.

Each commit message consists of a **header**, a **body** and a **footer**. The header
has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Only the first line is mandatory, and any line of the commit message cannot be longer
than 100 characters! A linter will check your commit message in a git hook for each
commit and guide you to fix any error. Please have a look at the
[Conventional Commits] for detailed information about this convention.

[Commitizen]: https://github.com/commitizen/cz-cli
[Semantic Release](https://github.com/semantic-release/semantic-release
[Conventional Commits]: https://www.conventionalcommits.org/en/v1.0.0/#summary

## Submitting a Pull Request (PR)

  1. It's generally best to start by opening a new issue describing the bug or
     feature you're intending to fix. Even if you think it's relatively minor,
     it's helpful to know what people are working on. Mention in the initial
     issue that you are planning to work on that bug or feature so that it can
     be assigned to you.

  1. Follow the normal process of [forking] the project, and setup a new
     branch to work in. It's important that each group of changes be done in
     separate branches in order to ensure that a pull request only includes the
     commits related to that bug or feature.

  1. Create your patch, following [code style guidelines](#coding-style-guidelines).

  1. Commit your changes using a descriptive commit message that follows our [commit message format](#commit-message-format):

  1. Finally, push the commits to your fork and submit a [pull request].

That's it! Thank you for your contribution!

[forking]: https://help.github.com/articles/fork-a-repo
[pull request]: https://help.github.com/articles/creating-a-pull-request
