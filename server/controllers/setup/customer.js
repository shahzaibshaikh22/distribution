const Customer = require("../../models/setup/customer");
const CustomerCategory = require("../../models/setup/customercategory")

//  Create a new customer
const createCustomer = async (req, res) => {
    try {
        const { username, address, phone, nten } = req.body;
        const newCustomer = new Customer({ username, address, phone, nten });
        await newCustomer.save();
        res.status(201).json({ msg: "Customer created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
    }
};
//  Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customers" });
    }
};

//  Get a single customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customer" });
    }
};

//  Update customer
const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ error: "Failed to update customer" });
    }
};

//  Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete customer" });
    }
};

// create customer category
const createCustomerCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if(!category){
            return res.json({msg:"please type category"})
        }
        const customerCategory = await CustomerCategory.find()
        
        const customercategory = new CustomerCategory({ category, code:customerCategory.length + 1 });
        await customercategory.save();
        res.status(201).json({ msg: "Customer created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
    }
};
const getCustomerCategory = async (req, res) => {
    try {
        const category = await CustomerCategory.find()
        if(!category){
            return res.json({msg:"category not found"})
        }
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
    }
};
const deleteCustomerCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const category = await CustomerCategory.findById(id);
        if (!category) {
            return res.status(404).json({ msg: "category not found" });
        }

        // Delete the vendor
        await CustomerCategory.findByIdAndDelete(id);

        res.status(200).json({ msg: "category deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
const updatedCustomerCategory = async (req, res) => {
    try {
        const updatedTown = await CustomerCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTown) {
            return res.status(404).json({ msg: "category not found" });
        }
        res.status(200).json({ msg: "category updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//  Export all functions
module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    createCustomerCategory,
    getCustomerCategory,
    deleteCustomerCategory,
    updatedCustomerCategory
};
