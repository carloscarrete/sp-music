
export const PlayerScreen = () => {
    return (
        <main className="bg-black flex-1 p-2">
            <div className="bg-zinc-900 flex h-screen rounded-xl p-4">
                <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-min">
                    <div className="h-40 w-40 bg-black auto-cols-fr" />
                    <div className="h-40 w-40 bg-black auto-cols-fr" />
                    <div className="h-40 w-40 bg-black auto-cols-fr" />
                    <div className="h-40 w-40 bg-black auto-cols-fr" />
                    <div className="h-40 w-40 bg-black auto-cols-fr" />
                    <div className="h-40 w-40 bg-black auto-cols-fr" />
                </div>
            </div>
        </main>)
}
