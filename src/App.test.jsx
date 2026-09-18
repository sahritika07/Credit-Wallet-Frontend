import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import App from "./App";

test("renders Wallet model text", () => {
  render(<App />);

  const walletElement = screen.getByText("Wallet model");

  expect(walletElement).toBeInTheDocument();
});

test("renders Multi-currency balances", () => {
  render(<App />);

  const balanceElements = screen.getAllByText("Multi-currency balances");

  expect(balanceElements.length).toBeGreaterThan(0);
});

test("contains h2 elements", () => {
  const { container } = render(<App />);

  const h2Elements = container.querySelectorAll("h2");

  expect(h2Elements.length).toBeGreaterThan(0);
});