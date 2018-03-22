# compare-url-hierarchy

[![Build Status](https://travis-ci.org/hbsnow/compare-url-hierarchy.svg?branch=master)](https://travis-ci.org/hbsnow/compare-url-hierarchy)

## Installation

```
npm i compare-url-hierarchy
```

## Usage

```
import compare from 'compare-url-hierarchy'
compare('/', '/foo') // 0
compare('/foo/bar', '/') // -1
compare('/', 'https://example.org/foo/bar/baz') // 2
```

## LICENSE

MIT
