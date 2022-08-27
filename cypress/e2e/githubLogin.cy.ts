describe("Github login", () => {
  before(() => {
    cy.log("Visiting http://localhost:3000");
    cy.visit("/");
  });
  it("Login with GitHub", () => {
    cy.get('a[href*="/api/auth/signin"]').click();
    cy.url().should("include", "/api/auth/signin");
    cy.get("button[type='submit']").contains("Sign in with GitHub");

    cy.get("button[type='submit']").click();
    // NOTE: 2段階認証
    cy.login("github");
  });
});
