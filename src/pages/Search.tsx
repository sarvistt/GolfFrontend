import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

import LoadingScreen from "../components/LoadingScreen"
import SearchBar from "../components/SearchBar"
import Table from "../components/Table"

import { useGolfApi } from "../hooks/useGolfApi"

export const Search = () => {
    const {data, isLoading} = useGolfApi<any[]>()

    const [searchParams] = useSearchParams();
    const [fadeOut, setFadeOut] = useState(false);

    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const startTime = searchParams.get("startTime") || "6:00 am";
    const holes = searchParams.get("holes") || "9";
    const players = searchParams.get("players") || "2";

    const mockData = [
        {club: "Canoe Club", price: 50, time: "6:00 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 2", price: 60, time: "6:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 3", price: 70, time: "7:00 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
        {club: "Mock Data 4", price: 80, time: "7:30 am", url: "/course/canoe-club", tags: ['9 holes', '2 players']},
    ]

    useEffect(() => {
        if (!isLoading) {
            setFadeOut(true);
        } else {
            setFadeOut(false);
        }
    }, [isLoading]);

    return (
        <div className="min-h-screen bg-[url('./we3.png')] bg-cover bg-top">
            {isLoading ? (
                <div className={`transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
                    <LoadingScreen />
                </div>
            ) : (
                <div className="p-6 h-screen transition-opacity duration-500 opacity-100">
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <SearchBar initialDate={date} initialStartTime={startTime} initialHoles={holes} initialPlayers={players}  />
                        </div>
                        <div className="w-full flex flex-col items-center rounded-lg p-4">
                            <Table data={data} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}