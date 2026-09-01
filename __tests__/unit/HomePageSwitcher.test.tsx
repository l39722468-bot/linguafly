import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePageSwitcher } from "@/components/sections/HomePageSwitcher";

jest.mock("next/link", () => {
  const MockNextLink = ({
    children,
    href,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
  MockNextLink.displayName = "MockNextLink";
  return MockNextLink;
});

describe("HomePageSwitcher", () => {
  it("on the Spanish home shows both homes and marks ES as current", () => {
    render(<HomePageSwitcher locale="es" />);

    const es = screen.getByRole("link", { name: /Español/i });
    const en = screen.getByRole("link", { name: /English/i });
    expect(es).toHaveAttribute("href", "/");
    expect(en).toHaveAttribute("href", "/en");
    expect(es).toHaveAttribute("aria-current", "page");
    expect(en).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("navigation", { name: "Cambiar de home" })).toBeInTheDocument();
  });

  it("on the English home marks EN as current", () => {
    render(<HomePageSwitcher locale="en" />);

    expect(screen.getByRole("link", { name: /English/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Español/i })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("navigation", { name: "Switch home" })).toBeInTheDocument();
  });
});
