import { Link, redirect } from "react-router";
import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/logout";

export async function loader({ request }: Route.LoaderArgs) {

    const { supabase, headers } = createClient(request)

    const { error } = await supabase.auth.signOut()

    console.log(error)

    return redirect("/login", {
        headers,
    })
}

export function Logout() {

    return <>



        <Link to={"/login"}> Kirjaudu sisään uudelleen</Link>

    </>

}