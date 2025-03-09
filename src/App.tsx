import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import Header from "./components/Header";

function App() {
  return (
        <>
          
          <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/create-trip" element={<CreateTrip/>} />
              <Route path="/view-trip/:id" element={<ViewTrip/>} />
            </Routes>
          </Router>
        </>
  );
}
export default App;