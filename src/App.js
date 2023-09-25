import {BrowserRouter,  Routes, Route } from "react-router-dom";
import FormPage from "./components/formPage"
import ListPage from "./components/listPage"
import VideoPage from "./components/videoDisplay"

const App=()=>{
    return (<BrowserRouter>
    <Routes>
        <Route path="/" element={<FormPage/>}/>
        <Route path="/list" element= {<ListPage/>}/>
        <Route path="/video" element={<VideoPage/>}/>
    </Routes>
    </BrowserRouter>)
}

export default App