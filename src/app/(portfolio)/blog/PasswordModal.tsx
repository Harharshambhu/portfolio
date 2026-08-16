"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { checkBlogPassword } from "./unlock/actions";

export default function PasswordModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(false), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const ok = await checkBlogPassword(password);
      if (ok) {
        onSuccess();
      } else {
        setError(true);
        setPassword("");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(14, 21, 37, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-4 w-full max-w-sm rounded-sm px-8 pt-8 pb-6"
        style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="text-lg font-medium text-center"
          style={{ color: "var(--foreground)" }}
        >
          Do you have a Entry Pass
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            required
            className={`flex h-[42px] w-full rounded-md px-6 py-2 text-base text-black bg-white text-center focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-black transition-colors ${error ? "placeholder:text-red-500" : "placeholder:text-gray-500"}`}
            placeholder={error ? "turn around" : "Enter password"}
          />
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center w-32 mx-auto px-6 py-2.5 text-sm font-sans font-bold uppercase tracking-tight rounded-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: "var(--accent-neon)", color: "var(--foreground)" }}
          >
            {isPending ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
