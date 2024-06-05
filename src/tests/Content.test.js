import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useListContext } from "../context/ListContext";
import Content from "../Content";
jest.mock("../context/ListContext");

describe("Content Component", () => {
  test("renders loading state", () => {
    useListContext.mockReturnValue({ lists: [], loading: true, error: null });

    render(<Content />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error state", () => {
    useListContext.mockReturnValue({
      lists: [],
      loading: false,
      error: { status: 500, message: "Server error" },
    });

    render(<Content />);

    expect(screen.getByText(/Server error/i)).toBeInTheDocument();
  });

  test("renders table with data", () => {
    const mockData = [
      { firstName: "John", lastName: "Doe", email: "john@example.com" },
    ];
    useListContext.mockReturnValue({
      lists: mockData,
      loading: false,
      error: null,
    });

    render(<Content />);

    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    const johnRow = screen.getAllByText("John")[0].closest("tr");

    within(johnRow).getByText("John");
    within(johnRow).getByText("Doe");
    within(johnRow).getByText("john@example.com");
  });

  test("renders table with no data", () => {
    useListContext.mockReturnValue({ lists: [], loading: false, error: null });

    render(<Content />);

    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });
});
