const express = require('express');
const app = express();
const cors = require('cors');
const {runReport} = require("./util");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.get('/users/active/:propertyId', async (req, res) => {

    const propertyId = req.params.propertyId;

    try {
        const data = await runReport(propertyId);
        res.json(data);
    } catch (e) {
        res.status(500).json({message: "Un error ocurred: "+e});
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
