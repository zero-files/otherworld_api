import Route from "./_Route"

const index = new Route("get", "/", false)
index.setController((req, res) => {
    res.send("<h1>Index route</h1>")
})
index.addModelResponse({
    title: "<h1>Index route</h1>"
})

export default index