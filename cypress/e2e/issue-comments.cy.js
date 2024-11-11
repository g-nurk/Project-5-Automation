const issueTitle = "This is an issue of type: Task.";
const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
const textareaAddAComment = () =>
  cy.get('textarea[placeholder="Add a comment..."]');
const clickSaveButton = () => cy.contains("button", "Save").click();
const issueComment = '[data-testid="issue-comment"]';
const validateCommentExists = (mycomment) =>
  cy.get(issueComment).should("contain.text", mycomment);
const modalConfirm = () =>
  cy.get('[data-testid="modal:confirm"]').contains("button", "Delete comment");
const addComment = "Adding a new comment";
const editComment = "Editing the comment";

describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
      });
  });

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.exist");
  });

  it("Should create, edit and delete a comment successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      textareaAddAComment().type(addComment);
      clickSaveButton().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      validateCommentExists(addComment);
    });

    getIssueDetailsModal().within(() => {
      cy.get(issueComment).first().contains("Edit").click();
      textareaAddAComment().clear().type(editComment);
      clickSaveButton().should("not.exist");
      validateCommentExists(editComment);
    });

    getIssueDetailsModal()
      .find(issueComment)
      .should("contain", editComment)
      .contains("Delete")
      .click();
    modalConfirm().click().should("not.exist");
    getIssueDetailsModal().find(editComment).should("not.exist");
  });
});
