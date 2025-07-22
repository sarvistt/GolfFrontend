import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar({initialDate, initialStartTime, initialHoles, initialPlayers}: {initialDate?: string, initialStartTime?: string, initialHoles?: string, initialPlayers?: string}) {


  const [date, setDate] = useState(initialDate ?? new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState(initialStartTime ?? "6:00 am");
  const [holes, setHoles] = useState(initialHoles ?? "9");
  const [players, setPlayers] = useState(initialPlayers ?? "2");
  

  const navigate = useNavigate()

   const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const lastClick = localStorage.getItem("searchButtonLastClick");
    if (lastClick) {
      const diff = Date.now() - parseInt(lastClick, 10);
      if (diff < 120000) {
        setDisabled(true);
        const timeout = setTimeout(() => setDisabled(false), 120000 - diff);
        return () => clearTimeout(timeout);
      }
    }
  }, []);


const handleSearch = () => {
    if (disabled) return;
    localStorage.setItem("searchButtonLastClick", Date.now().toString());
    setDisabled(true);
    setTimeout(() => setDisabled(false), 120000);

    // ...existing search logic...
    const searchParams = new URLSearchParams({
      date: date,
      startTime: startTime,
      holes: holes,
      players: players,
    }).toString();

    if (window.location.pathname === "/search") {
      navigate(`/search?${searchParams}`, { replace: true });
      navigate(0);
    } else {
      navigate(`/search?${searchParams}`);
    }
  };

  return (
    <div
      className="max-w-5xl h-[75px] mx-auto bg-white rounded-full flex items-center divide-x divide-gray-300 overflow-hidden "
      style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="group flex-1 flex flex-col h-full w-full justify-center hover:bg-gray-100">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Date
        </label>
        <input
          type="date"
          className="outline-none mx-auto flex text-gray-700 placeholder-gray-400 text-center group-hover:bg-gray-100 group-hover:cursor-pointer"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Today
          max={new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0]} // A week from today
        />
      </div>

      <div className="group flex-1 flex flex-col h-full w-full justify-center hover:bg-gray-100 items-center">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Time
        </label>
        <select className="outline-none text-gray-700 bg-white text-center group-hover:bg-gray-100 group-hover:cursor-pointer"
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

      <div className="group flex-1 flex h-full w-full flex-col justify-center items-center hover:bg-gray-100">
        <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
          Holes
        </label>
        <select className="outline-none text-gray-700 bg-white text-center group-hover:bg-gray-100 group-hover:cursor-pointer"
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
      
      <div className="group flex flex-1 h-full hover:bg-gray-100">
        <div className=" group flex-1 flex h-full w-full flex-col justify-center items-center hover:bg-gray-100 hover:rounded-tr-lg">
          <label className="block text-sm font-semibold text-gray-500 uppercase text-center mb-1">
            Players
          </label>
          <select className="outline-none text-gray-700 bg-white text-center group-hover:bg-gray-100 group-hover:cursor-pointer"
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
            className={`bg-black hover:bg-emerald-500 h-1/2 w-1/5 my-auto text-white p-3 rounded-full mr-2 flex items-center justify-center ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSearch}
            disabled={disabled}
          >
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