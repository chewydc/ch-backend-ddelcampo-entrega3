//-------------------------------------------------------------------
// Desafio Entregable N°3: Servidor con Express
// Se emplea archivo del desafio N°2
// Fecha de entrega tope: 24-09-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const fs = require ('fs');

class  Contenedor{
    constructor(path){
        this.path = path
        this.encoding = 'utf-8'
        this.productos = []
    }

    async save(nuevosProductos){
            try {
                let oldProd = await this.getAll()
                let id=1
                let arrayfinal
                if (oldProd) {
                    id=oldProd[oldProd.length-1].id
                    id++
                    let arrayfinal1 = nuevosProductos.map((o) => {return {...o }})
                    let arrayfinal2 = oldProd.map((o) => {return {...o}})

                    arrayfinal = arrayfinal2.concat(arrayfinal1)
                }
                else arrayfinal = nuevosProductos.map((o) => {return {...o}})

                arrayfinal.forEach(function(elem){
                    if (!elem.id) { 
                        elem.id=id++
                    }
                })
                arrayfinal = JSON.stringify(arrayfinal,null,2)
                await fs.promises.writeFile(this.path, arrayfinal)
                return --id
            } catch (error) {
                this.MuestroError(error,"save")
            }         
    }
    
    async getAll() {
        try {
            let contenido = await fs.readFileSync(this.path,this.encoding)
            if (!contenido) contenido=null
            const array = JSON.parse(contenido) 
            return array  
        } catch (error) {
            this.MuestroError(error,"getAll")
            return null
        }
    } 
    
    async getById(number){
        try {
            const a = await this.getAll()
            let filtrado = a.filter((a) => (a.id==number))
            if (!filtrado) filtrado=null 
            return filtrado
        } catch (error) {
            this.MuestroError(error,"getById")
            return "Error en conseguir el id: " + number
        }
    }

    async deleteById(number){
        try {
            const a = await this.getAll()
            let b=a.filter((a)=> (a.id != number))
            if (b.length==0) await fs.promises.writeFile(this.path,'')
            else {
                b = JSON.stringify(b,null,2)
                await fs.promises.writeFile(this.path, b)
            }
        console.log(`Borrado id: ${number} ok!`)  
        }
        catch (error) {
            this.MuestroError(error,"deleteById")
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.path,'')
            console.log("Borrado Completo ok!")
        } 
        catch (error) {
            this.MuestroError(error,"deleteAll")
        }
    }

    MuestroError(error,fnName) {console.log(`#!% --> Error en funcion ${fnName}:\n#!% --> ${error}`)}

}

module.exports = Contenedor;