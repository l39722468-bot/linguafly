import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "@/components/sections/Navigation";
import { getUser, onAuthStateChange } from "@/lib/auth-helpers";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@/lib/auth-helpers", () => ({
  getUser: jest.fn().mockResolvedValue({ user: null }),
  signOut: jest.fn().mockResolvedValue({ error: null }),
  onAuthStateChange: jest.fn().mockReturnValue({
    data: { subscription: { unsubscribe: jest.fn() } },
  }),
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

describe("Navigation", () => {
  beforeEach(() => {
    jest.mocked(getUser).mockReset();
    jest.mocked(getUser).mockResolvedValue({ user: null, error: null });
    jest.mocked(onAuthStateChange).mockReset();
    jest.mocked(onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    });
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

  it("shows login button when user is not authenticated", async () => {
    render(<Navigation />);

    expect(await screen.findByRole("link", { name: "Iniciar sesión" })).toHaveAttribute(
      "href",
      "/cuenta/login"
    );
  });

  it("shows panel link instead of login when user is authenticated", async () => {
    const mockUser = { id: "user-1", email: "alumno@test.com" };
    jest.mocked(getUser).mockResolvedValue({ user: mockUser, error: null });
    jest.mocked(onAuthStateChange).mockImplementation((callback) => {
      callback(mockUser);
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });

    await act(async () => {
      render(<Navigation />);
    });

    expect(screen.getAllByRole("link", { name: "Mi Panel" })[0]).toHaveAttribute(
      "href",
      "/mi-panel"
    );
    expect(screen.queryByRole("link", { name: "Iniciar sesión" })).not.toBeInTheDocument();
  });
});
