import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DirectContactDialog } from "@/components/ui/DirectContactDialog";
import { contactContent } from "@/content/core-pages";

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value() {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    },
  });
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    callback(0);
    return 1;
  });
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("P11 — DirectContactDialog", () => {
  it("opens in Spanish with the approved actions and restores focus when closed", () => {
    render(<DirectContactDialog locale="es" content={contactContent.directContact} />);

    const trigger = screen.getByRole("button", { name: /Contacto directo/i });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("link", { name: /Escribir por WhatsApp/i }).getAttribute("href")).toBe(
      "https://wa.me/584221445743",
    );
    expect(screen.getByRole("link", { name: /Abrir Messages \/ SMS/i }).getAttribute("href")).toBe(
      "sms:+584221445743",
    );
    expect(screen.queryByRole("link", { name: /^Llamar/i })).toBeNull();
    expect(document.querySelector('a[href^="tel:"]')).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Cerrar opciones de contacto" }));
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(trigger);
  });

  it("renders natural English copy without claiming guaranteed iMessage delivery", () => {
    render(<DirectContactDialog locale="en" content={contactContent.directContact} />);
    fireEvent.click(screen.getByRole("button", { name: /Direct contact/i }));

    expect(screen.getByRole("heading", { name: "Choose how you would like to contact me" })).toBeTruthy();
    expect(screen.getByText(/Messages decides whether to use iMessage or SMS/i)).toBeTruthy();
    expect(screen.queryByText(/guaranteed iMessage/i)).toBeNull();
  });
});
