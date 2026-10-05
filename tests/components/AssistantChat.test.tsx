import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AssistantChat from "@/components/AssistantChat";

describe("AssistantChat", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("identifies the active browser-only repository RAG", () => {
    render(<AssistantChat isOpen onClose={() => undefined} />);

    expect(screen.getByText("Repo RAG")).toBeInTheDocument();
    expect(screen.queryByText("Demo Mode")).not.toBeInTheDocument();
  });

  it("answers from the local index without a network request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<AssistantChat isOpen onClose={() => undefined} />);

    const input = screen.getByPlaceholderText("Ask about Himanshu...");
    fireEvent.change(input, { target: { value: "Which repositories use Scikit-learn?" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getAllByText(/Network Guardian AI/).length).toBeGreaterThan(0);
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
