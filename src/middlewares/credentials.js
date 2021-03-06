
export  const credentials = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
    res.header("Access-Control-Allow-Headers",  "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    
    next();
}
