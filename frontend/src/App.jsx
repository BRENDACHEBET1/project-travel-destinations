import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About"
import Home from "./pages/Home"
import Destinations from "./pages/Destinations"
import DestinationDetails from "./pages/DestinationDetails"
import SavedDestinations from "./pages/SavedDestinations"
import Footer from "./components/Footer";


function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
       <Route
          path="/destinations/:country"
          element={<DestinationDetails />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/saved-destinations" element={<SavedDestinations />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}

export default App
