const express = require('express');

const router = express.Router();

class FeedDB {
    static _inst_;
    static getInst = () => {
        if ( !FeedDB._inst_ ) FeedDB._inst_ = new FeedDB();
        return FeedDB._inst_;
    }

    #id = 1; #itemCount = 1; #LDataDB = [
        { id: 0, title: "Eru Chitanda", description: "I'm Curious!", image: "https://nekos.best/api/v2/happy/084743a2-4c76-4d3c-9f32-83900742e188.gif"},
        { id: 1, title: "Kaori Miyazono", description: "You gave me a forever within the numbered days, and I'm grateful!", image: "https://nekos.best/api/v2/happy/1c03fe97-7883-4b84-b726-21505e50e587.gif"}
];

    constructor() { console.log("[Feed-DB] DB Init Completed"); }

    selectItems = ( count ) => {
        if (count > this.#itemCount) return { success: false, data: "Too many items queried"  };
        if (count < 0) return { success: false, data: "Invalid count provided" };
        else return { success: true, data: this.#LDataDB.slice(0, count) }
    }

    insertItem = ( item ) => {
        const { title, description, image } = item;
        this.#LDataDB.push({ id: this.#id, title, description, image });
        this.#id++; this.#itemCount++;
        return true;
    }

    deleteItem = ( id ) => {
        let BItemDeleted = false;
        this.#LDataDB = this.#LDataDB.filter((value) => {
            const match = (value.id === id);
            if (match) BItemDeleted = true;
            return !match;
        });
        if (BItemDeleted) id--;
        return BItemDeleted;
    }

    editItem = ( id, item ) => {
        const { title, description, image } = item;
        this.#LDataDB = this.#LDataDB.map((value) => {
            if (value.id === id) {
                value.title = title;
                value.description = description;
                value.image = image;
            }
            return value;
        });
    }
}

const feedDBInst = FeedDB.getInst();

router.get('/getFeed', (req, res) => {
    try {
        const requestCount = parseInt(req.query.count);
        const dbRes = feedDBInst.selectItems(requestCount);
        if (dbRes.success) return res.status(200).json(dbRes.data);
        else return res.status(500).json({ error: dbRes.data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addFeed', (req, res) => {
   try {
       const { title, description, image } = req.body;
       const addResult = feedDBInst.insertItem({ title, description, image });
       if (!addResult) return res.status(500).json({ error: dbRes.data })
       else return res.status(200).json({ isOK: true });
   } catch (e) {
       return res.status(500).json({ error: e });
   }
});

router.post('/deleteFeed', (req, res) => {
    try {
        const { id } = req.body;
        const deleteResult = feedDBInst.deleteItem(parseInt(id));
        if (!deleteResult) return res.status(500).json({ error: "No item deleted" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

router.post('/editFeed', (req, res) => {
    try {
        const { id, title, description, image } = req.body;
        feedDBInst.editItem(parseInt(id), { title, description, image });
        return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;