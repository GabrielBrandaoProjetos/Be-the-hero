const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async list (Request, Response){
        const ongs = await connection('ongs').select('*')//.where('nome', Request.query)
        return Response.json(ongs)    
    },
    async create (Request, Response){
        const {nome, email, whatsapp, cidade, uf} = Request.body
        const id = crypto.randomBytes(4).toString('HEX')
    
            await connection('ongs').insert({
                id,
                nome, 
                email, 
                whatsapp, 
                cidade, 
                uf,
            })
    
        return Response.json({id})
    }
}