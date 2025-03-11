const PurchaseOrder = require("../../models/purchase/purchaseOrderModel")
const AddPurchaseOrder = require("../../models/purchase/addpurchaseOrder")
const PurchaseReturn = require("../../models/purchase/purchasereturn")
const Inventory = require("../../models/inventory/inventory")
const PurchaseDue = require("../../models/purchaseDue/purchaseValue")
const mongoose = require("mongoose")

const purchaseOrders = async (req,res)=>{
  try {
    const { warehouse,vendor,products,vehicleno,paymentType } = req.body;

    const purchaseOrder = await PurchaseOrder.find();
    if(!warehouse || !vendor || !products || !vehicleno || !paymentType){
      return res.json({err:"fields are required"})
    }
    const newOrder = await PurchaseOrder.create(req.body);
    res.status(201).json({msg:"order created successfully",newOrder});
  } catch (error) {
    res.status(500).json({ message: "Failed to save order" });
  }
}
const getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.find().populate({
      path: "products.product",
      select: "productname image brand category costprice", 
    });

      return res.json(purchaseOrder);
  } catch (error) {
    return res.json({ err: error.message });
  }
};
// add purchase order
// const AddpurchaseOrders = async (req, res) => {
//   try {
//     const { warehouse, vendor, products, vehicleno, dcno, pono } = req.body;

//     if (!warehouse || !vendor || !products || !vehicleno || !dcno || !pono) {
//       return res.status(400).json({ err: "All fields are required" });
//     }

//     // Pehle purchase order create karo
//     const newOrder = await AddPurchaseOrder.create(req.body);

//     // Inventory check karo
//     let inventory = await Inventory.findOne();

//     if (!inventory) {
//       // Agar inventory ka document exist nahi karta, to ek naya bana lo
//       inventory = new Inventory({ products: [] });
//     }

//     // Products loop karke inventory update karo
//     for (const item of products) {
//       const { product, quantity } = item; // Yeh product ki ID aur quantity hai

//       // Dekho ke yeh product inventory mein hai ya nahi
//       const existingProduct = inventory.products.find((p) => p.product.toString() === product);

//       if (existingProduct) {
//         // Agar product mojood hai to sirf quantity update karo
//         existingProduct.quantity += quantity;
//       } else {
//         // Agar product nahi hai to naya product add karo
//         inventory.products.push({ product, quantity });
//       }
//     }

//     // Inventory ko save karo
//     await inventory.save();

//     res.status(201).json({ msg: "Order created successfully & inventory updated", newOrder });
//   } catch (error) {
//     console.error("Error in AddpurchaseOrders:", error);
//     res.status(500).json({ message: "Failed to save order" });
//   }
// };

// const AddpurchaseOrders = async (req, res) => {
//   try {
//     const { pono, products, vendor, warehouse , dcno, vehicleno,totalAmount } = req.body;
//     console.log(products);
    

//     // Pono ke zariye order find karo
//     const orders = await PurchaseOrder.find();
//     const isOrder = await PurchaseOrder.findOne({ pono });
//     console.log(isOrder.products.map());
    

//     if (!isOrder) {
//       return res.status(404).json({ err: "Order not found" });
//     }

//     let status = "Quantity matches"; // Default status

//     for (const item of products) {
//       const { product, quantity } = item;

//       // Check karo ke yeh product `isOrder` me hai ya nahi
//       const existingProduct = isOrder.products.find(
//         (p) => p.product._id.toString() === product
//       );

//       if (!existingProduct) {
//         return res.status(400).json({ err: `Product ${product} not found in order` });
//       }

//       if (quantity < existingProduct.quantity) {
//         const newOrder = new PurchaseOrder({
//           vendor,
//           warehouse,
//           dcno,
//           pono:`pono-000${orders.length + 1}`,
//           vehicleno,
//           products,
//           totalAmount
//         })
//         const newAddPurchase = new AddPurchaseOrder({
//           vendor,
//           warehouse,
//           dcno,
//           pono,
//           vehicleno,
//           products,
//           totalAmount
//         })  
//         await newAddPurchase.save();
//         await newOrder.save();
//         return res.json({msg:"renew prchase order and save in addpurchase"})
//       }
//        if (quantity > existingProduct.quantity) {
//         return res.json({err:"product quantity is larger than orderd"})
//       }
//     }

