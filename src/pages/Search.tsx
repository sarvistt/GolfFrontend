import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

import LoadingScreen from "../components/LoadingScreen"
import SearchBar from "../components/SearchBar"
import SearchResult from "../components/SearchResult"
import SortFields from "../components/SortFields"

export const Search = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const startTime = searchParams.get("startTime") || "6:00 am";
    const holes = searchParams.get("holes") || "9";
    const players = searchParams.get("players") || "2";

    const mockData = [
        {club: "Canoe Club", price: 50, time: "6:00 am"},
        {club: "Mock Data 2", price: 60, time: "6:30 am"},
        {club: "Mock Data 3", price: 70, time: "7:00 am"},
        {club: "Mock Data 4", price: 80, time: "7:30 am"},
    ]



    // Mimic API call start
    const wait5seconds = () => {
        return new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            setLoading(false)
        });
    }
    useEffect(() => {
        wait5seconds();
    }, []);
    // Mimic API call end


    return (
        <div>
            { loading ? <div> 
                <LoadingScreen />
            </div> 
            
            : 
            <div className="p-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 bg-red-100 h-fit">
                        <SearchBar />
                    </div>
                    <div className="col-span-5 bg-green-100 flex justify-center">3</div>
                    <div className="col-span-5 row-span-3 bg-orange-100 flex flex-col items-center gap-4">
                        {mockData.map((data, index) => {
                            return (
                                <SearchResult key={index} title={data.club} price={data.price} time={data.time}/>
                            )
                        })}
                    </div>
                </div>
            </div>}
            
        </div>
    )
}