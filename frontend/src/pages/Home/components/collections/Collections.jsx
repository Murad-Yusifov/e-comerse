import Camera from "./Camera";
import EarPhone from "./EarPhone";
import LaptobCol from "./LaptobCol";

const Collections = () => {
  return (
    <div className='w-full h-1/8 flex'>

      <ul className="w-full flex justify-around items-center gap-4 *:w-1/3 *:h-[200px] *:border ">
        <li>
       <LaptobCol/>

        </li>
        <li>

       <EarPhone/>
        </li>
        <li>

       <Camera/>
        </li>
      </ul>
    </div>
  );
};

export default  Collections;