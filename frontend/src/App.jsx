
import './assets/styles/App.css'
import { RouterProvider } from 'react-router'
import { data } from './routes/AppRouter'

function App() {

  return (

    <RouterProvider router={data}/>

  )
}

export default App
