const connection = require('../database/connection')

module.exports = {
    async list (Request, Response){
        const ong_id = Request.headers.authorization

        const casos = await connection('casos')
        .where('ong_id', ong_id)
        .select('*')

        return Response.json(casos);
    }
}