import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    product: { type: String, required: true, maxlength: 100 },
    price: { type: Number, required: true, maxlength: 400 },
    whatsapp: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true,  maxlength: 1000 }
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema   )

//6POVWdddYpQud1ky
//mongodb+srv://iagopinheirodeoliveira:<password>@core-notes.znesuia.mongodb.net/?retryWrites=true&w=majority