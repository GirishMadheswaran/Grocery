const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const foodModel = require("./models/food")

app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://newUser:giri12345@registration.zzypp.mongodb.net/Food?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})


app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days

    const Food = new foodModel({ foodName: foodName, kgs: days });

    try {
        await Food.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err)
    }
});


app.get('/read', async (req, res) => {

    foodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
});

app.put('/update', async (req, res) => {

    const newKg = req.body.newKg;
    const id = req.body.id;

    try {
        await foodModel.findById(id, (err, updatedKg) => {
            updatedKg.kgs = newKg;
            updatedKg.save();
            res.send("update")
        });
    } catch (err) {
        console.log(err)
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    foodModel.findByIdAndRemove(id).exec();
    res.send("deleted")
});

app.listen(3001, () => {
    console.log("Server is running")
})