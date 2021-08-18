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



function sortingServiceException(message) { // function to send an error when needed
    const error = new Error(message);
    return error;
  }



app.post("/books", (req, res, next) => {

    if(req.body.options.filters.length || req.body.options.orders.length == 0){  // Throws an error if the filters or orders are empty

        throw new sortingServiceException('"options" cannot be empty');
    
    }


    // Sets up books and options variables
    let books = req.body.books
    let options = req.body.options


    //comparator function takes "a" and "b" as variables, as these variables are needed for the sort() function, where the comparator function is called
    function comparator(a,b) { 
        var i = 0,
        length = options.filters.length,
        ordersLength = options.orders.length;
        filters = options.filters;
        orders = options.orders;
        

        //the while runs through for each parameter

        while (i < length) {

            var result = a[filters[i]].localeCompare(b[filters[i]]);         //a and b are each books which here are compared, and return 1, 0, or -1, if "a" is first, equal or after "b" respectively 
            
            if (result) {                                                    // If the result is 0, which means they are equal, it doesnt enter this if, and the next parameter is tested

                if (i >= ordersLength) {                                     //returns result to sort if all filters are tested
                    return result;
                }

                var order = orders[i];
                return result * (order == 'desc' ? -1 : 1);                  // checks order, if its descending sends -1, else 1
            }

        ++i
        }
    }

    books.sort(comparator);
    res.json(books);
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/books", (req, res, next) => { // since GET request are the most common, this is a good way to signal if the requester is making this mistake
    res.json({"message":"Instead of sending a GET request, send a POST request to sort the books!"})
});




// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});