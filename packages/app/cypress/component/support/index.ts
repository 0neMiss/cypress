import { registerMountFn } from '@packages/frontend-shared/cypress/support/common'
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import 'virtual:windi.css'
import '../../../src/main.scss'
import '@iconify/iconify'
<<<<<<< HEAD:packages/app/cypress/component/support/index.ts
import { createRouter } from '../../../src/router/router'
=======
import '@purge-icons/generated'
import { createRouter } from '../../src/router/router'
import { createI18n } from '../../src/locales/i18n';
>>>>>>> 0332774429 (wip):packages/app/cypress/support/index.ts

registerMountFn({ plugins: [() => createRouter(), () => createI18n() ] })
