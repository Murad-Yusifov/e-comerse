import Top from './Top'
import logo from "../../../assets/images/logo.png"; 
import NavBar from '../NavBAr';

const Header = () => {
  return (
    <>
      {/* Top of The header */}
      <Top/>
      <div className='flex justify-around items-center p-1'>
        {/* Header, add to basket, liket products, search in the middle and the logo on the left side. */}
       <img src={logo} alt="logo" className="" />
        {/* seacrch the data */}
        <label htmlFor="search" className='border flex justify-between w-1/4 p-2'>
          <input type="text" id='search' placeholder='write something here' min={5} max={15} width={300} className='border-0 outline-0' />
          <button className='burder cursor-pointer'>
            Search
          </button>
        </label>

        <div className="w-1/4 flex justify-around">
          <span>whishes
            <sup>{'0'}</sup>
          </span>
          <span>shop cart
            <sup>{`0`}</sup>
          </span>
        </div>
      </div>
      <NavBar/>
    </>
  )
}

export default Header
