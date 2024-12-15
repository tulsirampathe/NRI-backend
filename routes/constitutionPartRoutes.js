import express from "express";
import {
  createConstitutionPart,
  deleteConstitutionPartById,
  getAllConstitutionParts,
  getConstitutionPartById,
  getConstitutionPartByTitle,
  updateConstitutionPartById,
} from "../controllers/constitutionPartController.js";

const router = express.Router();

router.get("/", getAllConstitutionParts);
router.get("/:id", getConstitutionPartById);
router.get("/part/:title", getConstitutionPartByTitle); // Use route parameter
router.post("/", createConstitutionPart);
router.put("/:id", updateConstitutionPartById);
router.delete("/:id", deleteConstitutionPartById);

export default router;
