A Github Action to create a Github Release automatically.

Add it to your workflows, or start using workflows by creating `.github/workflows/main.yml`
in your repository.

The following example runs on every push to master and auto increments the minor
version.

```yaml
name: CI

on:
  push:
    branches:
      - master

jobs:
  chargy-release-action:

    runs-on: ubuntu-latest

    steps:
    - name: Auto semver release action
      uses: char-gy/auto-semver-release-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

By default it will create releases on the master branch and auto-increment the minor
version.

Those defaults can be customised with a workflow like:

```yaml
name: CI

on:
  push:
    branches:
      - master

jobs:
  chargy-release-action:

    runs-on: ubuntu-latest

    steps:
    - name: Auto semver release action
      uses: char-gy/auto-semver-release-action@master
      with:
        release_target_comittish: 'develop'
        semver_increment_release_type: 'major'
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The `semver_increment_release_type` takes any release argument taken by `.inc(v, release)` in
https://github.com/npm/node-semver.
