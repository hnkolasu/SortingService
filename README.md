# sortingService
 
 This is a service that sorts the books it receives by any parameter, in ascending or descending order.
 it works by receiving the JSON by the POST request, reading from the JSON which parameter the books must be sort by, and in which order, it then sorts by the primary parameter. In the case of a tie, it goes to a secondary parameter if there is one, and so on. It then responds with a JSON with all the books in the requested order.

 The JSON must be passed by the request body and the formatting must be as follows:

 {
     "books": [
         {
             "id":"01",
             "title":"title 1",
             "author":"author 1",
             "edition":"edition 1"
         },
         {
             "id":"02",
             "title":"title 2",
             "author":"author 2",
             "edition":"edition 2"
         }
     ],
     "options":
     {
         "filters":["edition", "author", "title"],
         "orders":["desc", "desc", "asc"]
     }
 }

A few notes:
The "books" parameter holds an array of objects where each object is a book on the list. It can hold as many books and each book can have as many filters as you'd like, as long as it follows this pattern.

The "options" parameter holds the filters, and the respective orders of the filters.

The information must always be sent as a string.


How to run the project locally:

After cloning the project, open the terminal and execute the command "npm install"
After that, run the project by using the command "npm start"
While running, send a POST request to localhost:8000/books with the correctly formatted JSON

test

I used nodejs v14.17.5, and Visual Studio Code
