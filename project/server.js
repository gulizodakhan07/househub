// Iltimos terminalda npm run dev deb ishga tushiring
import bodyParser from "body-parser";
import express from "express";
import { engine } from "express-handlebars"
import path from "path";
import { appConfig } from "./config/app.config.js";
import { config } from "dotenv";
import { MongoDB } from "./config/mongo.config.js";
import { routes } from "./router/index.routes.js";
import './utils/cronJobs.js'
import { upload } from "./utils/multer.utils.js";



const app = express();

app.engine("hbs", engine({
  extname: '.hbs',
  defaultLayout: false
}));
app.set("view engine", "hbs")
app.set("views", path.join(process.cwd(), "project", "frontend", "views"));
config()
app.use("/public", express.static(path.join(process.cwd(), "frontend", "public")));
MongoDB()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home',{products});
});

// SignUp
app.get('/signup', (req, res) => {
  res.render('pages/signup', { title: 'Signup' });
});

// Signin
app.get('/signin', (req, res) => {
  res.render('pages/sigin', { title: 'Signin' });
});

// Sales 
app.get('/sales', (req, res) => {
  res.render('pages/sales', { title: 'Sales' });
});

// Rentals 
app.get('/rentals', (req, res) => {
  res.render('pages/rentals', { title: 'Rentals' });
});

// Forgot Password
app.get('/forgot-password', (req, res) => {
  res.render('pages/forgot-password', { title: 'Forgot Password' });
});

app.post('/add-listing', upload.array('images', 10), (req, res) => {
  const { title, description, price } = req.body;
  let products = []

  // Narxni tekshirish
  if (!title || !description || !price || isNaN(price) || price <= 0) {
      return res.status(400).render('add-listing', {
          errorMessage: 'All fields are required and price must be a valid number greater than 0.',
      });
  }

  // Yangi mahsulotni yaratish
  const newProduct = {
      title,
      description,
      price: parseFloat(price),
      images: req.files.map(file => file.path), // Rasmlar manzilini olish
      createdAt: new Date().toISOString() // Yaratilgan vaqt
  };

  // Mahsulotni saqlash (ro'yxatga qo'shish)
  products.push(newProduct); // Mahsulotni ro'yxatga qo'shish

  console.log(products); // Mahsulotlarni konsolga chiqarish
  res.redirect('/'); // Bosh sahifaga qaytish
});



app.use('/api/v1', routes)
async function startApp() {
  try {
    app.listen(appConfig.port, appConfig.host, () => console.log(`Server listening on port ${appConfig.port}`));
  } catch (error) {
    console.log(`Error on run server: ${error}`);
  }
}
startApp()

// app.all('*',(_,res)=>{
//   res.send({
//     message: 'Bunday API mavjud emas!'
//   })
// })

// #114 Setting new password for user

