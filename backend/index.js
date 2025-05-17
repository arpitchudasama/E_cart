const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb://localhost:27017/e-cart");

// API Creation

app.get("/", (req,res) => {
    res.send("Express App is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload endpoint for images
app.use('/images',express.static('upload/images'))

// API for uploading an image
app.post("/upload", upload.single('product'), (req,res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schemas 
const Product = mongoose.model("Product",{
    id:{type: Number, required: true},
    name:{type: String, required: true},
    image:{type: String, required: true},
    category:{type: String, required: true},
    new_price:{type: String, required: true},
    old_price:{type: String, required: true},
    date:{type: Date, default: Date.now},
    available:{type: Boolean, default: true},
})

const User = mongoose.model("User", {
    name:{type: String},
    email:{type: String, unique: true},
    password:{type: String},
    cartData:{type: Object},
    date:{type:Date, default: Date.now}
})

// API for adding a product
app.post('/add-product', async (req,res) => {
    let all_products = await Product.find({});
    let id;
    if(all_products.length > 0){
        let last_product_array = all_products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    console.log("Incoming product data:", req.body);
    await product.save();
    console.log("Incoming product data:", req.body);
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API for removing products
app.post('/remove-product', async (req,res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Product Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// API for getting all products
app.get('/all-products', async (req,res) => {
    let all_products = await Product.find({});
    console.log("All Products Fetched");
    res.send(all_products);
})

// API for getting new collection (8 recently added items)
app.get('/new-collection', async (req,res) => {
    let all_products = await Product.find({});
    let new_products = all_products.slice(1).slice(-8);
    console.log("New collection products fetched");
    res.send(new_products);
})

// API for getting popular items
app.get('/popular-phones', async (req,res) => {
    let all_products = await Product.find({category: "Phones"});
    let popular_phones = all_products.slice(0,4);
    console.log("Popular phones fetched");
    res.send(popular_phones);
})

// API endpoints for getting related phones, tablets, x` & Cloths devices
app.get('/related-phones', async (req,res) => {
    let phones = await Product.find({category: "Phones"});
    let related_phones = phones.slice(0,4);
    console.log("Related Phones Fetched");
    res.send(related_phones);
})

app.get('/related-tablets', async (req,res) => {
    let tablets = await Product.find({category: "Tablets"});
    let related_tablets = tablets.slice(0,4);
    console.log("Related Tablets Fetched");
    res.send(related_tablets);
})

app.get('/related-laptops', async (req,res) => {
    let laptops = await Product.find({category: "Laptops"});
    let related_laptops = laptops.slice(0,4);
    console.log("Related Laptops Fetched");
    res.send(related_laptops);
})

app.get('/related-Cloths', async (req,res) => {
    let Cloths = await Product.find({category: "Cloths"});
    let related_Cloths = Cloths.slice(0,4);
    console.log("Related Cloths Fetched");
    res.send(related_Cloths);
})

// Middleware API to fetch user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"});
    }else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({error: "Please authenticate using valid token"});
        }
    }
}

// API to get cartData
app.post('/getcart', fetchUser, async (req,res) => {
    console.log("Get Cart");
    console.log(req.body.id);
    console.log(req.user.id);
    let userData = await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

// API for adding items to cartData
app.post('/addtocart', fetchUser, async (req,res) => {
    // console.log(req.body, req.user);
    console.log("Added ", req.body.itemId);
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findByIdAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send("Added to Cart");
})

// API for removing items from cartData
app.post('/removefromcart', fetchUser, async (req,res) => {
    console.log("Removed ", req.body.itemId);
    let userData = await User.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send("Removed from Cart");
})

// API for registering user
app.post('/signup', async (req,res) => {
    let check = await User.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success: false, error: "Existing user found with same email address"});
    }
    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();
    
    const data = {
        user:{id: user.id}
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success: true, token});
})

// API for login
app.post('/login', async (req,res) => {
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passwordCompare = req.body.password === user.password;
        if(passwordCompare){
            const data = {user:{id: user.id}};
            const token = jwt.sign(data,'secret_ecom');
            res.json({success: true, token});
        }else{
            res.json({success: false, error: "Invalid Password"});
        }
    }else{
        res.json({success: false, error: "User does not exist"})
    }
})

app.listen(port, (error) => {
    if (!error){
        console.log("Server running on port " + port);
    }else{
        console.log("Error: " + error);
    }
});