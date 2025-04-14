const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const app = express();
app.use(cors());
app.use(express.json());


const JSON_SERVER_URL = "http://localhost:3000/quotes";

//verificare daca id-ul din put si delete este un nr valid
const validateId = (req, res, next) => {
    if (isNaN(req.params.id)) {
        return res.status(400).json({ error: "invalid ID format" });
    }
    next();
}

//schema joi pentru valdiarea datelor

const quoteSchema = Joi.object({
id: Joi.string().optional(),
author: Joi.string().min(2).required(),
quote: Joi.string().min(5).required(),
});


app.get("/", (req, res) => {
    res.send("printing quotes api is running")
})




app.use("/images", express.static(path.join(__dirname, "images")));

//extragem citatele


    app.get("/api/quotes", async (req, res) => {
  try {
    const response = await fetch(JSON_SERVER_URL);
    const quotes = await response.json();
    res.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

// Adauga un nou citat
app.post("/api/quotes", async (req, res) => {
    const { error } = quoteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    try {
        const response = await fetch(JSON_SERVER_URL);
        const quotes = await response.json();
        // generam un ID numeric (urmatorul numar disponibil)

        const newId = quotes.length > 0 ? Math.max(...quotes.map(q => Number(q.id))) + 1 : 1;
        const newQuote = { id: newId.toString(), ...req.body };
        // convertim ID-ul in sir pentru a se potrivi cu formatul db.json


        // trimite la json-server
        const postResponse = await fetch(JSON_SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newQuote),
        });
        const data = await postResponse.json();
        res.status(postResponse.status).json(data);
    } catch (error) {
        console.error("Error adding quote:", error);
        res.status(500).json({ error: "Failed to add quote" });
    }
});
// Actualizam un citat
app.put("/api/quotes/:id", validateId, async (req, res) => {

    const { error } = quoteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }


    try {
        const quoteId = req.params.id;
        // construiti obiectul actualizat, asigurandu-va ca id este prima
        const updatedQuote = { id: quoteId.toString(), ...req.body };
        const response = await fetch(`${JSON_SERVER_URL}/${quoteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedQuote),
        });
        const data = await response.json();
        // creati un nou obiect cu id ca prima cheie
        const reorderedData = {
            id: data.id, author: data.author, quote:
                data.quote
        };
        res.status(response.status).json(reorderedData);
    } catch (error) {
        console.error("Error updating quote:", error);
        res.status(500).json({ error: "Failed to update quote" });
    }
});
// Stergem un citat
app.delete("/api/quotes/:id", validateId, async (req, res, next ) => {
    try {
        const quoteId = req.params.id;
        const response = await fetch(`${JSON_SERVER_URL}/${quoteId}`);
        if (!response.ok) {
            return res.status(404).json({ error: "quote not found" })

        }

        await fetch(`${JSON_SERVER_URL}/${quoteId}`, { method: "DELETE" });
        res.status(200).json({ message: "quote deleted succesfully" });
    } catch (error) {
        next(error);
    }

});
// Pornim serverul
const port = 5000;
app.listen(port, () => console.log(`Server running on
http://localhost:${port}`));
// Verificam repornirea automata a serverului
console.log("Server restarted!");