import mongoose from "mongoose";

const computerSchema = mongoose.Schema({
    image: { type: String, required: true }

},
{
    timestamps:true
})

const computerModel = mongoose.model
("computers", computerSchema)

export default computerModel