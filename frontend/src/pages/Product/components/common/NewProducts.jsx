import { newProducts } from "../../../../utils/data";

const NewProducts = () => {
  return (
    <div className=' '>
       {newProducts.map(items=>(
        <div key={items.key} className="mb-2">
          <h1>{items.name}</h1>
          <ul>
            <li>{items.key}</li>
          </ul>
        </div>
       ))}
    </div>
  );
};

export default  NewProducts;