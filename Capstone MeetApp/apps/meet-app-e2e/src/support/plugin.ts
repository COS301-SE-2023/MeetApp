import { lighthouse, prepareAudit } from '@cypress-audit/lighthouse';
import '@cypress/webpack-preprocessor';
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })

  on('task', {
    lighthouse: lighthouse(), // calling the function is important
  })
}