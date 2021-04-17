const connection = require('../database/connection')

module.exports = {
    async list (Request, Response){
        const {page = 1} = Request.query
        const [count] = await connection('casos').count()

        const casos = await connection('casos')
        .join('ongs', 'casos.ong_id', '=', 'ongs.id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'casos.*',
            'ongs.nome',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.cidade',
            'ongs.uf',
        ]);

        Response.header('X-Total-Count', count['count(*)'])

        return Response.json(casos)
    },
    async create (Request, Response){
        const {titulo, descricao, valor} = Request.body
        const ong_id = Request.headers.authorization
        const [id] = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id,
        })
        return Response.json({id})
    },

    async delete (Request, Response){
        const {id} = Request.params
        const ong_id = Request.headers.authorization

        const caso = await connection('casos')
        .where('id', id)
        .select('ong_id')
        .first()

        if (caso.ong_id != ong_id){
            return Response.status(401).json({error: 'Operação não permitida!'})
        }

        await connection('casos').where('id', id).delete();
        return Response.status(204).send();
    }

}