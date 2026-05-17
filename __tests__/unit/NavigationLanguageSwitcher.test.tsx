import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "@/components/sections/Navigation";

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

describe("Navigation", () => {
  it("renders course buttons with expected links", () => {
    render(<Navigation />);

    expect(screen.getAllByRole("link", { name: "A1" })[0]).toHaveAttribute("href", "/curso-a1");
    expect(screen.getAllByRole("link", { name: "A2" })[0]).toHaveAttribute("href", "/curso-a2");
    expect(screen.getAllByRole("link", { name: "B1" })[0]).toHaveAttribute("href", "/curso-b1");
    expect(screen.getAllByRole("link", { name: "B2" })[0]).toHaveAttribute("href", "/curso-b2");
    expect(screen.getAllByRole("link", { name: "C1" })[0]).toHaveAttribute("href", "/curso-c1");
    expect(screen.getAllByRole("link", { name: "C2" })[0]).toHaveAttribute("href", "/curso-c2");
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
});
