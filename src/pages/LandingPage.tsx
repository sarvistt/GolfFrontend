import SearchBar from "../components/SearchBar"

export const LandingPage = () => {
    return (
        <div className="bg-[url('./we.png')] bg-cover bg-top">
            <div className="min-h-screen flex flex-col text-white">
                <main className="container mx-auto px-6 pt-16 flex-1 text-center">
                    <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase">Where to Golf...</h2>
                    <h1 className="text-3xl md:text-6xl lg:text-8xl uppercase font-black mb-8">In Winnipeg!</h1>
                    <p className="text-base md:text-lg lg:text-2xl mb-8">A place for golfers to quickly find a course to play at!</p>
                    <SearchBar />
                </main>
            </div>
        </div>
    )
}