const issueCreate = () => cy.get('[data-testid="modal:issue-create"]');
const inputIssueTitle = () => cy.get('input[name="title"]');
const issueDescription = "Creating an issue for assignment 2";
const issueTitle = "Time Tracking Functionality Test Issue";
const issueTypeSelection = () => cy.get('[data-testid="select:type"]').click();
const issueTypeBug = () => cy.get('[data-testid="select-option:Bug"]').click();
const userId = () => cy.get('[data-testid="select:userIds"]').click();
const userIdPickleRick = () =>
  cy.get('[data-testid="select-option:Pickle Rick"]').click();
const submitIssue = () => cy.get('button[type="submit"]').click();
const closeIssueModal = () =>
  cy.get('[data-testid="icon:close"]').first().click();
const issueCreatedConfirmation = "Issue has been successfully created.";
const backlogBoardList = '[data-testid="board-list:backlog"]';
const inputTime = 'input[placeholder="Number"]';
const timeTrackingButton = '[data-testid="icon:stopwatch"]';
const timeTrackingModal = '[data-testid="modal:tracking"]';
const estimatedTime = "10";
const estimatedTimeEdited = "20";
const loggedInTime = "2";
const remainingAmountOfTime = "5";
const estimatedTimeText = "h estimated";
const loggedTimeText = "h logged";
const remainingTimeText = "h remaining";

describe("Time tracking functionality tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
        issueCreate().within(() => {
          issueTypeSelection();
          issueTypeBug();
          cy.get(".ql-editor").type(issueDescription);
          inputIssueTitle().type(issueTitle);
          userId();
          userIdPickleRick();
          submitIssue();
        });
        issueCreate().should("not.exist");
        cy.contains(issueCreatedConfirmation).should("be.visible");
        cy.get(backlogBoardList)
          .should("be.visible")
          .contains(issueTitle)
          .click();
      });
  });

  it("Should add, edit and delete estimated time in the new issue", () => {
    cy.contains("No time logged").should("be.visible");
    cy.get(inputTime).type(estimatedTime).wait(2000);
    closeIssueModal();
    cy.get(backlogBoardList).should("be.visible").contains(issueTitle).click();
    cy.get(inputTime).should("have.value", estimatedTime);
    cy.contains(estimatedTime + estimatedTimeText).should("be.visible");
    cy.get(inputTime).clear().type(estimatedTimeEdited).wait(2000);
    closeIssueModal();
    cy.get(backlogBoardList).should("be.visible").contains(issueTitle).click();
    cy.get(inputTime).should("have.value", estimatedTimeEdited);
    cy.contains(estimatedTimeEdited + estimatedTimeText).should("be.visible");
    cy.get(inputTime).clear().wait(2000);
    closeIssueModal();
    cy.get(backlogBoardList).should("be.visible").contains(issueTitle).click();
    cy.contains(estimatedTime + estimatedTimeText).should("not.exist");
    cy.contains(estimatedTimeEdited + estimatedTimeText).should("not.exist");
    cy.contains("No time logged").should("be.visible");
  });

  it("Should add and delete logged time in the new issue", () => {
    cy.contains("No time logged").should("be.visible");
    cy.get(inputTime).type(estimatedTime);
    cy.get(inputTime).should("have.value", estimatedTime);
    cy.contains(estimatedTime + estimatedTimeText).should("be.visible");
    cy.get(timeTrackingButton).click();
    cy.get(timeTrackingModal)
      .should("be.visible")
      .within(() => {
        cy.get(inputTime).eq(0).type(loggedInTime);
        cy.get(inputTime).eq(1).type(remainingAmountOfTime);
        cy.contains("button", "Done").click();
      });
    cy.get(timeTrackingModal).should("not.exist");
    cy.contains("No time logged").should("not.exist");
    cy.contains(loggedInTime + loggedTimeText).should("be.visible");
    cy.contains(remainingAmountOfTime + remainingTimeText).should("be.visible");
    cy.contains(estimatedTime + estimatedTimeText).should("not.exist");
    cy.get(timeTrackingButton).click();
    cy.get(timeTrackingModal)
      .should("be.visible")
      .within(() => {
        cy.get(inputTime).eq(0).clear();
        cy.get(inputTime).eq(1).clear();
        cy.contains("button", "Done").click();
      });
    cy.contains("No time logged").should("be.visible");
    cy.contains(loggedInTime + loggedTimeText).should("not.exist");
    cy.contains(remainingAmountOfTime + remainingTimeText).should("not.exist");
    cy.contains(estimatedTime + estimatedTimeText).should("be.visible");
  });
});
