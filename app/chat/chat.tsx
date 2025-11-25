import { createClient } from '~/utils/supabase.server'
import type { Route } from './+types/chat'

export async function loader({ request }: Route.LoaderArgs) {

    const { supabase } = createClient(request)

    const { data, error } = await supabase.auth.getUser()

    return { data, error }

}

export default function Chat({ loaderData }: Route.ComponentProps) {

    return <>
        Chat

        is auth? : {loaderData.data.user?.email}

        error : {loaderData.error?.message}

    </>
}