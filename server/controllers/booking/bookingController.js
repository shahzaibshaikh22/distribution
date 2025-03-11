const OrderBooking = require("../../models/booking/orderbooking")
const Inventory = require("../../models/inventory/inventory")
const OrderDetail = require("../../models/booking/OrderDetails");
const CustomerDue = require("../../models/customerDues/customerdues")
const OrderBookingReturn = require("../../models/booking/orderReturn")
const mongoose = require("mongoose")

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

// create Order return
const OrderReturn = async (req, res) => {
  try {
      const { bono, products, customer, totalAmount } = req.body;

      // Log incoming request for debugging
      console.log("Received req.body:", req.body);

      // Find the purchase order by `pono`
      const order = await OrderBooking.findOne({ bono });
      if (!order) {
          return res.status(404).json({ msg: "Booking Order not found" });
      }

      let updatedTotal = order.totalAmount || 0; // Use totalAmount instead of total

      // Loop through each product in request body
      products.forEach((returnedProduct) => {
          // Use `product` from req.body (matches _id of order.products entry)
          const returnedProductId = new mongoose.Types.ObjectId(returnedProduct.product);

          // Find the product in the order using `_id` comparison
          const productIndex = order.products.findIndex(
              (p) => p.product._id.toString() === returnedProductId.toString()
          );

          if (productIndex !== -1) {
              let existingProduct = order.products[productIndex];

              // Ensure returned quantity is a valid number
              const returnQty = Number(returnedProduct.quantity) || 0;

              // Reduce the quantity in the purchase order
              existingProduct.quantity = Math.max(0, existingProduct.quantity - returnQty);

              // Ensure price is a valid number
              const price = existingProduct.price || 0;

              // Recalculate the product total
              existingProduct.total = existingProduct.quantity * price;

              // Update the order total
              updatedTotal -= returnQty * price;

              // Save updated product back to the array
              order.products[productIndex] = existingProduct;
          } else {
              console.log(`Product with ID ${returnedProduct.product} not found in order`);
          }
      });

      // Remove products with zero quantity
      // order.products = order.products.filter((p) => p.quantity > 0);

      // Ensure updatedTotal is never negative
      order.totalAmount = Math.max(0, updatedTotal); // Assign to totalAmount

      // Mark products and totalAmount as modified to force update
      order.markModified("products");
      order.markModified("totalAmount");

      // Save the updated purchase order
      await order.save();

      // Calculate return total safely for PurchaseReturn
      const returnTotal = products.reduce((acc, item) => {
          const costprice = item.price || 0;
          return acc + (Number(item.quantity) || 0) * costprice;
      }, 0);

      // Save purchase return record separately
      const newReturn = new OrderBookingReturn({
        bono, products, customer, totalAmount
      });

      await newReturn.save();

      return res.json({ msg: "Order return processed successfully", order, newReturn });
  } catch (error) {
      console.error("Error in OrderReturn:", error);
      return res.status(500).json({ msg: error.message });
  }
};


const getOrderReturn = async (req, res) => {
  try {
    const orderReturn = await OrderBookingReturn.find().populate({
      path: "products.product",
      select: "productname image brand category costprice",
    })
    .populate({
      path: "customer",
      select: "name phone address email",
    })

    console.log("Order Return Data:", orderReturn); // Debugging ke liye

    if (orderReturn.length > 0) {
      return res.json(orderReturn);
    } else {
      return res.json({ msg: "No order return found." });
    }
  } catch (error) {
    console.error("Error fetching order returns:", error);
    return res.json({ msg: error.message });
  }
};

// delete OrderReturn
const deleteOrderReturn = async (req, res) => {
  try {
      const { id } = req.params;

      // Check if the vendor exists
      const orderreturn = await OrderBookingReturn.findById(id);
      if (!orderreturn) {
          return res.status(404).json({ msg: "order return not found" });
      }

      // Delete the vendor
      await OrderBookingReturn.findByIdAndDelete(id);

      res.status(200).json({ msg: "order return deleted successfully" });
  } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
  }
}









module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateOrderStatus,
  createOrderDetail,
  getBookingOrderByCustomerId,
  OrderReturn,
  getOrderReturn,
  deleteOrderReturn
}
