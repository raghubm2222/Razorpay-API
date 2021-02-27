const app = require("express")();
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");

const razorpay = new Razorpay({

  key_id: "Your Razorpay key_id",
  key_secret: "Razorpay Key secret",
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/razorpay", async (req, res) => {
  const amount = "2000";
  const currency = "INR";
  const options = {
    amount,
    currency,
    receipt: shortid.generate() + new Date().getTime(),
  };
  try {
    const responce = await razorpay.orders.create(options);
    // console.log(responce);
    res.json({
      id: responce.id,
      currency: responce.currency,
      amount: responce.amount,
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => {
  console.log("Started listening on port 5000");
});
