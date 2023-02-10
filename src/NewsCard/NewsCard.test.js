import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewsCard from "./NewsCard";

describe("NewsCard component", () => {
  test("Renders the NewsCard component", () => {
    render(
      <NewsCard
        newsDescription="Description"
        newsImage="Image URL"
        newsTitle="Title"
        newsSource="Source"
        newsPublishedAt="2022-01-01T00:00:00Z"
        newsContent="Content"
        newsUrl="URL"
      />
    );
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
  test("Popup opens and closes", () => {
    render(
      <NewsCard
        newsDescription="Description"
        newsImage="Image URL"
        newsTitle="Title"
        newsSource="Source"
        newsPublishedAt="2022-01-01T00:00:00Z"
        newsContent="Content"
        newsUrl="URL"
      />
    );

    // Find the button element
    const button = screen.getByText("See Full Article");

    // Simulate a click event
    fireEvent.click(button);

    // Check if the popup is open by checking if the newsContent text is in the document
    expect(screen.getByText("Content")).toBeInTheDocument();

    // Simulate a click event on the button again
    fireEvent.click(button);

    // Check if the popup is closed by checking if the newsContent text is NOT in the document
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
  test('Opens the popup when the "See Full Article" button is clicked', () => {
    render(
      <NewsCard
        newsDescription="Description"
        newsImage="Image URL"
        newsTitle="Title"
        newsSource="Source"
        newsPublishedAt="2022-01-01T00:00:00Z"
        newsContent="Content"
        newsUrl="URL"
      />
    );

    const button = screen.getByRole("button", { name: "See Full Article" });
    fireEvent.click(button);

    // Verify that the popup is open by checking for some element
    // that is unique to the popup
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01T00:00:00Z")).toBeInTheDocument();
    expect(screen.getByText("URL")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
