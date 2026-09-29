import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LinkedInPosts from "../../src/components/LinkedInPosts";
import { linkedInActivityUrl, linkedinPosts } from "../../src/lib/linkedin-posts";

describe("LinkedInPosts", () => {
  it("links the LinkedIn presence section to verified public posts", () => {
    const { container } = render(<LinkedInPosts />);

    expect(screen.getByRole("heading", { name: "Notes from the build." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /See every post on LinkedIn/ })).toHaveAttribute(
      "href",
      linkedInActivityUrl
    );
    expect(container.querySelector("iframe")).not.toBeInTheDocument();

    linkedinPosts.forEach((post) => {
      expect(screen.getByRole("link", { name: `Read ${post.title} on LinkedIn` })).toHaveAttribute(
        "href",
        post.url
      );
    });
  });
});
