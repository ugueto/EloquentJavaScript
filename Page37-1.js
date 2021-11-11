// Exercise 1: Triangle

let triangle = '#';
while (triangle.length < 8) {
    console.log(triangle);
    triangle = triangle + '#';
}

// Exercise 2: FizzBuzz

for (let counter = 1; counter < 101; counter++) {
    if (counter % 3 == 0 && counter % 5 == 0) {
            console.log("FizzBuzz");
    } else if (counter % 3 === 0) {
            console.log("Fizz");
    } else if (counter % 5 === 0) {
            console.log("Buzz");
    } else {
            console.log(counter);
    }
}

// Exercise 3: Chessboard

let size = 8;

let board = "";

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if ((x + y) % 2 == 0) {
      board += " ";
    } else {
      board += "#";
    }
  }
  board += "\n";
}
