'use strict';

/*
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES 5
  //numPassengers = numPassengers || 1;
  //price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);


const flight = 'LH234';
const lovre = {
  name: 'Lovre B',
  passport: 8591431243,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 8591431243) alert('Checked in');
  else alert('Wrong passport');
};

checkIn(flight, lovre);
// const flightNum = flight;
// const passenger = jonas;
console.log(flight);
console.log(lovre);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(lovre);
checkIn(flight, lovre);
// We are passing the reference TO the function but not BY the function !



const oneWord = function (str) {
  //return str.replaceAll(' ', '').toLowerCase();
  return str.replaceAll(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by function: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// in transformer function we are passing the call back function and then transformer function will call those call back function

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
// in this example addEventListener is High-Order function and high5 is call-back function

['lovre', 'stipe', 'duje'].forEach(high5);



const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const myGreet = greet('Hey');
myGreet('Lovre');
myGreet('Duje ');

greet('Hello')('Duje');

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Lovre');



const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
  };
  
  lufthansa.book(239, 'Lovre');
  lufthansa.book(635, 'John Smith');
  console.log(lufthansa.bookings);
  
  const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
  };
  const book = lufthansa.book;
  
  // Does not work
  // book(23, 'Sarah Williams');
  
  // This is how we do it
  // CALL METHOD
  book.call(eurowings, 23, 'Sarah Williams');
  console.log(eurowings);
  
  book.call(lufthansa, 239, 'Stan Smith');
  console.log(lufthansa);
  
  const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
  };
  
  book.call(swiss, 333, 'Lovre B');
  book.call(swiss, 123, 'Peter Parker');
  //console.log(swiss);
  
  // APPLY METHOD
  const flightData = [583, 'George Washington'];
  book.apply(swiss, flightData);
  console.log(swiss);
  
  // better option
  book.call(swiss, ...flightData);
  console.log(swiss);
  
  // Bind method
  // book.call(eurowings, 23, 'Sarah Williams');
  
  // bind will not call a function, it will return a new function where THIS keyword is always the same
  const bookEW = book.bind(eurowings);
  const bookLH = book.bind(lufthansa);
  const bookLX = book.bind(swiss);
  bookEW(23, 'Steven Williams');
  bookLH(55, 'Stephen Curry');
  bookLX(77, 'Amadeus Mart');
  
  const bookEW23 = book.bind(eurowings, 23);
  bookEW23('Marco Polo');
  bookEW23('Lovre Beg');
  
  // With Event Listeners
  lufthansa.planes = 300;
  lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
  };
  //lufthansa.buyPlane();
  document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
  
  // Partial application
  const addTax = (rate, value) => value + value * rate;
  console.log(addTax(0.1, 200));
  
  const addVAT = addTax.bind(null, 0.23);
  
  console.log(addVAT(100));
  console.log(addVAT(23));
  
  const addTaxRate = function (rate) {
    return function (value) {
      return value + value * rate;
    };
  };
  const addVAT2 = addTaxRate(0.23);
  console.log(addVAT2(100));
  console.log(addVAT2(23));
  


const poll = {
  question: 'What is your favourite programming language ?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer(answer) {
    const a = Number(
      prompt(`${this.question}\n${this.options.join(
        '\n'
      )}\n(Write option number)
    `)
    );

    typeof a === 'number' && a < this.answers.length
      ? this.answers[a]++
      : console.log('You writted invalid option.');

    this.displayResult('array');
    this.displayResult('string');
  },
  displayResult(type) {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string')
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// Writing { answers: [...]} we sent new object so THIS keyword will apply to the new object we have send
poll.displayResult.call({ answers: [5, 2, 3] }, 'string');
poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] }, 'array');

// Test data for bonus:
// * Data 1: [5, 2, 3]
// * Data 2: [1, 5, 3, 9, 6, 1]



const runOnce = function () {
  console.log('This will never run again !');
};
runOnce();
runOnce();

console.log('-----');
// IIFE Immediately Invoked Funciton Expresion
(function () {
  console.log('This will never run again !');
  const isPrivate = 23;
})();

//console.log(isPrivate);

(() => console.log('This will ALSO never run again !'))();

{
  const isPrivate = 23;
  var notPrivate = 22;
}
//console.log(isPrivate);
console.log(notPrivate);


const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);



// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// CLOSURE even has priority over the SCOPE chain
const perGroup = 1000;
boardPassengers(180, 3);

*/

// Your tasks:
// 1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!

// Coding challenge #2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
