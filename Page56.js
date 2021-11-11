// Exercise 1 - Minimum

const minimum = (x,y) => {
    if (x < y) {
        return x;
    } else {
        return y;
    }
}

// Exercise 2 - Recursion

const isEven = x => {

    if (x < 0) {
        console.log("Invalid number.");
    } else if (x === 0) {
        return true;
    } else if (x === 1) {
        return false;
    } else {
        return isEven(x - 2);
    }

}

// Exercise 3 - Bean Counting

const countChar = (str, letter) => {
    counter = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            counter += 1;
        }
    }
    return counter;
}

const countBs = str => {
    return countChar(str, "B");
}
