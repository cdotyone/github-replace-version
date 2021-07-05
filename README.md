# github-replace-version
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
        uses: "cdotyone/github-replace-version@main"
```

version:
* 1.0.0 - raw version
* v1.0.0 - raw tag formatted version


```
https://github.com/cdotyone/github-replace-version?ref=v0.0.0
```