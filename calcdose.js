// calcdose

function Child(name, weight) {
    this.name = name;
    this.weight = weight;
}

child = new Child("Criança1", 20);

const children = [];

children.push(child);

var slider = document.getElementById("weightRange");
var nameDisplay = document.getElementById("nameDisplay");
var weightDisplay = document.getElementById("weightDisplay");
var benuronDisplay = document.getElementById("benuronDisplay");
var brufen20Display = document.getElementById("brufen20Display");
var brufen40Display = document.getElementById("brufen40Display");
var childDec = document.getElementById("cdec");
var childInc = document.getElementById("cinc");

dec?.addEventListener("click", handleDec);
inc?.addEventListener("click", handleInc);
childDec?.addEventListener("click", handleChildDec);
childInc?.addEventListener("click", handleChildInc);


if (localStorage.getItem("children") === null) {
    // init example child
} else {
    // load pre-existing children
}

name = children[0].name;
weight = children[0].weight;

updateWeight(weight);

slider.oninput = function () {
    weight = this.value;
    updateWeight(weight);
}

function handleDec() {
    weight = +weight - +1;
    updateWeight(weight);
}

function handleInc() {
    weight = +weight + +1;
    updateWeight(weight);
}

function handleChildDec() {
    weight = +weight - +1;
    updateWeight(weight);
}

function handleChildInc() {
    // weight = +weight + +1;
    // updateWeight(weight);
    childDec.removeAttribute('disabled');
}

function saveWeight() {
    w = weight.toString();
    localStorage.setItem('weight', w);
}

// benuron
// max dose: 15mg/kg/dose
//
// brufen
// max dose: 20-30mg/kg/day
// max dose: 6.6-10mg/kg/dose (8h interval)
function updateWeight(w) {
    nameDisplay.innerHTML = name;
    weightDisplay.innerHTML = Number(w / 10).toFixed(1);
    slider.value = weight;
    ben = Math.round((w / 10) * (15 / 40) * 10) / 10;
    bru20 = Math.round((w / 10) * (7 / 20) * 10) / 10;
    bru40 = Math.round((w / 10) * (7 / 40) * 10) / 10;
    benuronDisplay.innerHTML = Number(ben).toFixed(1);
    brufen20Display.innerHTML = Number(bru20).toFixed(1);
    brufen40Display.innerHTML = Number(bru40).toFixed(1);
    setTimeout(function() { saveWeight(); }, 5000);

}
