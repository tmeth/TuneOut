import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SiteHeader from "./SiteHeader";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// 🧪 Spy to test that hide is called
const mockHide = vi.fn();

// 🧱 Mock Bootstrap Collapse module
vi.mock("bootstrap/dist/js/bootstrap.bundle.min.js", () => ({
  default: {
    Collapse: {
      getInstance: vi.fn((element) => {
        if (element?.id === "navbarNav") {
          return { hide: mockHide };
        }
        return null;
      }),
    },
  },
}));

describe("SiteHeader Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("renders all nav links with correct text", () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it("calls bootstrap Collapse hide when nav link is clicked and navbar is shown", () => {
    // Setup collapsing navbar element
    const navbarCollapse = document.createElement("div");
    navbarCollapse.classList.add("show");
    navbarCollapse.id = "navbarNav";
    document.body.appendChild(navbarCollapse);

    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);

    expect(mockHide).toHaveBeenCalled();

    document.body.removeChild(navbarCollapse);
  });

  it("does not call hide if navbarNav does not have show class", () => {
    // Setup navbar element without 'show'
    const navbarCollapse = document.createElement("div");
    navbarCollapse.id = "navbarNav";
    document.body.appendChild(navbarCollapse);

    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);

    expect(mockHide).not.toHaveBeenCalled();

    document.body.removeChild(navbarCollapse);
  });
});