import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "@/components/sections/Navigation";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("next/link", () => {
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

describe("Navigation language switcher", () => {
  it("shows PT switch link from Spanish home", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "PT" })).toHaveAttribute(
      "href",
      "/pt-br"
    );
    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("maps PT blog pages back to Spanish blog", () => {
    mockUsePathname.mockReturnValue("/pt-br/blog/aptis-a2-guia-completa");
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute(
      "href",
      "/blog"
    );
    expect(screen.getByRole("link", { name: "PT" })).toHaveAttribute(
      "href",
      "/pt-br/blog/aptis-a2-guia-completa"
    );
  });

  it("maps Spanish blog article URLs to PT-BR article URLs", () => {
    mockUsePathname.mockReturnValue("/blog/examenes/aptis-a2-guia-completa");
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "PT" })).toHaveAttribute(
      "href",
      "/pt-br/blog/aptis-a2-guia-completa"
    );
  });
});
