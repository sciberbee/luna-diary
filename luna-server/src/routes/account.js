const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

class BankDB {
    static _inst_;
    static getInst = () => {
        if ( !BankDB._inst_ ) BankDB._inst_ = new BankDB();
        return BankDB._inst_;
    }

    #total = 10000;

    constructor() { console.log("[Bank-DB] DB Init Completed"); }

    getBalance = () => {
        return { success: true, data: this.#total };
    }

    transaction = ( amount ) => {
        this.#total += amount;
        return { success: true, data: this.#total };
    }
}

const bankDBInst = BankDB.getInst();

router.post('/getInfo', authMiddleware, (req, res) => {
    try {
        const { success, data } = bankDBInst.getBalance();
        if (success) return res.status(200).json({ balance: data });
        else return res.status(500).json({ error: data });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/transaction', authMiddleware, (req, res) => {
    try {
        const { amount } = req.body;
        const { success, data } = bankDBInst.transaction( parseInt(amount) );
        if (success) res.status(200).json({ success: true, balance: data, msg: "Transaction success" });
        else res.status(500).json({ error: data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;