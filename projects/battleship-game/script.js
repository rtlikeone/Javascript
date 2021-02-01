"use-strict";

const y_axis = [...Array(7).keys()];
const x_axis = [];

for (let i of Array(7).keys()) {
    x_axis.push(String.fromCharCode("A".charCodeAt(0) + i));
}

console.log(y_axis);
console.log(x_axis);

// Create grid of divs
const grid = document.querySelector("#grid");

console.log(grid);

for (let i = 0; i < 49; i++) {
    let div = document.createElement("div");
    div.className = `cell cell${i}`;
    grid.appendChild(div);
}
