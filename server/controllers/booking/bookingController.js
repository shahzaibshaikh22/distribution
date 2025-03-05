const OrderBooking = require("../../models/booking/orderbooking")
const Inventory = require("../../models/inventory/inventory")
const OrderDetail = require("../../models/booking/OrderDetails");
const CustomerDue = require("../../models/customerDues/customerdues")

// Create a new order booking
// const createBooking = async (req, res) => {
//     try {
//       const {
//         customer,
//         products,
//         totalQuantity,
//         totalAmount,
//         netPayableAmount,
//         paymentType,
//         deliveryCharges,
//         extraCharges,
//         changeAmount,
//       } = req.body;

//       // Booking create karne se pehle inventory update karni hogi
//       for (const item of products) {
//         const product = await Inventory.findById(item.product);
//         if (!product) {
//           return res.status(400).json({ msg: `Product with ID ${item.product} not found` });
//         }

//         if (product.quantity < item.quantity) {
//           return res.status(400).json({ msg: `Not enough quantity for product: ${product.productname}` });
//         }

//         // Inventory update karein
//         product.quantity -= item.quantity;
//         await product.save();
//       }

//       // Order Booking create karein
//       const newBooking = new OrderBooking({
//         customer,
//         products,
//         totalQuantity,
//         totalAmount,
//         netPayableAmount,
//         paymentType,
//         deliveryCharges,
//         extraCharges,
//         changeAmount,
//       });

//       await newBooking.save();
//       res.status(201).json({ msg: "Order booked successfully"});
//     } catch (error) {
//       res.status(500).json({  msg: "Failed to book order", err: error.message });
//     }
//   };
// const createBooking = async (req, res) => {
//     try {
//       const {
//         customer,
//         products,
//         totalQuantity,
//         totalAmount,
//         netPayableAmount,
//         paymentType,
//         deliveryCharges,
//         extraCharges,
//         changeAmount,
//         bookingOrderNo
//       } = req.body;

//       // Inventory update karne ke liye loop
//       for (const item of products) {
//         const inventory = await Inventory.findOne({ "products.product": item.product });

//         if (!inventory) {
//           return res.status(400).json({ msg: `Product with ID ${item.product} not found in inventory` });
//         }

//         // Inventory ke andar product find karein
//         const productIndex = inventory.products.findIndex(p => p.product.toString() === item.product);

//         if (productIndex === -1) {
//           return res.status(400).json({ msg: `Product not found in inventory` });
//         }

//         if (inventory.products[productIndex].quantity < item.quantity) {
//           return res.status(400).json({ msg: `Not enough quantity for product: ${inventory.products[productIndex].productname}` });
//         }

//         // Inventory update karein
//         inventory.products[productIndex].quantity -= item.quantity;

//         await inventory.save();
//       }

//       // Order Booking create karein
//       const newBooking = new OrderBooking({
//         customer,
//         bookingOrderNo,
//         products,
//         totalQuantity,
//         totalAmount,
//         netPayableAmount,
//         paymentType,
//         deliveryCharges,
//         extraCharges,
//         changeAmount,
//       });

//       await newBooking.save();
//       res.status(201).json({ msg: "Order booked successfully" });

//     } catch (error) {
//       res.status(500).json({ msg: "Failed to book order", err: error.message });
//     }
//   };


// Get all bookings
// const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await OrderBooking.find().sort({ createdAt: -1 }).populate({
//       path: "products.product",
//       select: 'productname image brand category costprice'
//     })
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// };

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await OrderBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch booking", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await OrderBooking.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "products.product",
        select: "productname image brand category costprice",
      })
      .populate({
        path: "customer", 
        select: "name", 
      });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};


// Update booking by ID
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await OrderBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking updated successfully", data: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update booking", error: error.message });
  }
};

// Delete booking by ID
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await OrderBooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ err: "Booking not found" });
    }
    res.status(200).json({ msg: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete booking" });
  }
};

// status delivered
// const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await OrderBooking.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ err: "Booking not found" });
//     }

//     // const validStatuses = ["in process", "ready to ship", "delivered", "completed"];
//     // const newStatus = req.body.status;

