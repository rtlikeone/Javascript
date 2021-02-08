"use-strict";

const input_field = document.querySelector("#insert-target");
const fire_button = document.querySelector("#fire-button");
const grid = document.querySelector("#grid");
const y_axis = [...Array(7).keys()];
const x_axis = [];

// Set values in x_axis
for (let i of Array(7).keys()) {
    x_axis.push(String.fromCharCode("G".charCodeAt(0) - i));
}

// console.log(y_axis);
// console.log(x_axis);
// console.log(grid);

// Populate grid with divs
for (let i in x_axis) {
    for (let j of y_axis) {
        let div = document.createElement("div");
        div.className = `cell cell${x_axis[i]}`;
        div.id = `${x_axis[i]}${j + 1}`;
        grid.appendChild(div);
    }
}

function showTarget() {
    console.log(`Target: ${input_field.value}`);
    input_field.value = "";
}

fire_button.addEventListener("click", showTarget);

input_field.addEventListener("keydown", (e) => {
    const divs = grid.childNodes;

    if (e.key === "Enter") {
        for (let i = 0; i < grid.childNodes.length; i++) {
            if (divs[i].id == e.target.value) {
                divs[i].style.backgroundColor = "red";
            }
        }
        console.log(`Target: ${e.target.value}`);
        e.target.value = "";
    }
});
