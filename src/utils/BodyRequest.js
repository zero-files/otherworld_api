class BodyRequest {
    constructor(...parameters) {
        parameters.forEach(parameter => this[parameter] = null)
    }

    assign(body){
        Object.keys(body).forEach(key => {
            if (key in this) this[key] = body[key]
        })
    }

    clear_nulls(){
        Object.keys(this).forEach(parameter => {
            if(this[parameter] === null) delete this[parameter]
        })
    }

    has(param){
        return this[`${param}`] ? true : false
    }

    get(param){
        if(this.has(param)) return this[`${param}`]
        else return undefined
    }

    delete(param){
        if(this.has(param)) delete this[`${param}`]
    }

    is_empty(){
        return Object.keys(this).length ? false : true
    }

    get parameters(){
        return Object.assign({}, this)
    }
}

module.exports = BodyRequest
