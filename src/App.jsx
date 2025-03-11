import Layout from "./Layout"
import { Route,Routes } from "react-router"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        
        </Route>
      </Routes>
    </>
  )

}

export default App
