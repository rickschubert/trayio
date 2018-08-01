# Assumptions
My setup makes it possible to define settings via environment variables, see the
table below. Although I implemented functionality to run tray.io in mobile
viewport, I did not adjust my tests for this possibility as tray.io seems to not
work (yet) with mobile viewports.

## On style
I usually try to break out code into constant files, meaning that selectors etc.
can easily be changed even by someone who never ever looked at the code before.
Such an example is `profiles.js` in `/support/constants`.

I tried to create a test suite which is both easy to understand as well as
verbose in its errors. Such an example are my waitFor functions inside
`waitForWrappers.js`: when a test fails, the error description should be verbose
and helpful so that developers and testers immediately know what went wrong.

## On cucumber
Given that tray.io allows for a very modular workflow where steps can be
arranged and positioned inside a pipeline at will, I chose cucumber because it
does the same for testing: Cucumber allows for "dry coding" which means that if
there are enough step defintions predefined, one could create a new scenario by
recycling existing steps without having to rewrite existing functionality.
Furthermore, I greatly appreciate the clearness it brings as it also allows
non-technical team members to see what the tests are doing.

## On selectors
As per feedback of Alberto, I did not use any class names. This was a challenge
as there are not many elements with descriptive `id` identifiers on the page.
Thus, I had to select some page elements by their text content. This approach is
not ideal: text queries in the DOM are slow and prone to error: I could not run
these tests on a localised version of tray.io such as Italian or French for
example. Furthermore, this caused me to be quite verbose about some elements,
such as in this one:
``//header[.="${workflowName}"]/parent::a/following-sibling::div`` - In this
case, the tests do actually know a lot more about the structure of the DOM than
they should. As a new starter, I would probably add some `id`s to those
components which are otherwise very difficult to select.

## Instructions
- `git clone` this repository
- `npm install`
- `npm start`

## Running tests with settings
- `npm run mobile` or `BREAKPOINT=mobile npm start` for mobile
- `npm run desktop` or `BREAKPOINT=desktop npm start` for desktop

### On Windows: Manual compiling of node-gyp necessary
- `npm install -g node-gyp`
- `npm install --global --production windows-build-tools`
- Note: On Windows, environment variables should rather be placed into an `.env`
  file to make it easier.

## Settings
All settings are being passed via environment variables: either by putting it in
front of the start script (i.e. `HEADLESS_CHROME=true npm run desktop`) or by
placing them in an `.env` file in the root of the project.

| Setting        | Explanation  | Default  |
| ------------- |:-------------:| -----:|
| `BASEURL=http://www.google.com`| Baseurl to use. | https://app.tray.io/ |
| `BREAKPOINT=desktop`           | Test either `mobile` or `desktop` site. | desktop |
| `HEADLESS_CHROME=true`        | Disables headless chrome. Running in headless mode is faster than regular mode. | false |
| `BROWSER=browsername`          | Choose the browser you want to run the tests in. Must be one of the [selenium supported names](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities). | chrome |
