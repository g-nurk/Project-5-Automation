import IssueModal from "../../pages/IssueModal";
const issueTitle = "This is an issue of type: Task.";

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.contains(issueTitle).click();
      });
  });

  /*I added in the IssueModal.js:
    validateNumberOfIssuesInBacklog(expectedIssuesAfterDeletingOne) {
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.get('[data-testid="list-issue"]').should(
        "have.length",
        expectedIssuesAfterDeletingOne
      );
    }); */

  it("Should delete issue successfully", () => {
    const expectedIssuesAfterDeletingOne = 3;
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
    IssueModal.validateNumberOfIssuesInBacklog(expectedIssuesAfterDeletingOne);
  });

  it("Should cancel deletion process successfully", () => {
    const expectedIssuesAfterCancelling = 4;
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
    IssueModal.validateNumberOfIssuesInBacklog(expectedIssuesAfterCancelling);
  });
});
