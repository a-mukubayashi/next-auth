import { defineConfig } from "cypress";
const { GitHubSocialLogin, GoogleSocialLogin } =
  require("cypress-social-logins").plugins;

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        GitHubSocialLogin,
        GoogleSocialLogin,
      });
    },
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  },
  chromeWebSecurity: false,
});
