import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./main.jsx";

describe("Patchday vulnerability triage", () => {
  it("shows the dashboard after findings load", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", { name: /good morning, seema/i }),
    ).toBeTruthy();
    expect(screen.getByText("Priority findings")).toBeTruthy();
    expect(await screen.findByText("OpenSSL buffer overflow")).toBeTruthy();
  });

  it("filters findings by severity", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("OpenSSL buffer overflow");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Filter by severity" }),
      "Critical",
    );

    expect(screen.getByText("OpenSSL buffer overflow")).toBeTruthy();
    expect(screen.getByText("Linux kernel privilege escalation")).toBeTruthy();
    expect(screen.queryByText("Weak TLS cipher suites enabled")).toBeNull();
  });

  it("shows an empty state when a search has no matches", async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = await screen.findByRole("textbox", {
      name: "Search findings",
    });
    await user.type(search, "nothing-matches-this");

    expect(
      await screen.findByText("No findings match these filters"),
    ).toBeTruthy();
  });

  it("marks a finding resolved and updates its row and summary", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByText("OpenSSL buffer overflow"));
    await user.click(screen.getByRole("button", { name: "Mark as resolved" }));

    const row = screen.getByRole("row", { name: /VUL-2841/ });
    expect(within(row).getByText("Resolved")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "VUL-2841 marked as resolved",
    );
    expect(
      screen.getByText("Critical findings").previousElementSibling.textContent,
    ).toBe("1");
  });
});
