import Collections from './components/collections/Collections'
import SendMail from './components/common/SendMail'
import NavBar from '../../components/common/NavBAr'

const Home = () => {
  return (<>
  
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
      {/* Collections that are exist in all the row */}
      <Collections/>
      {/* Send Mail */}
      <SendMail/>
    </div>
  </>
  )
}

export default Home
