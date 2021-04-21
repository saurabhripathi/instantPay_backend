const RequestResponseLog= require('../models/req_res_log')
module.exports={
    async saveRequestResponseLog(req, response) {
        let ReqResLog = new RequestResponseLog({
            request_url   : req.baseUrl + req.url,
            method        : req.method,
            request_IP    : req.ip,
            request_header: req.headers,
            request_body  : req.body,
            response      : response,
            status_code   : response.code,
        });
        
        return await ReqResLog.save();
    },
    getResponse(req,res,data=null,code=200)
    {
        let response = new Object({
            status:"success", 
            code  : code
        });

        if(data === null) {
            response.data = [];
        } else if(data !== null) {
            response.data = data;
        }

        this.saveRequestResponseLog(req,response)

        
    },

    getErrorResponse(req, res, keys = [ 'action_failed' ], code = 500) {
        let response = new Object({
            status: "Bad request",
            code  : code,
            errors: []
        });
        
        keys.forEach((key) => {
            response.errors.push(key);
        });
        
        this.saveRequestResponseLog(req, response);
        return res.status(code).send(response);
    }
}