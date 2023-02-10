import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("App component", () => {
  test("Renders without crashing", () => {
    render(<App />);
  });
  test("Renders the header and main container", () => {
    const { getByText, getByLabelText } = render(<App />);

    expect(getByText("The Onion News")).toBeInTheDocument();
    expect(getByLabelText("News Category")).toBeInTheDocument();
    expect(getByText("General")).toBeInTheDocument();
  });
  test("Renders label and dropdown correctly", () => {
    const { getByLabelText } = render(<App />);
    const dropdown = getByLabelText(/News Category/i);
    expect(dropdown).toBeInTheDocument();
  });
  test("Select option updates news category", () => {
    const { getByText, getByLabelText } = render(<App />);

    fireEvent.change(getByLabelText("News Category"), {
      target: { value: "Technology" },
    });

    expect(getByText("Technology")).toBeInTheDocument();
  });
});

