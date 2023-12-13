const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const app = express();
//Midleware
app.use(express.json());
app.use(cors());

dontenv.config();

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    info: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchema);

//Get All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


//Get Product by Id
app.get("/product/:id", async (req, res) => {
  try {
    const product=await Products.findById(req.params.id)
    res.send(product)
  } catch (error) {
    res.status(500).json({message:error})
  }
});

//Add Product
app.post("/products", (req, res) => {
  const product = new Products({
    title: req.body.title,
    info: req.body.info,
    price: req.body.price,
    image: req.body.image,
  });
  product.save();
  res.send({ message: "product added" });
});


//Delete Product
app.delete('/product/:id', async (req,res)=>{
  try {
    await Products.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'product deleted'})
  } catch (error) {
    res.status(500).json({message:error})
  }
})


//Update Product
app.put('/product/:id', async (req,res)=>{
  const {id}=req.params
  try {
    const updatedProduct= await Products.findByIdAndUpdate(id,req.body)
    res.send(updatedProduct)
  } catch (error) {
    res.status(500).json({message:error})
  }
})


const PORT = process.env.PORT;
const url = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(url).catch((err) => console.log("db not connect " + err));

app.listen(PORT, () => {
  console.log("Server is running");
});
