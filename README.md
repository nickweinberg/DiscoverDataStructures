**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Discover Data Structures](#discover-data-structures)
	- [What](#what)
	- [Why](#why)
	- [When](#when)
	- [Where](#where)
- [Development](#development)
	- [Tech Stack](#tech-stack)
	- [Contributing](#contributing)
		- [Local development](#local-development)

# Discover Data Structures

## What

A set of interactive animations to teach CS newbies about data structures. I will start with stacks, queues, and trees. I will then move on to prefix trees and hash tables.

## Why

I'm a visual learner, and I hope to help other visual learners with diagrams that are interactive and animated in such a way that makes data structures as clear as possible.

## When

TBD

## Where

I will probably try to host the end result on GitHub Pages or Heroku

# Development

## Tech Stack

- D3.js
  - data visualizations
  - animations
- Angular
  - single-page web app
- Compass
  - CSS pre-processing
- Foundation
  - CSS framework
  - grid-based responsive design

## Contributing

The usual: fork this repo, work on whatever branch you want, send me a pull request to *my master branch*.

### Local development

To run the web app locally, you can use a simple local server. Use the folllowing steps in the terminal:

1. Get into the correct directory: `cd path/to/the/repo/DiscoverDataStructures`
2. Start a local Python server: `python -m SimpleHTTPServer`
3. Open your favorite browser and point it to `http://localhost:8000`

If you wish to contribute to the CSS, make sure you have Compass installed and run `compass watch` in your local repo directory. In case you're wondering, I generally have a terminal window with 3 tabs open: one tab for issuing git commands, one tab for running the Python server, and one tab for running Compass. This could be simplified by using a task runner like Grunt, but I don't want to deal with that at the moment.
