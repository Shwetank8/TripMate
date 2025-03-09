import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
        <>
          <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/create-trip" element={<CreateTrip/>} />
              <Route path="/view-trip/:id" element={<ViewTrip/>} />
            </Routes>
          </Router>
          </ThemeProvider>
        </>
  );
}
export default App;