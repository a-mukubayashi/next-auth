import { defineConfig } from "cypress";
const { GitHubSocialLogin } = require("cypress-social-logins").plugins;

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        GitHubSocialLogin,
      });
    },
  },
  chromeWebSecurity: false,
});
