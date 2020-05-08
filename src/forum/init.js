import Neww from "./model";

export default {
    async run(req, res) {
        try {
            await Neww.deleteMany({});
            const newws = [
                {
                    title: "News1",
                    shortDescribe: "desc of new1",
                    text: "text1",
                    published: new Date("01-11-1997"),
                    count: 368
                },                {
                    title: "News2",
                    shortDescribe: "desc of new2",
                    text: "text2",
                    published: new Date("01-11-1997"),
                    count: 360
                },
                {
                    title: "News3",
                    shortDescribe: "desc of new3",
                    text: "text3",
                    published: new Date("01-11-1997"),
                    count: 400
                },
                {
                    title: "News4",
                    shortDescribe: "desc of new4",
                    text: "text4",
                    published: new Date("01-11-1997"),
                    count: 420
                },
                {
                    title: "News5",
                    shortDescribe: "desc of new5",
                    text: "text5",
                    published: new Date("01-11-1997"),
                    count: 448
                },
                {
                    title: "News6",
                    shortDescribe: "desc of new6",
                    text: "text6",
                    published: new Date("01-11-1997"),
                    count: 590
                }
            ];

            newws.forEach(async neww => await new Neww(neww).save());
        } catch (error) {
            console.log(error)
        }
    }
}