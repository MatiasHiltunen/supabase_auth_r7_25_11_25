import { createClient } from '~/utils/supabase.server'
import type { Route } from './+types/chat'

export async function loader({ request }: Route.LoaderArgs) {

    const { supabase } = createClient(request)

    const { data, error } = await supabase.auth.getUser()

    return { data, error }

}

export default function Chat({ loaderData }: Route.ComponentProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Chat
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Viesti muiden käyttäjien kanssa
                </p>

                {loaderData.error ? (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-800 dark:text-red-200 font-medium">
                                Virhe: {loaderData.error.message}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Chat-huone
                                    </h2>
                                    {loaderData.data.user && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Kirjautunut: <span className="font-medium text-blue-600 dark:text-blue-400">{loaderData.data.user.email}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Chat-toiminnallisuus tulossa pian...
                                </p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Kirjoita viesti..."
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled
                                />
                                <button
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled
                                >
                                    Lähetä
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}