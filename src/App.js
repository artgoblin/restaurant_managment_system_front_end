import Navbar from "./Navbar"
import Pricing from "./pages/Pricing"
import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import About from "./pages/About"
import { Route, Routes } from "react-router-dom"
import theme from "../src/utils/theme";
import { makeStyles } from "@material-ui/core";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#6D7183",
      outline: "10px solid slategrey",
    },
  },
  mainBackground: {
    background: theme.palette.primary.main,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

function App() {
  console.log("theme", theme);
  const classes = useStyles();

  return (
    <>
  
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Order" element={<LandingPage />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App