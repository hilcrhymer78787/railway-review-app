import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RecoilRoot } from "recoil";
import theme from "../src/plugins/theme";
import Index from "./page"
import Login from "../src/page/login"
import Signup from "./page/login/Signup"
import Books from "./page/books"
import './App.css';
function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/login/signup" element={<Signup />}></Route>
            <Route path="/books" element={<Books />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
