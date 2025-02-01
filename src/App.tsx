
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllRoute from "./Routes/Route";


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <div>
            <AllRoute />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

