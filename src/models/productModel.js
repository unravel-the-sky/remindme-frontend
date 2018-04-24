import {Model, Collection} from 'vue-mc'

class Product extends Model {

    // default attributes for the empty state, defaults
    defaults() {
        return {
            id: null,
            name: '',
            image: ''
        }
    }

    // mutations - not sure if we need it, currently we only fetch the data and display as is
    mutations() {
        return {
            id: (id) => Number(id) || null,
            name: String,
            image: String
        }
    }

    // routing - important i sink, must match with hte fetch parts
    routes() {
        return {
            fetch: '/task/{id}',
            save: '/task'
        }
    }
}

class ProductList extends Collection {

    // model that is contaned in the collection, which the Product
    model() {
        return Product
    }

    defaults() {
        return {
            orderBy: 'name'
        }
    }

    routes() {
        return {
            fetch: '/stuff'
        }
    }

    get todo() {
        return this.sum('done')
    }

    get done() {
        return this.todo === 0
    }
}