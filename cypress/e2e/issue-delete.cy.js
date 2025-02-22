const Title = "This is an issue of type: Task.";
describe("Deleting issue", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(Title).click();
      });
  });

  it("I delete an issue and validate it successfully", () => {
    const expectedIssuesAfterDeletingOne = 3;
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains("Delete issue").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(Title).should("not.exist");
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedIssuesAfterDeletingOne
      );
    });
  });

  it("I cancel deleting the issue and validate it successfully", () => {
    const expectedIssuesAfterCancelling = 4;
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Are you sure you want to delete this issue?").should(
        "be.visible"
      );
      cy.contains("Once you delete, it's gone for good").should("be.visible");
      cy.contains("Cancel").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="modal:issue-details"]').should("not.exist");
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(Title).should("be.visible");
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedIssuesAfterCancelling
      );
    });
  });
});
