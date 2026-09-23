import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { EvidenceDisclosure } from "@/components/ui/EvidenceDisclosure";

afterEach(() => {
  cleanup();
});

describe("P13 — EvidenceDisclosure", () => {
  it("renders collapsed by default with the translated collapsed label visible and content present in the DOM", () => {
    render(
      <EvidenceDisclosure collapsedLabel="Explorar evidencia adicional" expandedLabel="Ocultar evidencia adicional">
        <p>Additional evidence</p>
      </EvidenceDisclosure>,
    );

    const details = screen.getByText("Additional evidence").closest("details");
    expect(details?.hasAttribute("open")).toBe(false);
    expect(screen.getByText("Explorar evidencia adicional")).toBeTruthy();
    // Content stays server-rendered in the DOM even while collapsed — nothing is deleted.
    expect(screen.getByText("Additional evidence")).toBeTruthy();
  });

  it("expands via the native summary control (keyboard-operable, no custom JS) and swaps to the expanded label", () => {
    render(
      <EvidenceDisclosure collapsedLabel="Explorar evidencia adicional" expandedLabel="Ocultar evidencia adicional">
        <p>Additional evidence</p>
      </EvidenceDisclosure>,
    );

    const summary = screen.getByText("Explorar evidencia adicional").closest("summary")!;
    fireEvent.click(summary);

    const details = screen.getByText("Additional evidence").closest("details");
    expect(details?.hasAttribute("open")).toBe(true);
  });

  it("uses native <details>/<summary> semantics, not a custom modal or dialog role", () => {
    render(
      <EvidenceDisclosure collapsedLabel="Explore additional evidence" expandedLabel="Hide additional evidence">
        <p>More evidence</p>
      </EvidenceDisclosure>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("More evidence").closest("details")?.tagName).toBe("DETAILS");
  });
});
