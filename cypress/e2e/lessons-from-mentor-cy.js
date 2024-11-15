//Lesson 2

//Tests:

import Lesson2 from "../../pages/lesson2";
describe("", () => {
  it("", () => {
    Lesson2.clickIssueCreateButton();
    Lesson2.getIssueModal().should("be.visible");
    Lesson2.enterTitle("Some text");
    Lesson2.clickSubmitButton();
  });
});

//POM

class Lesson2 {
  constructor() {
    this.createIssueButton = "create-issue-button";
    this.submitButton = "submit-button";
    this.issueModal = '[data-testid="modal:issue-create"]';
    this.title = 'input[name="title"]';
  }

  clickIssueCreateButton() {
    cy.get(createIssueButton).should("be,visible").click();
  }

  getIssueModal() {
    cy.get(this.issueModal);
  }

  clickSubmitButton() {
    cy.get(this.submitButton).should("be.visible").click();
  }

  enterTitle(text) {
    cy.get(this.title).should("be.visible").type(text);
  }
}

export default new Lesson2();

//Lesson 3
describe("", () => {
  it("", () => {
    cy.get('[data-testid="modal:issue-create"]').children();

    cy.get("div").contains("Cancel").parent().siblings().first();

    //Custom attribute
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");

    //ID
    cy.get('[id="Rectangle"]');
    cy.get("#Rectangle");

    //Tags
    cy.get("button");
    cy.get("input");
    cy.get("textarea");
    cy.get("div");
    cy.get("p");

    cy.get("button div").click();
    cy.get("button div").find("div").find("div").click();

    //Classes
    cy.get("button.nav-item");
    cy.get(".global-nav__item");
    cy.get(".menu-item");
    cy.get(".nav-item .global-nav__item");

    //Chaining
    cy.get('button[type="submit"]');
    cy.get('button[type="cancel"]');
    cy.get("button .disabled");

    //Xpath
    cy.get('//*[@id="root"]/div[3]/div/div/form/div[9]/button[2]');

    //Selectors to avoid
    cy.get('[class="sc-bXGyLb dvzGmn"]');
    cy.get('[class*="btn_"]');

    cy.get("div span p");
    cy.get('input [input="kldskdls"]');
  });
});

//Lesson 4:

describe("", () => {
  const backlog = '[data-testid="board-list:backlog"]';
  const listIssue = '[data-testid="list-issue"]';
  it("", () => {
    //cy.get() cy.get(backlog).should('be.visible');

    //cy.find
    cy.get('[data-testid="modal:issue-details"] [data-testid="icon:feedback"]');
    cy.get('[data-testid="modal:issue-details"]')
      .find('[data-testid="icon:feedback"]')
      .find('[data-testid="icon:feedback"]');
    cy.get(backlog).should("be.visible").find(listIssue);
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .find('[data-testid="list-issue"]');

    //Should
    cy
      .get(backlog)
      .should("be.visible")
      .and("have.class", "disabled")
      .and("have.attr", "disabled", "true")['[disabled-"true"]'];
    cy.get(backlog).should("exist");
    cy.get(backlog).should("have.class", "disabled");

    //Click
    cy.get(backlog).should("be.visible").click();
    cy.get(backlog).should("be.visible").trigger("mouseover").click();

    //Type
    cy.get(backlog).should("be.visible").type("Text");

    //Clear
    cy.get(backlog).should("be.visible").clear().type("Smth");

    //Trigger
    cy.get(backlog).should("be.visible").trigger("mouseover").click();
    cy.get(backlog).should("be.visible").trigger("mousedown");

    //Reload
    cy.reload();

    //Filter Get the DOM elements that match a specific selector
    cy.get("td").filter(".users");

    //Not. Filter DOM element(s) that don't have class users
    cy.get("td").not(".users");

    // Get all backlogs siblings
    cy.get(backlog).siblings();
    cy.get("li").siblings(".active"); // Get all li's siblings with class '.active'

    //Get specific DOM element children
    cy.get(backlog).children();

    //Get specific DOM element parent
    cy.get(backlog).parent();

    //Get following sibling of specific DOM element
    cy.get(backlog).next();

    //Get the immediately preceding sibling
    cy.get(backlog).prev();

    //Indexing elementes
    cy.get(backlog).eq(2).should("be.visible");
    cy.get(backlog).first().should("be.visible");
    cy.get(backlog).last().should("be.visible");

    //Its. Get length of ui li selector and perform assertion
    cy.get("ul li").its("length").should("be.gt", 6);

    //scrollIntoView()
    cy.get(backlog).scrollIntoView().should("be.visible");

    cy.get(`${backlog} button`);
    cy.get('[data-testid="board-list:backlog"] button');

    //url() returns current url
    cy.url().should("contain", "google.com");

    cy.get(".my-element").then((element) => {
      // $element inside the .then() method is a jQuery-wrapped DOM element.
      if (element.hasClass("active")) {
        // Perform action if the element has the 'active' class
        cy.log("Element has the active class");
        // Example: click the element
        cy.get(".my-element").click();
      } else {
        cy.log("Element does not have the active class");

        cy.get(".other-element").click();
      }
    });
  });
});
