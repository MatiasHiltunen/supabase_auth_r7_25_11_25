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




    return <>
    
        <Form style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
        }} action="/register" method="post">
                <label>Sähköposti</label>
                <input name="email" type="email" /> 
                <label>Salasana</label>
                <input onChange={(e) => setPassword(e, 'password')} name="password" type="password" />
                <label>Vahvista salasana</label>
                <input onChange={(e) => setPassword(e, 'confirm')} name="confirm" type="password" />

                <button disabled={!isMatch}>Rekisteröidy</button>


        </Form>
    
    </>
}