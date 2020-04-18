module.exports = function(app){
    app.get('/', function(req, res){
        res.send('hello test from react app')
    })
}