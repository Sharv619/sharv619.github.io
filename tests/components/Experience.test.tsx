import { render, screen } from "@testing-library/react";

import Experience from "../../src/components/Experience";

describe("Experience", () => {
  it("renders the latest resume-aligned work history", () => {
    render(<Experience />);

    expect(screen.getByRole("heading", { name: "Software Engineer" })).toBeInTheDocument();
    expect(screen.getByText("May 2025 - Oct 2025")).toBeInTheDocument();
    expect(screen.getByText(/100% of the data with zero loss/)).toBeInTheDocument();
    expect(screen.getByText(/33% across a production application serving 200\+ active users/)).toBeInTheDocument();
    expect(screen.queryByText(/Founding Engineer \/ Principal Technical Lead/)).not.toBeInTheDocument();
    expect(screen.queryByText(/10,000\+ users/)).not.toBeInTheDocument();
  });
});
