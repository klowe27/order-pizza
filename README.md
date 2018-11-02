# Order Pizza

#### Website to order a pizza, 11.2.18

#### By Kristin Brewer-Lowe

## Description

This website lets users customize a pizza and see the cost of their selection. Small pizzas are a base price of $8, mediums are $10 and larges are $12. Users get two toppings for free, but each additional topping is $.50. Extra sauce or extra cheese is $1.00 extra.

## Specifications

* User can select the size of the pizza and see the cost.
  * Input: "small"
  * Output: 8
* User can select the toppings they'd like and see the cost.
  * Input: ["pepperoni", "onion", "sausage"]
  * Output: Total + .5
* User can select any extras they would like and see the cost.
  * Input: ["cheese", "sauce"]
  * Output: Total + 2
* User can customize the pizza with a combination of size, toppings and extras and calculate total cost.
  * Input: ("small", ["pepperoni", "onions", "peppers"], ["cheese"])
  * Output: 9.5
* User can add multiple pizzas and the total cost will be calculated.
  * Input: ("small", ["pepperoni", "onions", "peppers"], ["cheese"]), ("medium", ["pineapple", "onions", "peppers", "salami"], ["cheese", "sauce"])
  * Output: 22.5
* User can enter address for delivery.
  * Input: 5555 SW Drive Portland, OR 97266
  * Output: 5555 SW Drive Portland, OR 97266

## Setup/Installation Requirements

* View directly: https://klowe27.github.io/order-pizza
* To clone, in terminal use command $ git clone https://github.com/klowe27/order-pizza.git
* Then, open index.html in any browser

## Known Bugs

There are no known bugs at this time.

## Support and contact details

If you have any questions or issues, please reach out to kristin.lowe1@gmail.com. Or, feel free to contribute to the code.

## Technologies Used

* JavaScript
* jQuery
* CSS
* Boostrap
* HTML

### License

This software is licensed under the MIT license.

Copyright (c) 2016 **Kristin Brewer-Lowe**
