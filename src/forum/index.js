import express from "express";
import newwControler from "./controler";

const newwRouter = new express.Router();

newwRouter.get("/", newwControler.get);
newwRouter.get("/:id", newwControler.getById);
newwRouter.post("/", newwControler.post);
newwRouter.delete("/:id", newwControler.delete);
newwRouter.patch("/:id", newwControler.patch);

export default newwRouter;