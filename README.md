# warhammercardPages

## Setting up and running the GitHub Actions workflow

To set up and run the GitHub Actions workflow for deploying the contents of the static site including any built npm artifacts, follow these steps:

1. **Ensure you have a GitHub repository**: Make sure you have a GitHub repository where you want to set up the workflow.

2. **Create a `.github/workflows` directory**: In your repository, create a directory named `.github/workflows` if it doesn't already exist.

3. **Create a workflow file**: Inside the `.github/workflows` directory, create a file named `pages_deploy.yaml`.

4. **Add the workflow configuration**: Add the following configuration to the `pages_deploy.yaml` file:

    ```yaml
    name: Build and Deploy
    on:
      push:
        branches:
          - main

    jobs:
      build:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout code
            uses: actions/checkout@v2

          - name: Install dependencies
            run: npm install

          - name: Build
            run: npm run build

          - name: Deploy to gh-pages
            uses: actions/deploy-pages@v4
            with:
              branch: gh-pages
              folder: build
    ```

5. **Commit and push the changes**: Commit and push the changes to your repository. The workflow will automatically run whenever there is a push to the `main` branch.

## Details about the `actions/deploy-pages@v4` action

The `actions/deploy-pages@v4` action is used to deploy the contents of a specified folder to a specified branch in your GitHub repository. In this case, it is used to deploy the contents of the `build` folder to the `gh-pages` branch.

### Parameters

- `branch`: The branch to which the content should be deployed. In this example, it is set to `gh-pages`.
- `folder`: The folder containing the built artifacts to be deployed. In this example, it is set to `build`.

This setup ensures that whenever there is a push to the `main` branch, the workflow will build the project and deploy the built artifacts to GitHub Pages.
