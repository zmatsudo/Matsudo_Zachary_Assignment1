var express = require('express');
var app = express();
const querystring = require('node:querystring');
app.use(express.urlencoded({ extended: true }));

/* Functions referenced from Lab 8 (IsNonNegInt). This is used to check if the input is a postive while number. 
Negative values, decimals, letters and other characters will output an error message*/
  function  isNonNegativeInteger (queryString, returnErrors = false) {
      errors = []; // assume no errors at first
  if(Number(queryString) != queryString) errors.push('Not a number!'); // Check if string is a number value
  if(queryString < 0) errors.push('Negative value!'); // Check if it is non-negative
  if(parseInt(queryString) != queryString) errors.push('Not an integer!'); // Check that it is an integer

  if (returnErrors) {
      return errors;
  }
  else if (errors.length == 0) {
      return true;
  }
  else {
      return false;
  }
  };

// Routing 
var products = require(__dirname + '/product_data.json');
//monitor requests
app.get("/product_data.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    //Send string of data as response to requests
    response.send(products_str);
 });


// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

    // process purchase request (validate quantities, check quantity available)
    // This was referenced from Lab 13, Professor Kazmans Lab 13 repo and https://www.geeksforgeeks.org/node-js-querystring-stringify-method/.
    // This is used to check the quantity that is entered into the ${quantity[i]} textboxes
    // If a valid quantity is entered then the user is taken to the invoice page and the quantity entered in the textbox is displayed on the table
    // If an invalid quantity is entered then the user will still be at the home page with the error message in the querystring

app.post("/Purchase", function (request, response) {
    var q;
    var text_qty = true;
    for (i = 0; i < products_array.length; i++) {
        q = request.body['quantity' + i];
        if (typeof q != 'undefined') {
            if (isNonNegativeInteger(q))  {
                text_qty = false;
            }
        }
    }
    if (text_qty ==  false) {
        response.redirect("./invoice.html?" + querystring.stringify(request.body));
    } else {
        response.redirect("./home.html?" + querystring.stringify(request.body) + `&error=Invalid%20Quantity`);
    }
});

// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));