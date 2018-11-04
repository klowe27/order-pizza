// Business Logic for Order
function Order() {
  this.pizzas = [];
  this.total = 0;
  this.currentId = 0;
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
  this.total += pizza.calculateCost();
}

Order.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Order.prototype.findPizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

Order.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        this.total -= this.pizzas[i].cost;
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Pizza
function Pizza(size, crust, toppings, extras) {
  this.size = size;
  this.crust = crust;
  this.toppings = toppings;
  this.extras = extras;
  this.toppingsCost = 0;
  this.extrasCost = 0;
  this.cost = 0;
}

Pizza.prototype.calculateCost = function() {
  if (this.size === "Small") {
    this.cost += 8;
  } else if (this.size === "Medium") {
    this.cost += 10;
  } else if (this.size === "Large") {
    this.cost += 12;
  }
  for (var i = 0; i < (this.toppings.length - 2); i++) {
    this.toppingsCost += .5;
  }
  for (var i = 0; i < this.extras.length; i++) {
    this.extrasCost += 1;
  }
  this.cost += (this.extrasCost + this.toppingsCost);
  return this.cost;
}

// Business Logic for User
function User(name, address){
  this.name = name;
  this.address = address;
}

User.prototype.displayUser = function(){
  $(".deliveryAddress").before(
    "<div class='pizza'>" +
    "<p><strong>Name: </strong>" + this.name + "<br>" +
    "<strong>Delivery Address: </strong>" + this.address +
  "</div>")
}

// Business Logic
function currency(value) {
  return Number.parseFloat(value).toFixed(2);
}

function attachClickListeners(order) {
  $(".pizzaList").on("click", ".viewButton", function() {
    showPizzaDetails(this.id);
  });
  $(".pizzaList").on("click", ".deleteButton", function() {
    order.deletePizza(this.id);
    displayPizzas(order);
  });
};

function displayPizzas(order) {
  var pizzaList = $(".pizzas");
  var htmlForPizzas = "";
  order.pizzas.forEach(function(pizza) {
    htmlForPizzas += "<div class='pizza'>" +
    "<h4>" + pizza.size +" Pizza</h4>" + "<button class='viewButton viewButton" + pizza.id + "' id='" + pizza.id + "'>View</button>" + "<button class='deleteButton' id='" + pizza.id + "'>Delete</button>" +
    "<p><strong>Price: </strong>$" + currency(pizza.cost) + "</p>" +
      "<div class='pizzaDetails details" + pizza.id + "'>" +
        "<p><strong>Crust: </strong>" + pizza.crust + "<br>" +
        "<strong>Toppings: </strong>" + pizza.toppings.join(', ') + " (+$" + currency(pizza.toppingsCost) + ")<br>" +
        "<strong>Extras: </strong>" + pizza.extras.join(', ') + " (+$" + currency(pizza.extrasCost) + ")</p>" +
      "</div>" +
    "</div>"
  });
  pizzaList.html(htmlForPizzas);
  $(".total").html(currency(order.total));
};

function showPizzaDetails(id) {
  $('.details' + id).slideToggle();
};


// User Interface Logic
$(document).ready(function(){
  var order = new Order();
  var user;
  var pizza;
  attachClickListeners(order);

  $("#pizzaForm").submit(function(event){
    event.preventDefault();
    $(".sizeHelp").hide();
    $(".crustHelp").hide();

    var size = $("input:radio[name=size]:checked").val();
    var crust = $("input:radio[name=crust]:checked").val();
    var toppings = [];
    var extras = [];

    $("input:checkbox[name=topping]:checked").each(function(){
      var topping = $(this).val();
      toppings.push(topping);
    });
    $("input:checkbox[name=extras]:checked").each(function(){
      var extra = $(this).val();
      extras.push(extra);
    });

    if (!size || !crust) {
      if (!size){
        $(".sizeHelp").show();
      }
      if (!crust){
        $(".crustHelp").show();
      }
    } else {
      pizza = new Pizza (size, crust, toppings, extras);
      console.log(pizza);

      order.addPizza(pizza);
      displayPizzas(order);

      $("input:radio[name=size]").prop('checked', false);
      $("input:radio[name=crust]").prop('checked', false);
      $("input:checkbox[name=topping]").prop('checked', false);
      $("input:checkbox[name=extras]").prop('checked', false);
    }

  });

  $("#checkout").click(function(){
    $("#orderProcess").hide();
    $("#delivery").show();
  })

  $("#deliveryForm").submit(function(event){
    event.preventDefault();
    $("#name").removeClass("is-invalid");
    $("#street").removeClass("is-invalid");
    $("#city").removeClass("is-invalid");
    $("#state").removeClass("is-invalid");
    $("#zip").removeClass("is-invalid");

    var name = $("#name").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var address = street + " " + city + ", " + state + " " + zip;

    if (!name || !street || !city || !state || !zip) {
      if (!name){
        $("#name").addClass("is-invalid");
      }
      if (!street){
        $("#street").addClass("is-invalid");
      }
      if (!city){
        $("#city").addClass("is-invalid");
      }
      if (!state){
        $("#state").addClass("is-invalid");
      }
      if (!zip){
        $("#zip").addClass("is-invalid");
      }
    } else {
      user = new User(name, address);

      $("#delivery").hide();
      $("#reviewOrder").show();
      user.displayUser();
    }
  })
});
