import express from "express";
const router = express.Router();
import medicineController from "../controllers/medicineController.js";

// GET /api/medicines - Get all medicines
router.get("/", medicineController.getAllMedicines);

// GET /api/medicines/name/:name - Get medicine by name
router.get("/name/:name", medicineController.getMedicineByName);

// GET /api/medicines/brand/:brand - Get medicine by brand
router.get("/brand/:brand", medicineController.getMedicineByBrand);

// GET /api/medicines/category/:category - Get medicine by category
router.get("/category/:category", medicineController.getMedicineByCategory);

// GET /api/medicines/:id - Get medicine by ID
router.get("/:id", medicineController.getMedicineById);

// POST /api/medicine - Create / add new medicine
router.post("/", medicineController.addMedicine);

// PUT /api/medicine/:id - Update medicine
router.put("/:id", medicineController.updateMedicine);

// DELETE /api/medicine/:id - Delete medicine
router.delete("/:id", medicineController.deleteMedicine);

export default router;
