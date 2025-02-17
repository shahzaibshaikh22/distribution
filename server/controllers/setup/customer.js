const Customer = require("../../models/setup/customer");

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

//  Export all functions
module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
