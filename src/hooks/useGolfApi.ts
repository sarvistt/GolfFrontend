import { useQuery } from "@tanstack/react-query"
import Axios from "axios"

const url = "http://127.0.0.1:8000/courses"

export const useGolfApi = <T>() => {
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["GolfApiData"],
        queryFn: () => Axios.post(url, {
            date: "Thursday, Jul 24",
            search_time: "6:00 am",
            holes: "9",
            players: "2"
        }).then((response : any) => response.data),
    })

    const refetchData = () => {
        refetch()
    }

    if (error) {
        console.error("Error fetching data:", error)
    }

    return {
        data: data as T,
        isLoading
    }
}