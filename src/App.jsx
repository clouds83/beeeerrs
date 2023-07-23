import { Outlet } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
