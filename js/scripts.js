// Business Logic
function Order() {
  this.pizzas = [];
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

function Pizza(size, crust, toppings, extras) {
  this.size = size;
  this.crust = crust;
  this.toppings = toppings;
  this.extras = extras;
  this.cost = 0;
}

Pizza.prototype.calculateCost = function() {
  if (this.size = "small") {
    this.cost += 8;
  } else if (this.size = "medium") {
    this.cost += 10;
  } else if (this.size = "large") {
    this.cost += 12;
  } else if (this.size = "x-large") {
    this.cost += 14;
  }
  for (var i = 0; i < this.toppings.length - 2; i++) {
    this.cost += .50;
  }
  for (var i = 0; i < this.extras.length; i++) {
    this.cost += 1.00;
  }
  return this.cost;
}

var pizza = new Pizza ("medium", "thin", ["peperoni", "sausage", "pepper", "onion"], ["cheese"]);

pizza.calculateCost();

// User Interface Logic
$(document).ready(function(){

});
