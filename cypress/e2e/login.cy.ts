describe("Github login", () => {
  beforeEach(() => {
    cy.log("Visiting http://localhost:3000");
    cy.visit("/");
  });
  it("Login with GitHub", () => {
    cy.get('a[href*="/api/auth/signin"]').click();
    cy.url().should("include", "/api/auth/signin");

    const githubForm = cy.get(
      "form[action='http://localhost:3000/api/auth/signin/github']"
    );
    githubForm.children("button").contains("Sign in with GitHub");

    // NOTE: 2段階認証
    // cy.get("button[type='submit']").click();
    // cy.login("github");
  });
});

describe("Google login", function () {
  beforeEach(function () {
    // cy.login("google");
  });

  it("Login with Google", () => {
    cy.get('a[href*="/api/auth/signin"]').click();
    cy.url().should("include", "/api/auth/signin");

    const googleForm = cy.get(
      "form[action='http://localhost:3000/api/auth/signin/google']"
    );
    const googleButton = googleForm.children("button");
    googleButton.contains("Sign in with Google");

    // googleButton.click();
  });
});
export {};
