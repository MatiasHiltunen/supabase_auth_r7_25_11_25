import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { createClient } from "~/utils/supabase.server";

export async function action({request}:Route.ActionArgs){
    
    const formData = await request.formData()

    // Tapa 1
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const {supabase, headers} = createClient(request)

    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    console.log("UserData in login: ", data.user)

    if(!error){
        return redirect("/chat", {headers})
    }
    // Actionissa pelkkä return lataa sivun uudelleen ja palauttaa actionDatassa olevat tiedot
    return {error}

    // Tapa 2
    /* const data = Object.fromEntries(formData) as {email: string, password: string}

    const {supabase} = createClient(request)

    supabase.auth.signInWithPassword(data) */

}

export default function Login({actionData}: Route.ComponentProps){

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Kirjaudu sisään
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Tervetuloa takaisin
                    </p>

                    {actionData?.error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                                {actionData.error.message}
                            </p>
                        </div>
                    )}

                    <Form action="/login" method="post" className="space-y-6">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Sähköposti
                            </label>
                            <input 
                                id="email"
                                name="email" 
                                type="email" 
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                                placeholder="nimi@esimerkki.fi"
                            />
                        </div>
                        
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Salasana
                            </label>
                            <input 
                                id="password"
                                name="password" 
                                type="password" 
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                                placeholder="••••••••"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Kirjaudu sisään
                        </button>
                    </Form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Eikö sinulla ole tiliä?{" "}
                            <a 
                                href="/register" 
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                                Rekisteröidy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}