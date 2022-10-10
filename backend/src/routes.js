const express = require('express');
const routes = express.Router();

const AnnotationController = require("./controllers/AnnotationController");
const ContentController = require('./controllers/ContentController');
const PriorityController = require('./controllers/PriorityController');

// Rota notes
routes.post("/notes", AnnotationController.create);
routes.get("/notes", AnnotationController.read);
routes.delete("/notes/:id", AnnotationController.delete);

// Rota Priority
routes.get("/priority", PriorityController.read);
routes.put("/priority/:id", PriorityController.update);

// Route update content
routes.put("/contents/:id", ContentController.update)

module.exports = routes;

