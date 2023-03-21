import { MainLayout } from "./layouts"
import { Home } from "./pages"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
