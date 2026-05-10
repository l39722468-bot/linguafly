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
  it("uses Spanish blog link on desktop", () => {
    render(<Navigation />);

    const desktopBlogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(desktopBlogLinks).toHaveLength(1);
    expect(desktopBlogLinks[0]).toHaveAttribute("href", "/blog");
  });

  it("uses Spanish blog link on mobile", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
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
