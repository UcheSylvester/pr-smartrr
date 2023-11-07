# Pr Smartrr

<div style="display:flex; gap:20px; flex-wrap:wrap">
  <a href="https://github.com/marketplace/actions/pr-smartrr" style="text-decoration:none">
    <img src="https://img.shields.io/github/release/UcheSylvester/pr-smartrr.svg"  />
  </a>

  <a href="https://github.com/marketplace/actions/pr-smartrr" style="text-decoration:none">
    <img src="https://img.shields.io/badge/marketplace-pr--smartrr-green?logo=github" />
  </a>

  <a href="https://github.com/marketplace/actions/pr-smartrr" style="text-decoration:none">
    <img src="https://img.shields.io/github/languages/top/UcheSylvester/pr-smartrr.svg"  />
  </a>
</div>

---

This GitHub Action automatically requests reviews on pull requests based on changed files.

It does this by checking the teammates with commits on those changed files and adding them as reviewers to pull requests. This means you do not need to manually provide a list of reviewers to this action.

## Inputs

#### `github-token`

**Required** The GitHub token to use for authentication. Typically, this should be set to `${{ secrets.GITHUB_TOKEN }}`.

#### `max-reviewers`

**Optional** The maximum number of reviewers to be added to the pull request. _Defaults to 2_.

## Usage

1. **Create a Workflow YAML File**: In your repository, create or edit a workflow YAML file (e.g., `.github/workflows/main.yml`).

2. **Define the Workflow**:

```yaml
name: main

on:
  pull_request:
    types: [opened]

defaults:
  run:
    shell: 'bash'

jobs:
  request-reviews:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          # Note: this is required for the action to work
          fetch-depth: 0

      - name: Auto PR review requests
        uses: UcheSylvester/pr-smartrr@v0.1.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          max-reviewers: 2
```

## Run Locally

To run this action locally, you need to have [Node.js](https://nodejs.org/en/) installed on your machine.

1. Clone this repository:

```bash
git clone
```

2. Install dependencies:

```bash
yarn
```

3. Build the typescript:

```bash
yarn build
```

4. Run the tests:

```bash
yarn test
```

5. Run the local action with [nektos/act](https://github.com/nektos/act):

```bash
act -j pr-labelr -s GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}
```

## Contributing

We welcome contributions from the community to make **Pr Smartrr** even better. Whether it's bug fixes, new features, or improvements to documentation, your input is valuable. To contribute, follow these steps:

1. Create an issue describing the feature/bug you want to work on.
2. Fork the repository on GitHub.
3. Create a new branch for your changes.
4. Make your changes and commit them with descriptive messages.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Get In Touch

[Email](mailto:okorocode@gmail.com) | [Follow on Twitter](https://twitter.com/ucylvester) | [Connect on LinkedIn](https://www.linkedin.com/in/uchenna-okoro/) | [Report an Issue](https://github.com/UcheSylvester/pr-smartrr/issues)
