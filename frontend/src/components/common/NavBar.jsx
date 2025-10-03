import { NavLink } from "react-router";

const NavBar = () => {

    // const {navigator} = useParams()

    const toPath =(label)=>{
        return label ==="Home"? '/': `/${label.toLowerCase().replace(/\s+/g, "-")}`

    }

    const data = ['Home',"Hot Deals","Categories","Laptops","Smartphones","Cameras","Accessories"]
    const renderitems = (items, index) =>{
        return <li className="cursor-pointer" key={index}>
            <NavLink
              to={toPath(items)}    
              className={({ isActive }) =>
                `cursor-pointer px-2 py-1 rounded ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
              }
            >
                 {items}
            </NavLink>
            </li>
    }
  return (
    <nav className='w-full h-[55px] flex justify-start items-center '>
       <ul className="flex gap-2">
        {data.map(renderitems)}
       </ul>
    </nav>
  );
};

export default  NavBar;