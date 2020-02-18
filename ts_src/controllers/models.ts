import Route from "./_Route";
import {readdirSync, readFileSync} from "fs"
import {resolve, join} from "path"

const route = new Route("get", "/models", false)

const modelsPath:string = resolve("./ts_src/models")
const models:string[] = readdirSync(modelsPath)
let response:{[model:string]:{[prop:string]:string}} = {}
for(let i = 0; i < models.length; i++){
    let modelPath = models[i]
    const file:string = readFileSync(join(modelsPath, modelPath), "utf8")
    const filebylines = file.split("\n")
    const typename:string = modelPath.slice(0, -3)
    let type:{[prop:string]:string} = {}
    let startType:number = 0
    let endType:number = 0

    for(let j = 0; j < filebylines.length; j++) {
        let line:string = filebylines[j]
        if(line.startsWith(`type ${typename}`)) startType = j
        if(line.startsWith("}")) endType = j
    }

    filebylines.slice(startType+1, endType).forEach(line => {
        line = line.endsWith(",") ? line.slice(0, -1).trim() : line.trim()
        let propntype:string[] = line.split(":")
        type[propntype[0]] = propntype[1]
    })

    response[typename] = type
}

route.setController((req, res) => res.json({message: "For more information read the docs", data:response}))

export default route