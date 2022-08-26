describe("Header", () => {
  it("should header to the signin page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="/api/auth/signin"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/api/auth/signin");

    // The new page should contain an h1 with "About page"
    cy.get("button.button").contains("Sign in with GitHub");
  });
});
