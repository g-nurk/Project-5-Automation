describe("Issue details editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should update type, status, assignees, reporter, priority successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click("bottomRight");
      cy.get('[data-testid="select-option:Story"]')
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="select:type"]').should("contain", "Story");

      cy.get('[data-testid="select:status"]').click("bottomRight");
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should("have.text", "Done");

      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should("contain", "Baby Yoda");
      cy.get('[data-testid="select:assignees"]').should(
        "contain",
        "Lord Gaben"
      );

      cy.get('[data-testid="select:reporter"]').click("bottomRight");
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        "have.text",
        "Pickle Rick"
      );

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Medium");
    });
  });

  it("Should update title, description successfully", () => {
    const title = "TEST_TITLE";
    const description = "TEST_DESCRIPTION";

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get(".ql-snow").click().should("not.exist");

      cy.get(".ql-editor").clear().type(description);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('textarea[placeholder="Short summary"]').should(
        "have.text",
        title
      );
      cy.get(".ql-snow").should("have.text", description);
    });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  //Assignment 3.1
  it("Should check priority dropdown successfully", () => {
    const expectedLength = 5;
    let emptyPriorityVariable = [];
    const expectedValues = ["Lowest", "Low", "Medium", "High", "Highest"];

    cy.get('[data-testid="select:priority"]').within(() => {
      cy.get('[data-testid="icon:arrow-up"]')
        .siblings("div")
        .invoke("text")
        .then((initialPriorityValue) => {
          emptyPriorityVariable.push(initialPriorityValue.trim());
          cy.log(`Initially selected priority:`, initialPriorityValue.trim());
        });
    });
    cy.get('[data-testid="select:priority"]').click().wait(3000);
    cy.get('[data-testid="select:priority"]')
      .siblings()
      .find('div[data-testid^="select-option:"]')
      .each(($el, index) => {
        cy.wrap($el)
          .invoke("text")
          .then((priorityValue) => {
            emptyPriorityVariable.push(priorityValue.trim());
            cy.log(`Option ${index + 1}:`, priorityValue.trim());
            cy.log("Array length", emptyPriorityVariable.length);
          });
      });
    cy.wrap(emptyPriorityVariable).should("have.length", expectedLength);
    expectedValues.forEach((value) => {
      cy.wrap(emptyPriorityVariable).should("include", value);
      cy.log(`Array consists of ${value}`);
    });
  });

  //Assignment 3.2
  it("Should check that reporter's name only consists of characters", () => {
    cy.get('[data-testid="select:reporter"]')
      .find('[data-testid="avatar:Baby Yoda"]')
      .siblings()
      .invoke("text")
      .should("match", /^[A-Za-z\s]+$/);
  });
});

//Assignment 3.3 skipped due to the information presented in the Discussion Board
