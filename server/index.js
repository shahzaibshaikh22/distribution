

const  express  = require("express") ;
const  dotenv  = require("dotenv") ;
const  cors  = require("cors") ;
const  morgan  = require("morgan") ;


const PORT =  5000 || process.env.PORT;
const app =  express();
const  connect  = require("./database/database.js") ;
dotenv.config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
  }

// routes

// product routes
app.use("/api/v1/product", require("./routes/product/productType.js"))
// product routes

// brand routes
app.use("/api/v1/brand", require("./routes/product/brand.js"))
// brand routes

// category routes
app.use("/api/v1/category", require("./routes/product/category.js"))
// category routes


// subcategory routes
app.use("/api/v1/subcategory", require("./routes/product/subcategory.js"))
// subcategory routes


// units routes
app.use("/api/v1/unit", require("./routes/product/units.js"))
// units routes

// units routes
app.use("/api/v1/product", require("./routes/product/product.js"))
// units routes
// routes

connect()

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
