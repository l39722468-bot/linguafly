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
  it("renders idiomas and hides the other magazine verticals plus the old English portal", () => {
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Idiomas" })).toHaveAttribute("href", "/idiomas");
    expect(screen.getByRole("link", { name: "Artículos" })).toHaveAttribute("href", "/blog");
    expect(screen.queryByRole("link", { name: "Alimentación" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Entrenamiento" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Inteligencia artificial" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "IA" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Fitness" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Test de nivel" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Gramática" })).not.toBeInTheDocument();
  });

  it("does not expose the removed Spanish course or English home", () => {
    render(<Navigation />);

    expect(screen.queryByText(/Spanish/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "EN" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
  });
});
