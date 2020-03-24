const express = require("express")

class APIRouter {
    /**
     * @param {Object} config Objeto de configuración de la ruta
     * @param {"GET"|"POST"} config.method Método de la ruta
     * @param {string} config.path Dirección de la ruta
     * @param {{name:string, description:string, type:string, isRequired:boolean}[]} config.parameters Parámetros del body de la peticion
     * @param {number} config.tierAuth Nivel de autenticación de la ruta
     * @param {string} config.description Descripción de la ruta
     * @param {string} config.fileName Nombre del archivo para referencia en github
     */
    constructor(config){
        if(!config) config = {}
        this.method = config.method || "GET"
        this.path = config.path ? config.path.startsWith("/") ? config.path : `/${config.path}` : "/error"
        this.parameters = config.parameters || []
        this.tierAuth = config.tierAuth || 0
        this.description = config.description || "A route"
        this.fileName = config.fileName || "unknow.js"
        this.middlewares = []
        this.controller = null
    }

    /**
     * Checkea si la ruta está lista para producción
     * @param {APIRoute} apiroute Instancia de la ruta a checkear
     */
    static check(apiroute){
        return new Promise((res, rej) => {
            if(!(apiroute instanceof APIRouter)) rej("Esta ruta no es instancia de APIRoute")
            console.log("ckeckeado")
            res()
        })
    }

    /**
     * Coloca el controlador a la ruta.
     * @param {(req:express.Request, res:express.Response)=>void} ctrl 
     */
    setContoller(ctrl){
        this.controller = ctrl
    }

    /**
     * Añade un middleware a la ruta.
     * @param {(req:express.Request, res:express.Response, next:()=>void)=>void} ctrl
     */
    addMiddleware(ctrl){
        this.middlewares.push(ctrl)
    }

}

module.exports = APIRouter
