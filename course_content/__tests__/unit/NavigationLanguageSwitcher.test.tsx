import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "@/components/sections/Navigation";

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

describe("Navigation", () => {
  it("renders the unified portal areas and English categories", () => {
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Fitness" })).toHaveAttribute("href", "/fitness");
    expect(screen.getByRole("link", { name: "Test de nivel" })).toHaveAttribute("href", "/test-nivel");
    expect(screen.getByText("Inglés")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gramática" })).toHaveAttribute("href", "/blog/gramatica");
    expect(screen.getByRole("link", { name: "Viajes" })).toHaveAttribute("href", "/blog/viajes");
    expect(screen.getByRole("link", { name: "Trabajo" })).toHaveAttribute("href", "/blog/trabajo");
  });

  it("does not expose the removed Spanish course or English home", () => {
    render(<Navigation />);

    expect(screen.queryByText(/Spanish/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "EN" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
  });
});
