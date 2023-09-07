# Contributing to the NBN Project Hub

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to the NBN Project Hub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Getting Started

### Fork the Repo

Start by forking the [NBN Project Hub repository](https://github.com/nbnuk/nbn-project-hub) to your own GitHub account.

### Initial Install

After forking the repo, clone it to your local machine and run `yarn install` to install all the required dependencies.

```bash
git clone https://github.com/<your-username>/nbn-project-hub.git
cd nbn-project-hub
yarn install
```

### Working on nbn-react-components

Navigate to the `nbn-react-components` directory.

```bash
cd packages/nbn-react-components
```

After making any changes to the code, run the following command to build the project:

```bash
yarn build
```

To see the components in Storybook, run:

```bash
yarn storybook
```

## Issuing a Pull Request

When you are ready to merge your changes and have a review, you should issue a pull request.

1. Push your changes to your forked repository on GitHub.
2. Create a pull request from your forked repository to the original `nbn-project-hub` repository.

## Additional Information

Please follow the [code of conduct](CODE_OF_CONDUCT.md) while contributing to this project.

Thank you for contributing!
