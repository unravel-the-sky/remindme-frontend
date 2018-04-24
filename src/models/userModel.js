import {Model, Collection} from 'vue-mc'

class User extends Model {

    // default attributes for the empty state, defaults
    defaults() {
        return {
            id: null,
            authenticated: false,
            name: '',
            avatar: '',
            ranking: null // bla bla
        }
    }

    // mutations - not sure if we need it, currently we only fetch the data and display as is
    mutations() {
        return {
            id: (id) => Number(id) || null,
            authenticated: Boolean,
            name: String,
            avatar: String,
            ranking: Number
        }
    }

    // routing - important i sink, must match with hte fetch parts
    routes() {
        return {
            fetch: '/user/{id}',
            save: '/user'
        }
    }
}

export default User