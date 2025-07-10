import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import {LandingPage} from "./pages/LandingPage"
import {Search} from "./pages/Search"

function App() {
	return (
		<div className="">
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Router>
		</div>	
	)
}

export default App