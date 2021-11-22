/* eslint-disable @cypress/dev/skip-comment,mocha/no-exclusive-tests */

describe('per-test config', () => {
  const testState = {
    ranFirefox: false,
    ranChrome: false,
    ranChromium: false,
    ranElectron: false,
  }

  after(function () {
    if (hasOnly(this.currentTest)) return

    if (Cypress.browser.family === 'firefox') {
      return expect(testState).deep.eq({
        ranChrome: false,
        ranChromium: false,
        ranFirefox: true,
        ranElectron: false,
      })
    }

    if (Cypress.browser.name === 'chrome') {
      return expect(testState).deep.eq({
        ranChrome: true,
        ranChromium: false,
        ranFirefox: false,
        ranElectron: false,
      })
    }

    if (Cypress.browser.name === 'chromium') {
      return expect(testState).deep.eq({
        ranChrome: false,
        ranChromium: true,
        ranFirefox: false,
        ranElectron: false,
      })
    }

    if (Cypress.browser.name === 'electron') {
      return expect(testState).deep.eq({
        ranChrome: false,
        ranChromium: false,
        ranFirefox: false,
        ranElectron: true,
      })
    }

    throw new Error('should have made assertion')
  })

  it('set various config values', {
    defaultCommandTimeout: 200,
    env: {
      FOO_VALUE: 'foo',
    },
  }, () => {
    cy.visit('/fixtures/generic.html')
    expect(Cypress.config().defaultCommandTimeout).eq(200)
    expect(Cypress.config('defaultCommandTimeout')).eq(200)
    expect(Cypress.env('FOO_VALUE')).eq('foo')
  })

  it('does not leak various config values', {
  }, () => {
    expect(Cypress.config().defaultCommandTimeout).not.eq(200)
    expect(Cypress.config('defaultCommandTimeout')).not.eq(200)
    expect(Cypress.env('FOO_VALUE')).not.eq('foo')
  })

  it('can set viewport', {
    viewportWidth: 400,
    viewportHeight: 200,
  }, () => {
    expect(Cypress.config().viewportHeight).eq(200)
    expect(Cypress.config().viewportWidth).eq(400)
  })

  it('can specify only run in chrome', {
    browser: 'chrome',
  }, () => {
    testState.ranChrome = true
    expect(Cypress.browser.name).eq('chrome')
  })

  it('can specify only run in chromium', {
    browser: 'chromium',
  }, () => {
    testState.ranChromium = true
    expect(Cypress.browser.family).eq('chromium')
  })

  it('can specify only run in firefox', {
    browser: 'firefox',
  }, () => {
    testState.ranFirefox = true
    expect(Cypress.browser.name).eq('firefox')
  })

  it('can specify only run in electron', {
    browser: 'electron',
  }, () => {
    testState.ranElectron = true
    expect(Cypress.browser.name).eq('electron')
  })

  describe('mutating global config via Cypress.config and Cypress.env', () => {
    it('1/2 global config and env', {
      defaultCommandTimeout: 1234,
      env: {
        FOO: '0',
      },
    }, () => {
      Cypress.config('responseTimeout', 1111)
      expect(Cypress.config('responseTimeout')).eq(1111)
      expect(Cypress.config('defaultCommandTimeout')).eq(1234)

      Cypress.env('BAR', '1')
      expect(Cypress.env('FOO')).eq('0')
      expect(Cypress.env('BAR')).eq('1')
    })

    it('2/2 global config and env', () => {
      expect(Cypress.config('responseTimeout')).eq(1111)
      expect(Cypress.config('defaultCommandTimeout')).eq(4000)

      expect(Cypress.env('FOO')).eq(undefined)
      expect(Cypress.env('BAR')).eq('1')
    })
  })

  describe('in beforeEach', () => {
    it('set various config values', {
      defaultCommandTimeout: 200,
      env: {
        FOO_VALUE: 'foo',
      },
    }, () => {
      expect(Cypress.config().defaultCommandTimeout).eq(200)
      expect(Cypress.config('defaultCommandTimeout')).eq(200)
      expect(Cypress.env('FOO_VALUE')).eq('foo')
    })

    beforeEach(() => {
      expect(Cypress.config().defaultCommandTimeout).eq(200)
      expect(Cypress.config('defaultCommandTimeout')).eq(200)
      expect(Cypress.env('FOO_VALUE')).eq('foo')
    })
  })

  describe('in afterEach', () => {
    it('set various config values', {
      defaultCommandTimeout: 200,
      env: {
        FOO_VALUE: 'foo',
      },
    }, () => {
      expect(Cypress.config().defaultCommandTimeout).eq(200)
      expect(Cypress.config('defaultCommandTimeout')).eq(200)
      expect(Cypress.env('FOO_VALUE')).eq('foo')
    })

    afterEach(() => {
      expect(Cypress.config().defaultCommandTimeout).eq(200)
      expect(Cypress.config('defaultCommandTimeout')).eq(200)
      expect(Cypress.env('FOO_VALUE')).eq('foo')
    })
  })

  describe('in suite', () => {
    describe('config in suite', {
      defaultCommandTimeout: 200,
    }, () => {
      it('test', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })

      it('test', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })

      it('test', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })
    })
  })

  describe('in suite (context)', () => {
    context('config in suite', {
      defaultCommandTimeout: 200,
    }, () => {
      it('test', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })

      it('test', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })

      it('test', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })
    })
  })

  describe('in nested suite', () => {
    describe('config in suite', {
      defaultCommandTimeout: 200,
    }, () => {
      it('has config.defaultCommandTimeout', () => {
        expect(Cypress.config().defaultCommandTimeout).eq(200)
      })

      describe('inner suite', {
        pageLoadTimeout: 200,
      }, () => {
        it('has config.bar', () => {
          expect(Cypress.config().pageLoadTimeout).eq(200)
        })

        it('has config.defaultCommandTimeout and config.pageLoadTimeout', () => {
          expect(Cypress.config().defaultCommandTimeout).eq(200)
          expect(Cypress.config().pageLoadTimeout).eq(200)
        })
      })
    })
  })

  describe('in double nested suite', () => {
    describe('config in suite', {
      defaultCommandTimeout: 200,
    }, () => {
      describe('inner suite', { pageLoadTimeout: 200 }, () => {
        it('has config.pageLoadTimeout', () => {
          expect(Cypress.config().defaultCommandTimeout).eq(200)
          expect(Cypress.config().pageLoadTimeout).eq(200)
        })
      })
    })
  })

  describe('in multiple nested suites', {
    defaultCommandTimeout: 100,
  }, () => {
    describe('config in suite', {
      defaultCommandTimeout: 200,
    }, () => {
      describe('inner suite 1', { pageLoadTimeout: 200 }, () => {
        it('has config.pageLoadTimeout', () => {
          expect(Cypress.config().defaultCommandTimeout).eq(200)
          expect(Cypress.config().pageLoadTimeout).eq(200)
        })
      })

      describe('inner suite 2', { requestTimeout: 200 }, () => {
        it('has config.requestTimeout', () => {
          expect(Cypress.config().pageLoadTimeout).not.eq(200)
          expect(Cypress.config().requestTimeout).eq(200)
          expect(Cypress.config().defaultCommandTimeout).eq(200)
        })
      })

      describe('inner suite 3', () => {
        it('has only config.defaultCommandTimeout', () => {
          expect(Cypress.config().pageLoadTimeout).not.eq(200)
          expect(Cypress.config().requestTimeout).not.eq(200)
          expect(Cypress.config().defaultCommandTimeout).eq(200)
        })
      })
    })
  })

  describe('in multiple nested suites', () => {
    describe('config in suite', {
      defaultCommandTimeout: 200,
    }, () => {
      describe('inner suite 1', { pageLoadTimeout: 200 }, () => {
        it('has config.pageLoadTimeout', () => {
          expect(Cypress.config().pageLoadTimeout).eq(200)
          expect(Cypress.config().defaultCommandTimeout).eq(200)
        })
      })

      describe('inner suite 2', { requestTimeout: 200 }, () => {
        it('has config.requestTimeout', () => {
          expect(Cypress.config().pageLoadTimeout).not.eq(200)
          expect(Cypress.config().requestTimeout).eq(200)
          expect(Cypress.config().defaultCommandTimeout).eq(200)
        })
      })
    })
  })

  describe('empty config', {}, () => {
    it('empty config in test', {}, () => {
      expect(true).ok
    })
  })

  specify('works with it & specify', { defaultCommandTimeout: 100 }, () => {
    expect(Cypress.config().defaultCommandTimeout).eq(100)
  })

  describe('config changes after run', () => {
    let defaultCommandTimeout

    it('1/2', {
      defaultCommandTimeout: 1234,
    }, () => {
      cy.on('test:after:run', () => {
        defaultCommandTimeout = Cypress.config('defaultCommandTimeout')
      })
    })

    it('2/2', () => {
      expect(defaultCommandTimeout).eq(1234)
    })
  })

  describe('xit, xdescribe', () => {
    xit('should be skipped', {}, () => {})
    xspecify('should be skipped', {}, () => {})
    xdescribe('suite should be skipped', {}, () => {
      it('skipped')
    })

    xcontext('suite should be skipped', {}, () => {
      it('skipped')
    })

    describe('non-skipped test', () => {
      it('foo', () => {})
    })

    after(function () {
      expect(this.currentTest?.parent?.parent?.tests).length(2)
      expect(this.currentTest?.parent?.parent?.tests[0]).property('state', 'pending')
      expect(this.currentTest?.parent?.parent?.tests[1]).property('state', 'pending')
      expect(this.currentTest?.parent?.parent?.suites[0].tests[0]).property('state', 'pending')
      expect(this.currentTest?.parent?.parent?.suites[1].tests[0]).property('state', 'pending')
    })
  })
})

