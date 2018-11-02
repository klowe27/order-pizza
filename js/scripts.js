// Business Logic
function Order() {
  this.pizzas = [];
  this.total = 0;
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
  if (this.size === "Small") {
    this.cost += 8;
  } else if (this.size === "Medium") {
    this.cost += 10;
  } else if (this.size === "Large") {
    this.cost += 12;
  }
  for (var i = 0; i < (this.toppings.length - 2); i++) {
    this.cost += .5;
  }
  for (var i = 0; i < this.extras.length; i++) {
    this.cost += 1;
  }
  return this.cost;
}

Pizza.prototype.displayPizza = function() {
  $(".orderTotal").before(
    "<div class='pizza'>" +
    "<h4>" + this.size + "</h4>" +
    "<p><strong>Crust: </strong>" + this.crust + "<br>" +
    "<strong>Toppings: </strong>" + this.toppings.join(", ") + "<br>" +
    "<strong>Extras: </strong>" + this.extras.join(", ") + "<br>" +
    "<strong>Cost: </strong>$" + currency(this.cost) + "</p>" +
    "</div>"
  )
}

function currency(value) {
  return Number.parseFloat(value).toFixed(2);
}

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

// User Interface Logic
$(document).ready(function(){
  var order = new Order();
  var pizza;
  var user;

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

      order.total += pizza.calculateCost();
      order.addPizza(pizza);
      pizza.displayPizza();

      $(".total").html(currency(order.total));

      $("input:radio[name=size]").prop('checked', false);
      $("input:radio[name=crust]").prop('checked', false);
      $("input:checkbox[name=topping]").prop('checked', false)
      $("input:checkbox[name=extras]").prop('checked', false)
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
