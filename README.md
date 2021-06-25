# github-set-readme-version
Sets the README.md version.

## Example

```yaml
name: Generate
jobs:
  generate:
    steps:
      - uses: actions/checkout@v1
      - name: 'Set README.md tag'
        id: semver
        uses: "cdotyone/github-next-version@main"
        with:
          version: "NEXT"  // DEFAULT
```

version: 
* NEXT - version imported from VERSION file
* PACKAGE -  version imported from package.json
* 1.0.0 - raw version
* v1.0.0 - raw tag formatted version