var express = require("express")
var app = express()

// Server port
var HTTP_PORT = 8000 

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});



app.post("/ola", (req, res, next) => {

    let livros = req.body.livros
    let options = req.body.options

    function comparator(a,b) {
        var i = -1,
        length = options.props.length,
        ordersLength = options.orders.length;
        props = options.props;
        orders = options.orders;
        
        while (++i < length) {
            var result = a[props[i]].localeCompare(b[props[i]]);
            if (result) {
                if (i >= ordersLength) {
                    return result;
                }
                var order = orders[i];
                return result * (order == 'desc' ? -1 : 1);
            }
        }
    }

    livros.sort(comparator);
    res.json(livros);
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/ola", (req, res, next) => {
    res.json({"message":"Ao invés de um GET, use um POST com os parametros certos no JSON para ordenar os livros!"})
});




// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});