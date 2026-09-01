import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "@/components/sections/Navigation";

let mockPathname = "/";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => mockPathname,
}));

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
  beforeEach(() => {
    mockPathname = "/";
  });

  it("renders course buttons with expected links", () => {
    render(<Navigation />);

    expect(screen.getAllByRole("link", { name: "A1" })[0]).toHaveAttribute("href", "/curso-a1");
    expect(screen.getAllByRole("link", { name: "A2" })[0]).toHaveAttribute("href", "/curso-a2");
    expect(screen.getAllByRole("link", { name: "B1" })[0]).toHaveAttribute("href", "/curso-b1");
    expect(screen.getAllByRole("link", { name: "B2" })[0]).toHaveAttribute("href", "/curso-b2");
    expect(screen.getAllByRole("link", { name: "C1" })[0]).toHaveAttribute("href", "/curso-c1");
    expect(screen.getAllByRole("link", { name: "C2" })[0]).toHaveAttribute("href", "/curso-c2");
  });

  it("renders level test link in desktop and mobile navigation", () => {
    render(<Navigation />);

    const desktopLevelTestLinks = screen.getAllByRole("link", { name: "Test de nivel" });
    expect(desktopLevelTestLinks[0]).toHaveAttribute("href", "/test-nivel");

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(desktopLevelTestLinks[1]).toHaveAttribute("href", "/test-nivel");
  });

  it("uses Spanish blog link on desktop", () => {
    render(<Navigation />);

    const desktopBlogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(desktopBlogLinks).toHaveLength(1);
    expect(desktopBlogLinks[0]).toHaveAttribute("href", "/blog");
  });

  it("uses Spanish blog link on mobile", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(screen.getAllByRole("link", { name: "A1" })[1]).toHaveAttribute("href", "/curso-a1");
    expect(screen.getAllByRole("link", { name: "A2" })[1]).toHaveAttribute("href", "/curso-a2");
    expect(screen.getAllByRole("link", { name: "B1" })[1]).toHaveAttribute("href", "/curso-b1");
    expect(screen.getAllByRole("link", { name: "B2" })[1]).toHaveAttribute("href", "/curso-b2");
    expect(screen.getAllByRole("link", { name: "C1" })[1]).toHaveAttribute("href", "/curso-c1");
    expect(screen.getAllByRole("link", { name: "C2" })[1]).toHaveAttribute("href", "/curso-c2");
    expect(screen.getByRole("link", { name: "📰 Blog" })).toHaveAttribute(
      "href",
      "/blog"
    );
  });

  it("does not render Portuguese language toggle", () => {
    render(<Navigation />);

    expect(screen.queryByText("PT")).not.toBeInTheDocument();
    expect(screen.queryByText("Português")).not.toBeInTheDocument();
  });

  it("renders an ES / EN home language switcher", () => {
    render(<Navigation />);

    const es = screen.getAllByRole("link", { name: "ES" })[0];
    const en = screen.getAllByRole("link", { name: "EN" })[0];
    expect(es).toHaveAttribute("href", "/");
    expect(en).toHaveAttribute("href", "/en");
    expect(es).toHaveAttribute("aria-current", "page");
    expect(en).not.toHaveAttribute("aria-current");
  });

  it("on /en points A1 at the Spanish course and hides English-course chrome", () => {
    mockPathname = "/en";
    render(<Navigation />);

    expect(screen.getAllByRole("link", { name: "A1" })[0]).toHaveAttribute(
      "href",
      "/blog/curso-espanol-a1"
    );
    expect(screen.getAllByRole("link", { name: "A2" })[0]).toHaveAttribute("href", "/en#levels");
    expect(screen.getAllByRole("link", { name: "Start A1" })[0]).toHaveAttribute(
      "href",
      "/blog/curso-espanol-a1/unidad-1-greetings-names-ser"
    );
    expect(screen.queryByRole("link", { name: "Test de nivel" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();

    const en = screen.getAllByRole("link", { name: "EN" })[0];
    expect(en).toHaveAttribute("aria-current", "page");
  });
});
