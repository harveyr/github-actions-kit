# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
