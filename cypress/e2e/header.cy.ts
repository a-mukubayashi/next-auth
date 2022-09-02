describe("Header", () => {
  it("should header to the signin page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "signin" and click it
    cy.get('a[href*="/api/auth/signin"]').click();

    // The new url should include "signin"
    cy.url().should("include", "/api/auth/signin");

    // The new page should contain an h1 with "Sign in with GitHub"
    cy.get("button.button").contains("Sign in with GitHub");
  });
});
export {};
