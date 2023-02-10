describe("NewsCard", () => {
  beforeEach(() => {
    cy.visit("https://mikolaj-zagrodzki-percayso.netlify.app/");
  });

  it("Renders the news card", () => {
    cy.get(".newsCard-container").should("be.visible");
  });
  it("Opens the popup to see full article - open button", () => {
    cy.get(".newsCard-footer button").first().click();
    cy.get(".card-popup-container").should("be.visible");
  });
  it("Closes the popup on click - close button", () => {
    cy.get(".newsCard-footer button").first().click();
    cy.get(".card-popup-container").should("be.visible");
    cy.get(".card-popup-footer").first().click();
    cy.get(".newsCard-container").should("be.visible");
  });
  it("Displays the correct number of news cards in carousel based on the selected screen size", () => {
    cy.viewport("macbook-13");
    cy.get(".react-multi-carousel-list").should("have.length", 1);

    cy.viewport("iphone-6");
    cy.get(".react-multi-carousel-list").should("have.length", 1);
  });
});
