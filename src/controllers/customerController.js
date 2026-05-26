import Customer from "../models/customerModel.js";

const customerController = {
  // Get all customers
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.getAll();
      res.json({
        success: true,
        data: customers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching customers",
        error: error.message,
      });
    }
  },

  // Get customer by ID
  getCustomerById: async (req, res) => {
    try {
      const customer = await Customer.getById(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }
      res.json({
        success: true,
        data: customer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching customer",
        error: error.message,
      });
    }
  },

  // Create new customer
  addCustomer: async (req, res) => {
    try {
      const { firstname, lastname, age, phone, email, address } = req.body;

      // Validation
      if (!firstname || !lastname || !age || !phone || !email || !address) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (firstname, lastname, age, phone, email, address) are required",
        });
      }

      const newCustomer = await Customer.create({
        firstname,
        lastname,
        age,
        phone,
        email,
        address,
      });

      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: newCustomer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating customer",
        error: error.message,
      });
    }
  },

  // Get customer by email
  getCustomerByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const customers = await Customer.getByEmail(email);

      res.json({
        success: true,
        data: customers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching customer by email",
        error: error.message,
      });
    }
  },

  getCustomerPrescriptions: async (req, res) => {
    try {
      const { id } = req.params;
      const prescriptions = await Customer.getPrescriptions(id);

      if (prescriptions.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No prescriptions found for this customer.",
        });
      }
      res.json({
        success: true,
        data: prescriptions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching prescription.",
      });
    }
  },

  // Update customer
  updateCustomer: async (req, res) => {
    try {
      const { firstname, lastname, age, phone, email, address } = req.body;
      const customerId = req.params.id;

      // Check if customer exists
      const existingCustomer = await Customer.getById(customerId);
      if (!existingCustomer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Validation
      if (!firstname || !lastname || !age || !phone || !email || !address) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (firstname, lastname, age, phone, email, address) are required",
        });
      }

      await Customer.update(customerId, {
        firstname,
        lastname,
        age,
        phone,
        email,
        address,
      });

      res.json({
        success: true,
        message: "Customer updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating customer",
        error: error.message,
      });
    }
  },

  // Delete customer
  deleteCustomer: async (req, res) => {
    try {
      const customerId = req.params.id;

      // Check if customer exists
      const existingCustomer = await Customer.getById(customerId);
      if (!existingCustomer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      await Customer.delete(customerId);

      res.json({
        success: true,
        message: "Customer deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting customer",
        error: error.message,
      });
    }
  },
};

export default customerController;
