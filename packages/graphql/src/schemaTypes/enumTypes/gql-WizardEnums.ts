import { BUNDLERS, CODE_LANGUAGES, FRONTEND_FRAMEWORKS, WIZARD_STEPS } from '@packages/types'
import { enumType } from 'nexus'

export const SupportedBundlerEnum = enumType({
  name: 'SupportedBundlers',
  description: 'The bundlers that we can use with Cypress',
  members: BUNDLERS.map((t) => t.type),
})

export const WizardNavigateDirectionEnum = enumType({
  name: 'WizardNavigateDirection',
  members: ['forward', 'back'],
})

export const WizardConfigFileStatusEnum = enumType({
  name: 'WizardConfigFileStatusEnum',
  members: ['changes', 'valid', 'skipped', 'error'],
})

export const FrontendFrameworkEnum = enumType({
  name: 'FrontendFrameworkEnum',
  members: FRONTEND_FRAMEWORKS.map((t) => t.type),
})

export const FrontendFrameworkCategoryEnum = enumType({
  name: 'FrontendFrameworkCategoryEnum',
  members: FRONTEND_FRAMEWORKS.map((t) => t.category),
})

export const CodeLanguageEnum = enumType({
  name: 'CodeLanguageEnum',
  members: CODE_LANGUAGES.map((t) => t.type),
})

export const TestingTypeEnum = enumType({
  name: 'TestingTypeEnum',
  members: ['e2e', 'component'],
})

export const WizardStepEnum = enumType({
  name: 'WizardStep',
  members: WIZARD_STEPS.map((t) => t.type),
})
