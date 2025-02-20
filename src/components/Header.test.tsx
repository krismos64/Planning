import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header", () => {
  it("affiche le titre de l'application", () => {
    render(<Header />);
    const titleElement = screen.getByText(/SmartPlanning AI/i);
    expect(titleElement).toBeInTheDocument();
  });
});
