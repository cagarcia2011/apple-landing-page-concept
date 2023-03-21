import { MainLayout } from "./layouts"
import { Home } from "./pages"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import {AiOutlineApple} from 'react-icons/ai'

function App() {

  return (
    <div className="App">
      <Helmet>
        <link rel="manifest" href="manifest.json" />
      </Helmet>
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
