const authorization = (...accessList) => {
    return (req, res, next) => {
        if(!accessList.includes(req.user.role)){
            return res.status(401).json({message:"Access denied"})
        }
        next()
    }
}

module.exports = authorization