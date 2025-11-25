import { beforeEach, describe, expect, test, vi } from "vitest";

import { loader as rootLoader } from "../root";
import { action as loginAction } from "../auth/login";

const mocked = vi.hoisted(() => {
  const getSessionMock = vi.fn();
  const signInWithPasswordMock = vi.fn();
  const createClientMock = vi.fn(() => ({
    supabase: {
      auth: {
        getSession: getSessionMock,
        signInWithPassword: signInWithPasswordMock,
      },
    },
    headers: new Headers([["Set-Cookie", "session=abc"]]),
  }));

  return { getSessionMock, signInWithPasswordMock, createClientMock };
});

vi.mock("../utils/supabase.server", () => ({
  createClient: mocked.createClientMock,
}));

const { getSessionMock, signInWithPasswordMock, createClientMock } = mocked;

beforeEach(() => {
  getSessionMock.mockReset();
  signInWithPasswordMock.mockReset();
  createClientMock.mockClear();
});

describe("root loader", () => {
  test("skips auth checks for login/register paths", async () => {
    const loginRequest = new Request("http://example.com/login");
    const registerRequest = new Request("http://example.com/register");

    expect(await rootLoader({ request: loginRequest } as any)).toBeUndefined();
    expect(
      await rootLoader({ request: registerRequest } as any),
    ).toBeUndefined();
    expect(createClientMock).not.toHaveBeenCalled();
  });

  test("redirects to /login when there is no active session", async () => {
    getSessionMock.mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });

    const request = new Request("http://example.com/dashboard");
    const response = (await rootLoader({ request } as any)) as Response;

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/login");
  });

  test("returns auth flag when session exists", async () => {
    getSessionMock.mockResolvedValueOnce({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });

    const request = new Request("http://example.com/dashboard");
    const data = await rootLoader({ request } as any);

    expect(data).toEqual({ isAuth: true });
  });
});

describe("login action", () => {
  test("redirects to /chat on successful login and forwards Set-Cookie header", async () => {
    signInWithPasswordMock.mockResolvedValueOnce({
      data: { user: { id: "user-1", email: "a@example.com" } },
      error: null,
    });

    const request = new Request("http://example.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        email: "a@example.com",
        password: "secret",
      }),
    });

    const response = (await loginAction({ request } as any)) as Response;

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/chat");
    expect(response.headers.get("Set-Cookie")).toBe("session=abc");
    expect(signInWithPasswordMock).toHaveBeenCalledWith({
      email: "a@example.com",
      password: "secret",
    });
  });

  test("returns error payload when sign-in fails", async () => {
    const error = { message: "Invalid credentials" };
    signInWithPasswordMock.mockResolvedValueOnce({
      data: { user: null },
      error,
    });

    const request = new Request("http://example.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        email: "bad@example.com",
        password: "wrong",
      }),
    });

    const result = await loginAction({ request } as any);
    expect(result).toEqual({ error });
    expect(signInWithPasswordMock).toHaveBeenCalled();
  });
});
