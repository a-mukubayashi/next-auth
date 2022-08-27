/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export type Provider = "github";

interface LoginTaskResult {
  cookies: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

Cypress.Commands.add("login", (provider: Provider) => {
  const credentials = {
    github: {
      username: Cypress.env("GITHUB_USER"),
      password: Cypress.env("GITHUB_PW"),
    },
  };

  const { username, password } = credentials[provider];
  const siteName = Cypress.env("SITE_NAME");
  const cookieName = Cypress.env("COOKIE_NAME");
  const loginUrl = `${siteName}/api/auth/signin`;

  const socialLoginOptions = {
    username,
    password,
    loginUrl,
    headless: false,
    logs: false,
    isPopup: false,
    popupDelay: 2000,
    loginSelector: `form[action="${siteName}/api/auth/signin/${provider}"] button[type=submit]`,
    postLoginSelector: "div#__next",
  };

  const taskNames = {
    github: "GitHubSocialLogin",
  };
  const taskName = taskNames[provider];

  return cy.task(taskName, socialLoginOptions).then((result) => {
    const { cookies } = result as LoginTaskResult;
    cy.clearCookie(cookieName);
    // cy.clearCookie('next-auth.callback-url')
    // cy.clearCookie('next-auth.csrf-token')

    const cookie = cookies.filter((c: any) => c.name === cookieName).pop();
    if (cookie) {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        secure: cookie.secure,
      });

      Cypress.Cookies.defaults({
        preserve: cookieName,
      });
    }
  });
});

// Cypress.Commands.add('logout', () => {
//   cy.visit('/api/auth/signout')
//   cy.get('form').submit()
// })

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with social login providers.
       * @example cy.login('google')
       */
      login: (provider: Provider) => Chainable<any>;
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {};
