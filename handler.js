//var xhttp=new XMLHttpRequest()
function sCrow()
{
	console.log("but")
}
document.getElementById("cHouse").addEventListener("click", function(){
	console.log("ASD")
	let crow=document.getElementById("housePrice").innerText
	crow=crow.split('Add')
	crow=crow[0].replaceAll('\n','')
	crow=crow.split('$')
	let name=crow[0]
	let price=crow[1]
	let quantity=1
	var xhttp= new XMLHttpRequest()
	xhttp.open("POST", "/addCart", true)
	xhttp.setRequestHeader("Content-Type", "application/json")
	console.log(JSON.stringify({name:name, price:price, quantity:quantity}))
	xhttp.send(JSON.stringify({name:name, price:price, quantity:quantity}))
})
document.getElementById("sky-crow").addEventListener("click", function(){
	console.log("running2")
})
document.getElementById("canyon-crow").addEventListener("click", function(){
	console.log("running3")
})