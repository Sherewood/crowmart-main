const express = require('express')
const path= require ('path')
const app = express()
//Configuration of Express, these options are what allow the program to load additional resources rather than just the html
app.use(express.json())
app.use(express.static('images'))
app.use(express.static('css'))
//In order to keep a persistent collection of item, I created a backend. This server file maintains the data and sends it to the seperate areas using express and ejs.
app.engine('html', require('ejs').renderFile);
app.set("view engine", "text/javascript");
//the two values we need to keep track of, car and total
const cart=[]
var total=0
//GET request
app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/crows.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/crows.html'));
});
//When GET-ing the cart, loads the cart values
app.get('/cart.html', function(req, res) {
	//when called, tallies up the total price for the customer and sends the data to the html
  total=0
  for (var i=0; i<cart.length; i++)
  {
	  for (let c=0; c<cart[i][2];c++)
	  {
		  total+=parseInt(cart[i][1])
	  }
  }
  res.render(path.join(__dirname, '/cart.html'), {cart:cart,total:total});
});
app.get('/accessories.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/accessories.html'));
});
//POST function, for when someone wants to add an item to cart
app.post("/addCart",addtoCart)
function addtoCart(req,res,next)
{

	//the function will take in the information of the added item, assign them specifically to entries of the table and push it to cart/
	let entry=[req.body.name,req.body.price,req.body.quantity,0] //takes in the name, price,quantity and total cost of the items
	for(var i=0; i<cart.length;i++)
	{
		
		if (cart[i][0]==req.body.name) //if the item already exists in the list, will mark up quantity and then add the price to the total cost
		{
			cart[i][2]+=1 //increasing the qunatity of the item if it already exists in the list 
			cart[i][3]+=parseInt(cart[i][1]) //increases the total cost for said item
			
			return //if it finds the item, there's no more need to iterate through		
			}
	}
  	//if there is no entry in cart, this will make one/ 
	
	entry[3]+=parseInt(entry[1])
	cart.push(entry)
	
}
//server listener 
app.listen(3001);
console.log('Server running at http://127.0.0.1:3001/');