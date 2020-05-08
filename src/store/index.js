import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        title:"",
        describe:"",
        text: "",
        date:Date,
        count:0
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredNewws(state) {
            let result = state.newws;
            if (state.searchString)
                result = result.filter(neww =>
                    neww.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setNewws(state, newws) {
            state.newws = newws;
        },
        addNeww(state, neww) {
            state.newws.push(neww);
        },
        removeNeww(state, neww) {
            const index = state.newws.indexOf(neww);
            state.newws.splice(index, 1);
        },
        updateNeww(state, neww) {
            const index = state.newws.findIndex(b => b._id == neww._id);
            Vue.set(state.newws, index, neww);
        },
        sortNewws(state, field) {
            state.newws.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormNeww(state) {
            Object.assign(state.formForum, {
                title: "",
                describe: "",
                text:"",
                date: "1997-01-10T22:00:00.000Z",
                count: 0,
            });
        },
        setFormNeww(state, neww) {
            state.formNeww = neww;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getNewws(context) {
            try {
                let resp = await axios.get("http://localhost:5000/neww");
                context.commit("setNewws", resp.data);
                await context.dispatch("showMessageForTime", { message: "новини завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getNewwById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/neww/${id}`);
                await context.dispatch("showMessageForTime", { message: "Новини завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getNewwsByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/neww", { params: query });
                context.commit("setNews", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новини завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postNeww(context, neww) {
            try {
                let resp = await axios.post("http://localhost:5000/neww", neww);
                context.commit("addNeww", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новину додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteNeww(context, neww) {
            try {
                let resp = await axios.delete(`http://localhost:5000/neww/${neww._id}`);
                context.commit("removeNeww", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новини вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchNeww(context, neww) {
            try {
                let resp = await axios.patch(`http://localhost:5000/neww/${neww._id}`, neww);
                context.commit("updateNeww", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новини оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, neww) {
            book = await context.dispatch("getNewwById", neww._id);
            context.commit("setFormNeww", neww);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormNeww");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