describe('viewport', () => {
  // https://github.com/cypress-io/cypress/issues/7631
  it('can set viewport in testConfigOverrides', { viewportWidth: 200, viewportHeight: 100 }, () => {
    cy.visit('/fixtures/generic.html')
    cy.window().then((win) => {
      expect(win.innerWidth).eq(200)
      expect(win.innerHeight).eq(100)
    })
  })

  it('viewport does not leak between tests', () => {
    cy.visit('/fixtures/generic.html')
    cy.window().then((win) => {
      expect(win.innerWidth).eq(1000)
      expect(win.innerHeight).eq(660)
    })
  })
})

describe('testConfigOverrides baseUrl @slow', () => {
  it('visit 1', { baseUrl: 'http://localhost:3501' }, () => {
    cy.visit('/fixtures/generic.html')
    cy.url().should('eq', 'http://localhost:3501/fixtures/generic.html')
  })

  it('visit 2', { baseUrl: 'http://localhost:3500' }, () => {
    cy.visit('/fixtures/generic.html')
    cy.url().should('eq', 'http://localhost:3500/fixtures/generic.html')
  })
})

describe.only('cannot set read-only properties', () => {
  it.only('throws if mutating read-only config with test configuration', { chromeWebSecurity: false }, () => {
    try {
      it('fails to set chromeWebSecurity', { chromeWebSecurity: false }, () => {
        return
      })
    } catch (err) {
      expect(err.message).to.include('The configuration option `chromeWebSecurity` cannot be mutated because it is a read-only property.')
    }
  })

  it('throws if mutating read-only config with Cypress.config()', (done) => {
    cy.on('fail', (err) => {
      expect(err.message).to.include('The configuration option `chromeWebSecurity` cannot be mutated because it is a read-only property.')
      done()
    })

    Cypress.config('chromeWebSecurity', false)
  })
})

function hasOnly (test) {
  let curSuite = test.parent
  let hasOnly = false

  while (curSuite) {
    if (curSuite._onlySuites.length || curSuite._onlyTests.length) {
      hasOnly = true
    }

    curSuite = curSuite.parent
  }

  return hasOnly
}
