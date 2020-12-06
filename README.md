# 🎄 Advent of Code 2020 | Pure JS Edition 🎄

This is an attempt to complete all challenges for 2020's Advent of Code using pure, functional JavaScript, with the following central limitation:

> Arrow functions with single-line bodies **only**, i.e. no function blocks / return statements allowed
 
 The main problem with this approach is that code will generally be less readable than if I was allowed to use multi-line features such as variable declaration, object/array destructuring, if/switch statements, etc. However, I decided to gift myself an early christmas present of being hard on myself for no good reason.
 
 The benefits of this approach are:
 * While being less _readable_ in one sense, with proper Prettier formatting, chained functions demonstrate their inherent readability
 * Most of the AoC20 challenges are line-by-line array parsing — meaning I get to leverage, and learn more about, JS's array methods
 * I have to be more inventive by prohibiting the use of array method function-blocks...
 
 Some examples:
 
 #### Using `.reduce()` to get a total
 ```es6
 // Usually:
 // { ...
 const figure1 = 1000;
 const figure2 = 1020;
 return figure1 + figure2;
 
 // With reduce:
 // => 
 [1000, 1020].reduce((total, figure) => total + figure, 0)
 ```
 
 #### Carrying-over a parent array
 ```es6
 // Usually:
 // { ...
 const intermediateArray = [1, 2, 3];
 return intermediateArray.find((figure, index) => figure + intermediateArray[index + 1] === 5);
 
 // Carrying-over:
 // =>
 [1, 2, 3].find((figure, index, numbers) => figure + numbers[index + 1] === 5);
 ```
 
