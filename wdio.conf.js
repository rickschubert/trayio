require('babel-polyfill')
require('babel-register')

require('dotenv').config()
const fse = require('fs-extra')
const logger = require('./support/logger')
const {setupViewportSize} = require('./support/lib/shared')

const REPORT_PATH = './reports/'
const FEATURE_PATH = process.env.RETRY_ACTIVE
    ? './retry_mechanism/features'
    : './features'
const chromeOptions = {args: ['--disable-infobars', '--no-sandbox']}

const breakpoint = process.env.BREAKPOINT || 'desktop'
logger.info(`[SETUP] - BREAKPOINT: <${breakpoint}>`)

const cucumberFeature = `${FEATURE_PATH}/**/*.feature`

const browserName = process.env.BROWSER || 'chrome'
logger.info(`[SETUP] - BROWSER: <${browserName}>`)

const headlessChrome = process.env.HEADLESS_CHROME === 'true'
if (headlessChrome) chromeOptions.args.push('--headless')
logger.info(`[SETUP] - HEADLESS_CHROME: <${headlessChrome}>`)

const maxInstances = 3
const logLevel = 'error'
const waitforTimeout = 20000

const baseUrl = process.env.BASEURL || 'https://app.tray.io/'
logger.info(`[SETUP] - BASEURL: <${baseUrl}>`)

logger.info('-----------------------------')

exports.config = {
    // ==================
    // Specify Test Files
    // ==================
    specs: [cucumberFeature],

    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    maxInstances,

    capabilities: [
        {
            browserName,
            chromeOptions,
        },
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel,
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: `./screenshots`,
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone'],

    seleniumInstallArgs: {version: '3.4.0'},
    seleniumArgs: {version: '3.4.0'},

    deprecationWarnings: false,
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/testrunner/reporters.html

    reporters: ['cucumber', 'junit-morganchristiansson'],
    reporterOptions: {
        outputDir: REPORT_PATH,
        cucumberJsonReporter: {
            verbose: true,
            deviceName: breakpoint,
        },
    },
    cucumberOpts: {
        // Create array of step definitions for cucumber to load in
        require: fse
            .readdirSync('./step_definitions')
            .map((filename) => `./step_definitions/${filename}`),
        backtrace: true, // <boolean> show full backtrace for errors
        compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tagExpression: '',
        timeout: 220000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: true, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    // CUCUMBER HOOKS
    // ===============
    beforeFeature: () => {
        setupViewportSize(breakpoint)
    },

    breakpoint,
    headlessChrome,
}
