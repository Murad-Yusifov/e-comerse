
import './assets/styles/App.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes'
import { AuthProvider } from './context/authContext'

function App() {

  return (
<AuthProvider>
  <RouterProvider router={router}/>
</AuthProvider>

  )
}

export default App
