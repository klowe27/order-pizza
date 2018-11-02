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
  if (this.size === "small") {
    this.cost += 8;
  } else if (this.size === "medium") {
    this.cost += 10;
  } else if (this.size === "large") {
    this.cost += 12;
  }
  for (var i = 0; i < this.toppings.length - 2; i++) {
    this.cost += .5;
  }
  for (var i = 0; i < this.extras.length; i++) {
    this.cost += 1;
  }
  return this.cost;
}

// User Interface Logic
$(document).ready(function(){
  var order = new Order();
  $("#pizzaForm").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var crust = $("input:radio[name=crust]:checked").val();
    var toppings = [];
    $("input:checkbox[name=topping]:checked").each(function(){
      var topping = $(this).val();
      toppings.push(topping);
    });
    var extras = [];
    $("input:checkbox[name=extras]:checked").each(function(){
      var extra = $(this).val();
      extras.push(extra);
    });
    var pizza = new Pizza (size, crust, toppings, extras);
    order.addPizza(pizza);
    var cost = pizza.calculateCost();
    console.log(size);
    console.log(pizza);
    console.log(order);
    console.log(cost);

  });
});
