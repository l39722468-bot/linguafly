import { render, screen } from "@testing-library/react";
import { RelatedSearches } from "@/components/blog/RelatedSearches";

describe("RelatedSearches", () => {
  it("shows query phrases with spaces instead of concatenated hashtags", () => {
    render(
      <RelatedSearches
        title="Present Perfect vs Past Simple: Diferencias y Uso"
        keywords={["present perfect or past simple"]}
        category="gramatica"
        slug="present-perfect-vs-past-simple"
      />,
    );
    expect(screen.getByRole("heading", { name: /consultas relacionadas/i })).toBeInTheDocument();
    expect(screen.getByText("present perfect or past simple")).toBeInTheDocument();
    expect(screen.queryByText("#presentperfectorpastsimple")).not.toBeInTheDocument();
  });
});
