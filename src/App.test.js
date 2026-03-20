import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio brand text", () => {
  render(<App />);
  const brandElement = screen.getByRole("heading", {
    name: /brahamjot singh/i,
    level: 4,
  });
  expect(brandElement).toBeInTheDocument();
});
