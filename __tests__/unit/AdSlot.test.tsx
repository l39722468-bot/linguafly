import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AdSlot } from "@/components/ads/AdSlot";

jest.mock("@/lib/marketing-consent", () => ({
  ADSENSE_CLIENT_ID: "ca-pub-test",
  loadAdSenseScript: jest.fn(),
  runWithMarketingConsent: jest.fn(() => jest.fn()),
}));

describe("AdSlot", () => {
  it("renders a labeled advertising region for each placement", () => {
    render(<AdSlot placement="leaderboard" />);
    expect(screen.getByLabelText("Publicidad")).toBeInTheDocument();
    expect(screen.getByText(/Espacio publicitario/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Publicidad")).toHaveAttribute(
      "data-ad-placement",
      "leaderboard",
    );
  });
});