//     res.status(200).json({ msg: "Quantity checked", status });
//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// };

// const AddpurchaseOrders = async (req, res) => {
//   try {
//     const { pono, products, vendor, warehouse, dcno, vehicleno } = req.body;

//     // Sab orders fetch karo
//     const orders = await PurchaseOrder.find();

//     // Specific order dhundo using `pono`
//     const isOrder = await PurchaseOrder.findOne({ pono });

//     if (!isOrder) {
//       return res.status(404).json({ err: "Order not found" });
//     }

//     console.log("Original Products in Order:", isOrder.products);

//     let totalAmount = 0;

//     let updatedProducts = isOrder.products.map((existingProduct) => {
//       const matchingProduct = products.find(
//         (p) => p.product === existingProduct.product._id.toString()
//       );

//       if (matchingProduct) {
//         let updatedQuantity = existingProduct.quantity - matchingProduct.quantity;
        
//         // Agar quantity negative hojaye to 0 kar do
//         updatedQuantity = updatedQuantity < 0 ? 0 : updatedQuantity;

//         // Total amount calculate karo
//         totalAmount += updatedQuantity * existingProduct.price; 

//         return {
//           ...existingProduct.toObject(),
//           quantity: updatedQuantity,
//         };
//       }

//       // Jo products exist nahi karte wo as it is rakh lo
//       totalAmount += existingProduct.quantity * existingProduct.price; 
//       return existingProduct.toObject();
//     });

//     console.log("Updated Products After Subtracting Quantities:", updatedProducts);
//     console.log("Updated Total Amount:", totalAmount);

//     res.status(200).json({ msg: "Quantity updated in logs", updatedProducts, totalAmount });

//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// };


// 

