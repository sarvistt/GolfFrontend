import loadingFactsJson from "../assets/loadingfacts.json"
import { useEffect, useState } from "react"

type LoadingFactsType = Record<string, string>;
const loadingFacts: LoadingFactsType = loadingFactsJson;

export default function LoadingScreen() {
    const keys = Object.keys(loadingFacts) as Array<keyof LoadingFactsType>;
    const [currentIdx, setCurrentIdx] = useState(() => Math.floor(Math.random() * keys.length));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % keys.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [keys.length]);

    const fact = loadingFacts[keys[currentIdx]];



    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full animate-bounce"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, #ffffff, #cccccc)',
                    boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.2), inset 2px 2px 6px rgba(255,255,255,0.3)'
                }}>
            </div>
            <div className="mt-4 text-white text-2xl font-sans">
                Fun Fact: {fact}
            </div>
        </div>
    )
}