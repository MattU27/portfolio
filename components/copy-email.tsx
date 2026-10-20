"use client";
import { useState } from "react";
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied to clipboard.");
    } catch {
      setStatus(
        "Couldn’t copy. Use the email link or select the address above.",
      );
    }
  }
  return (
    <div className="copy-control">
      <button
        type="button"
        className="button button-outline"
        onClick={copyEmail}
      >
        Copy email <span aria-hidden="true">⧉</span>
      </button>
      <p role="status" aria-live="polite" className="copy-status">
        {status}
      </p>
    </div>
  );
}
