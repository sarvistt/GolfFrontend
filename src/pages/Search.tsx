import { useSearchParams } from "react-router-dom"

export const Search = () => {
    const [searchParams] = useSearchParams();

    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const startTime = searchParams.get("startTime") || "6:00 am";
    const holes = searchParams.get("holes") || "9";
    const players = searchParams.get("players") || "2";

    return (
        <div>
            <h1>Search Results</h1>
            <p>Date: {date}</p>
            <p>Start Time: {startTime}</p>
            <p>Holes: {holes}</p>
            <p>Players: {players}</p>
        </div>
    )
}