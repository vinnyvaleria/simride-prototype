const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_WzkXhy9bPK7Wir3HZrpiqxB800AbVi94mG");
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/Wallet", (req, res) => {
    res.send("Wallet Page");
});

app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { token, product } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "SGD",
            customer: customer.id,
            receipt_email: token.email,
            description: product.description
        }, {
            idempotency_key
        });
        console.log("Charge:", {
            charge
        });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({
        error,
        status
    });
});

app.listen(9000);