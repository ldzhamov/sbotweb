const router = require("express").Router();
const StockGroups3000 = require("../models/StockGroups3000");
const StockGroups500 = require("../models/StockGroups500");
const auth = require("../listeners/auth");

router.get("/get-3000", auth, async (req, res) => {
    try {
        const active_group =  await StockGroups3000.getActive();
        return res.status(200).json({active:active_group});

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

router.get("/get-500", auth, async (req, res) => {
    try {
        const active_group =  await StockGroups500.getActive();
        return res.status(200).json({active:active_group});

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

module.exports = router;