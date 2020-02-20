# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.11] - Feb 20, 2020

### Added

- `isAnnotationLevel` type guard for GitHub annotation levels.

### Changed

- `tokenize()` now handles newlines.

## [0.0.10] - Feb 20, 2020

### Fixed

- `getSha()` was returning a not-particularly-useful SHA when the GitHub Action
  was triggered by a `pull_request` event. In that case, the `ref` is something
  like `"refs/pull/10976/merge"` instead of the typical branch name, and the SHA
  is part of that merge ref rather than the PR's head SHA. `getSha()` now
  handles the pull_request event properly.

## [0.0.9] - Feb 20, 2020

### Added

- More verbose logging after successfully creating a check run. I'm having an
  issue in another repo where the request is successful but the annotations are
  not showing up.

## [0.0.8] - Feb 20, 2020

### Added

- Add `tokenize` function to split strings into tokens.

### Changed

- Check the response code when posting GitHub check runs, and return the response data.