const getInventoryItems = async(req,res)=>{
  try {
    const inventory = await Inventory.find().populate({
      path:"products.product",
      select:"productname image costprice brand category distributionprice retailprice unit subcategory producttype barcode hscode"
    })
    if (inventory) {
      const inventoryproducts = inventory.map(order => order.products).flat();
      return res.json(inventoryproducts);
  }
    if(!inventory){
      return res.json({err:"product not found"})
    }
  } catch (error) {
    return res.json({err:error.message})
  }
}
const AddpurchaseOrders = async (req, res) => {
  try {
    const { pono, products, vendor, warehouse, dcno, vehicleno } = req.body;

    let inventory = await Inventory.findOne();

    if (!inventory) {
      inventory = new Inventory({ products: [] });
    }

    for (const item of products) {
      const { product, quantity } = item; 

      const existingProduct = inventory.products.find((p) => p.product.toString() === product);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        inventory.products.push({ product, quantity });
      }
    }

    await inventory.save();

    const isOrder = await PurchaseOrder.findOne({ pono });
    const existingAddPurchase = await AddPurchaseOrder.findOne({ pono });
    if(existingAddPurchase){
      return res.json({err:"purchase Order is already exists..."})
    }

    if (!isOrder) {
      return res.status(404).json({ err: "Order not found" });
    }

    let totalAmount = 0;
    let updatedProducts = [];
    let remainingProducts = [];

    for (const existingProduct of isOrder.products) {
      const matchingProduct = products.find(
        (p) => p.product === existingProduct.product._id.toString()
      );

      if (matchingProduct) {
        let updatedQuantity = matchingProduct.quantity;

        if (updatedQuantity > existingProduct.quantity) {
          return res.json({
            err: `Product ${existingProduct.product.productname} ki quantity zyada hai! Max: ${existingProduct.quantity}`,
          });
        }

        let remainingQuantity = existingProduct.quantity - updatedQuantity;
        let productTotal = updatedQuantity * existingProduct.price;

        updatedProducts.push({
          product: existingProduct.product,
          quantity: updatedQuantity,
          price: existingProduct.price,
          total: productTotal,
        });

        if (remainingQuantity > 0) {
          remainingProducts.push({
            product: existingProduct.product,
            quantity: remainingQuantity,
            price: existingProduct.price,
            total: remainingQuantity * existingProduct.price,
          });
        }

        totalAmount += productTotal;
      } else {
        remainingProducts.push({
          ...existingProduct,
          total: existingProduct.quantity * existingProduct.price,
        });
      }
    }

    const newAddPurchase = new AddPurchaseOrder({
      vendor,
      paymentType:isOrder.paymentType,
      warehouse,
      dcno,
      pono,
      vehicleno,
      products: updatedProducts,
      totalAmount,
    });
    await newAddPurchase.save();

    if (remainingProducts.length > 0) {
      const newOrder = new PurchaseOrder({
        vendor,
        warehouse,
        dcno,
        pono: `${pono}revised`,
        vehicleno,
        products: remainingProducts,
        totalAmount: remainingProducts.reduce((sum, p) => sum + p.total, 0),
      });
      await newOrder.save();
    }
    
    const due =  PurchaseDue({
      vendor,
      products,
      paymentType:isOrder.paymentType,
      purchseOrderNo:pono,
      totalAmount
    })
    await due.save()

    res.status(200).json({ msg: "Purchase order updated successfully" });


  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
const deleteInventoryItem = async (req, res) => {
  try {
    const { inventoryId, product } = req.body;

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ err: "Inventory not found" });
    }

    const productIndex = inventory.products.findIndex(
      (item) => item.product.toString() === product
    );

    if (productIndex === -1) {
      return res.status(404).json({ err: "Product not found in inventory" });
    }

    inventory.products.splice(productIndex, 1);

    await inventory.save();

    return res.json({ msg: "Product removed from inventory" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
// main add purchase
// const AddpurchaseOrders = async (req, res) => {
//   try {
//     const { pono, products, vendor, warehouse, dcno, vehicleno } = req.body;

//      // Inventory check karo
//     let inventory = await Inventory.findOne();

//     if (!inventory) {
//       // Agar inventory ka document exist nahi karta, to ek naya bana lo
//       inventory = new Inventory({ products: [] });
//     }

//     // Products loop karke inventory update karo
//     for (const item of products) {
//       const { product, quantity } = item; // Yeh product ki ID aur quantity hai

//       // Dekho ke yeh product inventory mein hai ya nahi
//       const existingProduct = inventory.products.find((p) => p.product.toString() === product);

//       if (existingProduct) {
//         // Agar product mojood hai to sirf quantity update karo
//         existingProduct.quantity += quantity;
//       } else {
//         // Agar product nahi hai to naya product add karo
//         inventory.products.push({ product, quantity });
//       }
//     }

//     // Inventory ko save karo
//     await inventory.save();
    

//     // Sab orders fetch karo
//     const orders = await PurchaseOrder.find();

//     // Existing order dhoondo
//     const isOrder = await PurchaseOrder.findOne({ pono });

//     if (!isOrder) {
//       return res.status(404).json({ err: "Order not found" });
//     }


//     let totalAmount = 0;
//     let updatedProducts = [];
//     let remainingProducts = [];

//     isOrder.products.forEach((existingProduct) => {
//       const matchingProduct = products.find(
//         (p) => p.product === existingProduct.product._id.toString()
//       );

//       if (matchingProduct) {
//         let updatedQuantity = matchingProduct.quantity; 
//         let remainingQuantity = existingProduct.quantity - updatedQuantity; 

//         let productTotal = updatedQuantity * existingProduct.price; 

//         updatedProducts.push({
//           product: existingProduct.product,
//           quantity: updatedQuantity,
//           price: existingProduct.price,
//           total: productTotal, 
//         });

//         if (remainingQuantity > 0) {
//           remainingProducts.push({
//             product: existingProduct.product,
//             quantity: remainingQuantity,
//             price: existingProduct.price,
//             total: remainingQuantity * existingProduct.price, 
//           });
//         }

//         totalAmount += productTotal;
//       } else {
//         remainingProducts.push({
//           ...existingProduct,
//           total: existingProduct.quantity * existingProduct.price, 
//         });
//       }
//     });

//     // console.log("Updated Products (Saved in AddPurchaseOrder):", updatedProducts);
//     // console.log("Remaining Products (Saved in New PurchaseOrder):", remainingProducts);
//     // console.log("Updated Total Amount:", totalAmount);

//     const newAddPurchase = new AddPurchaseOrder({
//       vendor,
//       warehouse,
//       dcno,
//       pono,
//       vehicleno,
//       products: updatedProducts,
//       totalAmount,
//     });
//     await newAddPurchase.save();

//     if (remainingProducts.length > 0) {
//       const newOrder = new PurchaseOrder({
//         vendor,
//         warehouse,
//         dcno,
//         pono: `${pono}revised`,
//         vehicleno,
//         products: remainingProducts,
//         totalAmount: remainingProducts.reduce((sum, p) => sum + p.total, 0), // ✅ Ensuring correct totalAmount
//       });
//       await newOrder.save();
//     }

//     res.status(200).json({ 
//       msg: "Purchase order updated successfully",
//     });

//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// };

const getPorderByVendor = async (req, res) => {
  try {
    const { vendor } = req.params
    const purchaseOrder = await PurchaseDue.find({vendor,paymentType: "credit"}).populate({
      path: "products.product",
      select: "productname image brand category costprice", 
    });
    if(!purchaseOrder){
      return res.json({msg:"not found"})
    }
      return res.json(purchaseOrder);
  } catch (error) {
    return res.json({ err: error.message });
  }
};

// get grand total of all add purchase orders
const getAllAddPurchaseOrdersTotal = async (req, res) => {
  try {
    // Sare AddPurchaseOrders fetch karna
    const allOrders = await PurchaseDue.find();
    
    // Grand Total calculate karna
    const grandTotal = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Vendor-wise total calculate karna
    const vendorTotals = allOrders.reduce((acc, order) => {
      acc[order.vendor] = (acc[order.vendor] || 0) + order.totalAmount;
      return acc;
    }, {});
    
    res.status(200).json({
      grandTotal,
      vendorTotals
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// create purchase return
const purchaseReturn = async (req, res) => {
  try {
      const { pono, products, vendor, warehouse, vehicleno, totalAmount } = req.body;

      // Log incoming request for debugging
      console.log("Received req.body:", req.body);

      // Find the purchase order by `pono`
      const order = await PurchaseOrder.findOne({ pono });
      if (!order) {
          return res.status(404).json({ msg: "Purchase Order not found" });
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
      const newReturn = new PurchaseReturn({
          pono,
          products,
          returnTotal,
          vendor,
          warehouse,
          vehicleno,
          totalAmount,
      });

      await newReturn.save();

      return res.json({ msg: "Purchase return processed successfully", order, newReturn });
  } catch (error) {
      console.error("Error in purchaseReturn:", error);
      return res.status(500).json({ msg: error.message });
  }
};

// get purchase return

const getPurchaseReturn = async (req, res) => {
  try {
    const purchaseReturn = await PurchaseReturn.find().populate({
      path: "products.product",
      select: "productname image brand category costprice",
    })

    console.log("Purchase Return Data:", purchaseReturn); // Debugging ke liye

    if (purchaseReturn.length > 0) {
      return res.json(purchaseReturn);
    } else {
      return res.json({ msg: "No purchase return found." });
    }
  } catch (error) {
    console.error("Error fetching purchase returns:", error);
    return res.json({ msg: error.message });
  }
};
// delete purchasereturn
const deletePurchaseReturn = async (req, res) => {
  try {
      const { id } = req.params;

      // Check if the vendor exists
      const purchasereturn = await PurchaseReturn.findById(id);
      if (!purchasereturn) {
          return res.status(404).json({ msg: "purchase return not found" });
      }

      // Delete the vendor
      await PurchaseReturn.findByIdAndDelete(id);

      res.status(200).json({ msg: "purchase return deleted successfully" });
  } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
  }
}






module.exports = {
    purchaseOrders,
    getPurchaseOrder,
    AddpurchaseOrders,
    getInventoryItems,
    deleteInventoryItem,
    getPorderByVendor,
    getAllAddPurchaseOrdersTotal,
    purchaseReturn,
    getPurchaseReturn,
    deletePurchaseReturn
}