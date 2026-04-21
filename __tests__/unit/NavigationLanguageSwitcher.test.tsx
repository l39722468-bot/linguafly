import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "@/components/sections/Navigation";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("next/link", () => {
  const MockNextLink = ({
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

  MockNextLink.displayName = "MockNextLink";
  return MockNextLink;
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

  it("uses PT-BR blog link inside Portuguese pages", () => {
    mockUsePathname.mockReturnValue("/pt-br");
    render(<Navigation />);

    const desktopBlogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(desktopBlogLinks).toHaveLength(1);
    expect(desktopBlogLinks[0]).toHaveAttribute("href", "/pt-br/blog");

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(screen.getByRole("link", { name: "📰 Blog" })).toHaveAttribute(
      "href",
      "/pt-br/blog"
    );
  });

  it("uses Spanish blog link on non-PT pages", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Navigation />);

    const desktopBlogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(desktopBlogLinks).toHaveLength(1);
    expect(desktopBlogLinks[0]).toHaveAttribute("href", "/blog");

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(screen.getByRole("link", { name: "📰 Blog" })).toHaveAttribute(
      "href",
      "/blog"
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
