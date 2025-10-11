import computerModel from "../models/computerModel.js";

const getComputer = async (req, res) => {
    try {
        const products = await computerModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}

const postComputer = async (req, res)=>{
    try {
        const {image}  = req.body
        const newComputer = await computerModel.create({image})
        res.json(newComputer)
        console.log("Post Body:", res.body)
        
        
    } catch (error) {
        res.status(500)
        .json({message:"Model elave edilerken xeta bash verdi", error})

        
    }
}


const deleteComputer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComputer = await computerModel.findByIdAndDelete(id);
        if (!deletedComputer) {
            return res.status(404).json({
                message: "Product couldn't be found"
            });
        }
        res.json({ message: `${id} data is deleted` });
    } catch (error) {
        res.status(500).json({ message: "While deleting, an error occurred", error });
    }
}


export {getComputer, deleteComputer, postComputer}