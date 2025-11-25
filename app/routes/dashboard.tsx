export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Hallintapaneeli
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Tervetuloa hallintapaneeliin
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Tilastot
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                            0
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Aktiiviset istunnot
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Viestit
                        </h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                            0
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Lähetetyt viestit
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Käyttäjät
                        </h3>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                            1
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rekisteröityneet käyttäjät
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Nopeat toiminnot
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors">
                            Uusi projekti
                        </button>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors">
                            Asetukset
                        </button>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors">
                            Raportit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}