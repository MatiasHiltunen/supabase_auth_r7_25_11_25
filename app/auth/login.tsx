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



    return <>
    
        <div>

            {actionData?.error && <h1> {actionData.error.message} </h1> }

            <Form action="/login" method="post">

                <input name="email" type="email" />
                
                <input name="password" type="password" />

                <button>Kirjaudu sisään</button>

            </Form>



        </div>

    
    </>


}