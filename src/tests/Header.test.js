// Header.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../Header";
import { useListContext } from "../context/ListContext";
import { onMessage } from "../service/mockServer";

// Mock the dependencies
jest.mock("../context/ListContext");
jest.mock("../service/mockServer");
jest.mock("../components/SnackBarToast", () => (props) => {
  return <div data-testid="snackbar-toast">{JSON.stringify(props)}</div>;
});

describe("Header Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("renders the header", () => {
    useListContext.mockReturnValue({
      addList: jest.fn(),
      fetchLists: jest.fn(),
      loading: false,
      error: null,
    });

    render(<Header />);

    expect(screen.getByText("Toast Exercise")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /New Submission/i })
    ).toBeInTheDocument();
  });

  test("handles new submission", async () => {
    useListContext.mockReturnValue({
      addList: jest.fn(),
      fetchLists: jest.fn(),
      loading: false,
      error: null,
    });

    const mockSubmission = {
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        liked: false,
      },
    };
    onMessage.mockImplementation((callback) => callback(mockSubmission));

    render(<Header />);

    const newSubmissionButton = screen.getByRole("button", {
      name: /New Submission/i,
    });
    fireEvent.click(newSubmissionButton);

    await waitFor(() => {
      expect(screen.getByTestId("snackbar-toast")).toBeInTheDocument();
    });

    const snackBarProps = JSON.parse(
      screen.getByTestId("snackbar-toast").textContent
    );
    expect(snackBarProps.open).toBe(true);
    expect(snackBarProps.liked).toBe(false);
    expect(snackBarProps.data).toEqual(mockSubmission.data);
  });

//   test("handles close snackbar", async () => {
//     useListContext.mockReturnValue({
//       addList: jest.fn(),
//       fetchLists: jest.fn(),
//       loading: false,
//       error: null,
//     });

//     const mockSubmission = {
//       data: {
//         firstName: "John",
//         lastName: "Doe",
//         email: "john@example.com",
//         liked: false,
//       },
//     };
//     onMessage.mockImplementation((callback) => callback(mockSubmission));

//     render(<Header />);

//     const newSubmissionButton = screen.getByRole("button", {
//       name: /New Submission/i,
//     });
//     fireEvent.click(newSubmissionButton);

//     await waitFor(() => {
//       expect(screen.getByTestId("snackbar-toast")).toBeInTheDocument();
//     });

//     // Use custom text matcher function to find the close button
//     const closeButton = screen.getByText((content, element) => {
//       // Check if the element is a button and its content matches the regular expression
//       return (
//         element.tagName.toLowerCase() === "button" &&
//         element.textContent.toLowerCase().includes("close")
//       );
//     });

//     fireEvent.click(closeButton);

//     await waitFor(() => {
//       expect(screen.queryByTestId("snackbar-toast")).not.toBeInTheDocument();
//     });
//   });

  test("handles liked submission", async () => {
    const addListMock = jest.fn();
    const mockSubmission = {
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        liked: false,
      },
    };

    // Mock the context value to spy on addList function
    useListContext.mockReturnValue({
      addList: addListMock,
      fetchLists: jest.fn(),
      loading: false,
      error: null,
    });

    // Mock the submission message callback
    onMessage.mockImplementation((callback) => callback(mockSubmission));

    render(<Header />);

    // Trigger a new submission
    const newSubmissionButton = screen.getByRole("button", {
      name: /New Submission/i,
    });
    fireEvent.cli;
  });
});
