

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
app.use("/uploads", express.static("uploads"));

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

// setup
     app.use("/api/v1/vendor", require("./routes/setup/vendor.js"))
     app.use("/api/v1/warehouse", require("./routes/setup/warehouse.js"))
     app.use("/api/v1/customer", require("./routes/setup/customer.js"))
     app.use("/api/v1/staff", require("./routes/setup/staffcategory.js"))
     app.use("/api/v1/town", require("./routes/setup/town.js"))
     app.use("/api/v1/zone", require("./routes/setup/zone.js"))
     app.use("/api/v1/saleman", require("./routes/setup/saleman.js"))
     app.use("/api/v1/patty", require("./routes/setup/pattyexpence.js"))
     // setup
     
    //  puchase
     app.use("/api/v1/purchase", require("./routes/purchase/purchaseOrder.js"))
     app.use("/api/v1/return", require("./routes/purchase/purchasereturn.js"))
    //  puchase

// booking
app.use("/api/v1/order-booking", require("./routes/booking/booking.js"))
// booking

// payments
app.use("/api/v1/payment", require("./routes/payments/paytovendorRoute.js"))
app.use("/api/v1/payment-recieve", require("./routes/payments/recievepayment.js"))
app.use("/api/v1/journal-payment", require("./routes/payments/journalpayment.js"))
app.use("/api/v1/patty", require("./routes/payments/pattypayment.js"))
// payments
// routes



connect()

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
