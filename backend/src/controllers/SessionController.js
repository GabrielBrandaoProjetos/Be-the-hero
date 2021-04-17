const connection = require('../database/connection')

module.exports = {
    async create(Request, Response){
        const {id} = Request.body

        const ong = await connection('ongs')
        .where('id', id)
        .select('nome')
        .first()

        if (!ong){
            return Response.status(404).json({error: 'Não existe ONG com o ID: ' + id})
        }
        return Response.json(ong)
    }
}