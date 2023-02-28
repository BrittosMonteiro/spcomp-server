import express from "express";
import {
  createImportHistory,
  readImportHistory,
  readImportItems,
  updateImportHistory,
  deleteImportHistory,
} from "../controller/importsHistoryController.js";
const ImportsHistoryRouter = express.Router();

ImportsHistoryRouter.post("/", createImportHistory);
ImportsHistoryRouter.get("/", readImportHistory);
ImportsHistoryRouter.get("/readImportItems/:idImportHistory", readImportItems);
ImportsHistoryRouter.put("/", updateImportHistory);
ImportsHistoryRouter.delete("/", deleteImportHistory);

export default ImportsHistoryRouter;
