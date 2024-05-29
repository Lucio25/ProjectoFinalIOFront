import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import NavBar from './Components/NavBar/NavBar';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>
      <Router>
        <AppRoutes/>
      </Router>
    </>
  )
}

export default App
