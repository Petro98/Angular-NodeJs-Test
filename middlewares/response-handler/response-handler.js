const responseHandler = (method) => {
    return async (req, res, next) => {
        try {
            const result = await method(req, res, next)
           
            return res.status(200).json(result)
        } catch (e) {
            console.error(e);

            return res.status(e.errorCode ? e.errorCode : 404).json({
                message: e.message
            });
        }
    }
}

module.exports = {
    responseHandler
}
