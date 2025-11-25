import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { createClient } from "./utils/supabase.server";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({request}: Route.LoaderArgs) {
  
  const url = new URL(request.url)

  // Poikkeukset tunnistautumiselle
  if(url.pathname === "/login" || url.pathname === "/register"){
    return
  }

  const {supabase} = createClient(request)

  const {data, error} = await supabase.auth.getSession()

  if(data.session == null){
    return redirect("/login")
  }

  return {isAuth: !!data.session}
}

export default function App({loaderData}:Route.ComponentProps) {

  return <>
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-900 dark:text-white font-semibold text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Koti
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Chat
            </Link>
            <Link 
              to="/dashboard" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Hallintapaneeli
            </Link>
          </div>
          <div>
            {loaderData?.isAuth ? (
              <Link 
                to="/logout" 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-lg transition-colors shadow-sm"
              >
                Kirjaudu ulos
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors shadow-sm"
              >
                Kirjaudu sisään
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
    <main className="min-h-[calc(100vh-4rem)] py-8">
      <Outlet />
    </main>
  </>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {message}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {details}
            </p>
          </div>
          {stack && (
            <div className="mt-6 text-left">
              <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tekninen tieto
                </summary>
                <pre className="w-full p-4 overflow-x-auto text-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  <code>{stack}</code>
                </pre>
              </details>
            </div>
          )}
          <div className="mt-8">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors"
            >
              Palaa etusivulle
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
