import Route from "./_Route"

const test = new Route("get", "/test", "user")
test.setController((req, res) => {
    console.log("leido!")
})
test.addModelResponse({
    title: "<h1>test route</h1>"
})

export default test