//     // if (!validStatuses.includes(newStatus)) {
//     //   return res.status(400).json({ err: "Invalid status" });
//     // }
//     if(order.step === 1){
//       order.step = 2
//       order.status = "in process"
//       await order.save();
//       res.status(200).json({ msg: `Booking Order status updated successfully` });
//     }
//     else if(order.step === 2){
//       order.step = 3
//       order.status = "ready to ship"
//       await order.save();
//       res.status(200).json({ msg: `Booking Order status updated successfully` });
//     }
//     else if(order.step === 3){
//       order.step = 4
//       order.status = "delivered"
//       await order.save();
//       res.status(200).json({ msg: `Booking Order status updated successfully` });
//     }
//    else if(order.step === 4){
//       order.step = 5
//       order.status = "completed"
//       await order.save();
//       res.status(200).json({ msg: `Booking Order status updated successfully` });
//     }
//     else{
//       return res.json({msg:"cant update"})
//     }


//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// };

const createBooking = async (req, res) => {
  try {
    const {
      customer,
      products,
      totalQuantity,
      totalAmount,
      netPayableAmount,
      paymentType,
      deliveryCharges,
      extraCharges,
      changeAmount,
      bono
    } = req.body;

    // Order Booking create karein
    const newBooking = new OrderBooking({
      customer,
      bono,
      products,
      totalQuantity,
      totalAmount,
      netPayableAmount,
      paymentType,
      deliveryCharges,
      extraCharges,
      changeAmount,
      step: 1,  
      status: "pending"
    });

    await newBooking.save();
    res.status(201).json({ msg: "Order booked successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Failed to book order", err: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await OrderBooking.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ err: "Booking not found" });
    }
    if (order.step === 1) {
      order.step = 2;
      order.status = "in process";
    }
    else if (order.step === 2) {
      order.step = 3;
      order.status = "ready to ship";
    }
    else if (order.step === 3) {
      order.step = 4;
      order.status = "delivered";

      const customerdue = new CustomerDue({
        customer:order.customer,
        bono:order.bono,
        totalAmount:order.totalAmount,
        paymentType:order.paymentType,
        products:order.products,
        createdAt:order.createdAt,
      });
      await customerdue.save()
      for (const item of order.products) {

        const inventory = await Inventory.findOne({ "products.product": item.product });

        if (!inventory) {
          return res.status(400).json({ msg: `Product with ID ${item.product} not found in inventory` });
        }

        const productIndex = inventory.products.findIndex(p => p.product.toString() === item.product.toString());


        if (productIndex === -1) {
          return res.status(400).json({ msg: `Product not found in inventory` });
        }

        if (inventory.products[productIndex].quantity < item.quantity) {
          return res.status(400).json({ msg: `Not enough quantity for product: ${inventory.products[productIndex].productname}` });
        }

        inventory.products[productIndex].quantity -= item.quantity;

        await inventory.save();
      }

    }
    else if (order.step === 4) {
      order.step = 5;
      order.status = "completed";
    }
    else {
      return res.json({ msg: "Can't update further" });
    }

    await order.save();
    res.status(200).json({ msg: `Booking Order status updated successfully` });

  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// order Summary

const createOrderDetail = async (req, res) => {
  try {
    const { responsiblePerson, driverName, vehicleNo, orderId } = req.body;
    const existingOrder = await OrderDetail.findOne({ orderId });

if (existingOrder) {
  throw new Error("This orderId already exists! Duplicate entries are not allowed.");
}

   if(!existingOrder){
    const newsummary = new OrderDetail({
      responsiblePerson,
      driverName,
      vehicleNo,
      orderId,
    });

    await newsummary.save();
    res.status(201).json({ msg: "Booking saved successfully!" });
   }
  } catch (error) {
    res.json({ err: error.message });
  }
};


// get customers dues
const getBookingOrderByCustomerId = async (req, res) => {
  try {
    const { customer } = req.params
    const bookingorders = await CustomerDue.find({customer,paymentType: "credit"}).populate({
      path: "products.product",
      select: "productname image brand category costprice", 
    })
    .populate({
      path: "customer", 
      select: "name email address", 
    });
    if(!bookingorders){
      return res.json({msg:"not found"})
    }
      return res.json(bookingorders);
  } catch (error) {
    return res.json({ err: error.message });
  }
};







module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateOrderStatus,
  createOrderDetail,
  getBookingOrderByCustomerId
}
