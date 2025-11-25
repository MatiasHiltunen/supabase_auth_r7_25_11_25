import { Form, redirect } from "react-router";
import type { Route } from "./+types/register";
import { useState, type ChangeEvent } from "react";
import { createClient } from "~/utils/supabase.server";


export async function action({request}:Route.ActionArgs) {

    const formData = await request.formData()

    const email = formData.get("email") as string
    const password = formData.get("password") as string


    const {supabase} = createClient(request)

    const {data, error} = await supabase.auth.signUp({
        email,
        password
    })

    console.log("UserData in register: ", data.user)

    if(!error){
        return redirect("/login")
    }

}

export default function Register() {

    const [passwordFields, setPasswordFields] = useState({
        password: "",
        confirm: ""
    })

    const [isMatch, setIsMatch] = useState(false)

    const setPassword = (e: ChangeEvent<HTMLInputElement>, field: "password" | "confirm") => {

        setPasswordFields((current)=> {

            current[field] = e.target.value

            setIsMatch(() => current.password != null && current.password === current.confirm)

            return {...current}
        })

    }




    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Rekisteröidy
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Luo uusi tili
                    </p>

                    <Form action="/register" method="post" className="space-y-6">
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
                                onChange={(e) => setPassword(e, 'password')} 
                                name="password" 
                                type="password" 
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="confirm"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Vahvista salasana
                            </label>
                            <input 
                                id="confirm"
                                onChange={(e) => setPassword(e, 'confirm')} 
                                name="confirm" 
                                type="password" 
                                required
                                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
                                    passwordFields.confirm && !isMatch 
                                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                                        : passwordFields.confirm && isMatch
                                        ? 'border-green-300 dark:border-green-600 focus:ring-green-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                }`}
                                placeholder="••••••••"
                            />
                            {passwordFields.confirm && !isMatch && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    Salasanat eivät täsmää
                                </p>
                            )}
                            {passwordFields.confirm && isMatch && (
                                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    Salasanat täsmäävät
                                </p>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={!isMatch}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 dark:disabled:hover:bg-blue-700"
                        >
                            Rekisteröidy
                        </button>
                    </Form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Onko sinulla jo tili?{" "}
                            <a 
                                href="/login" 
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                                Kirjaudu sisään
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}