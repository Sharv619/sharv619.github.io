import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LinkedInPosts from "../../src/components/LinkedInPosts";
import { linkedInActivityUrl, linkedinPosts } from "../../src/lib/linkedin-posts";

describe("LinkedInPosts", () => {
  it("shows verified public posts in a LinkedIn activity carousel", () => {
    const { container } = render(<LinkedInPosts />);

    expect(screen.getByRole("heading", { name: "Himanshu Lade" })).toBeInTheDocument();
    expect(screen.getByText("Active on LinkedIn")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View LinkedIn profile/ })).toHaveAttribute(
      "href",
      linkedInActivityUrl
    );
    expect(container.querySelector("iframe")).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: `Read ${linkedinPosts[0].title} on LinkedIn` })).toHaveAttribute(
      "href",
      linkedinPosts[0].url
    );

    fireEvent.click(screen.getByRole("button", { name: "Show next LinkedIn post" }));

    expect(screen.getByRole("link", { name: `Read ${linkedinPosts[1].title} on LinkedIn` })).toHaveAttribute(
      "href",
      linkedinPosts[1].url
    );

    fireEvent.click(screen.getByRole("button", { name: "Show LinkedIn post 3" }));

    expect(screen.getByRole("link", { name: `Read ${linkedinPosts[2].title} on LinkedIn` })).toHaveAttribute(
      "href",
      linkedinPosts[2].url
    );
  });
});
