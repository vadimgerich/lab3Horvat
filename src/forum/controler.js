import Neww from "./model";

const newwControler = {
    async get(req, res) {
        try {
           
            const list = await Neww.find(makeQueryObject (req.query));            
            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }


        function makeQueryObject(query){
            let result = {};        
            if (query.count)
                result.$expr = { "$eq": [{ "$count": "$count" }, parseInt( query.count)] } ;
            return result;
        }
    },
    async getById(req, res) {
        try {
            const neww = await Neww.findById(req.params.id);
            if (!neww)
                res.status(404).send("Not found");
            res.send(neww);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    async post (req, res) {
        try {           
            const neww = new Neww(req.body);
            await neww.save();
            res.send(neww);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const neww = await Neww.findByIdAndDelete(req.params.id);
            if (!neww)
                res.status(404).send("Not found");
            res.send(neww);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async patch(req, res) {
        try {
            const neww = await Neww.findByIdAndUpdate(req.params.id, req.body, {new: true}) ;
            if (!neww)
                res.status(404).send("Not found");
            await neww.save();  
            res.send(neww);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default newwControler;