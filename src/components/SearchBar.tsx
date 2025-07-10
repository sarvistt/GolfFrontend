import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("6:00 am");
  const [holes, setHoles] = useState("9");
  const [players, setPlayers] = useState("2");

  const navigate = useNavigate()


const handleSearch = () => {
  navigate("/search?" + new URLSearchParams({
    date: date,
    startTime: startTime,
    holes: holes,
    players: players
  }).toString());
}

  return (
    <div className="max-w-5xl h-[75px] mx-auto bg-white rounded-full shadow-md flex items-center divide-x divide-gray-300 overflow-hidden p-1">

      <div className="flex-1 flex flex-col items-center hover:bg-gray-100 hover:cursor-pointer">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Date
        </label>
        <input
          type="date"
          className="outline-none text-gray-700 placeholder-gray-400 text-center"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex-1 flex flex-col items-center">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Time
        </label>
        <select className="outline-none text-gray-700 bg-white text-center"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Holes
        </label>
        <select className="outline-none text-gray-700 bg-white text-center"
          value={holes}
          onChange={(e) => setHoles(e.target.value)}
        >
          {["9", "18"].map((holes) => (
            <option key={holes} value={holes}>
              {holes}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Players
        </label>
        <select className="outline-none text-gray-700 bg-white text-center"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        >
          {["1", "2", "3", "4"].map((players) => (
            <option key={players} value={players}>
              {players}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-black hover:bg-green-500 p-3 rounded-full mr-2 flex items-center justify-center" onClick={handleSearch}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );

  function generateTimeOptions() {
    const times: string[] = []
    const startingTime: number = 6 * 60
    const endingTime: number = 19 * 60

    for (let i = startingTime; i <= endingTime; i += 15) {
      const hours = Math.floor(i / 60)
      const minutes = i % 60
      const period = hours >= 12 ? 'pm' : 'am'
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
      times.push(formattedTime)
    }

    return times
  }
}

// Search Bar TODO:
// - clean up general UI
// Make entire div clickable
// hover effects
// validation on inputs - might as well?
