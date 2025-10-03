import { Outlet } from 'react-router'
import Header from '../common/header/Header'
import Footer from '../common/footer/Footer'

const Layout = () => {
  return (
    <div>
      {/* Header */}
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
