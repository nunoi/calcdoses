// calcdose

class Child {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}

const children = [];
curChild = 0;

var slider = document.getElementById("weightRange");
var nameDisplay = document.getElementById("nameDisplay");
var weightDisplay = document.getElementById("weightDisplay");
var benuronDisplay = document.getElementById("benuronDisplay");
var brufen20Display = document.getElementById("brufen20Display");
var brufen40Display = document.getElementById("brufen40Display");

dec?.addEventListener("click", handleDec);
inc?.addEventListener("click", handleInc);
childDec?.addEventListener("click", handleChildDec);
childInc?.addEventListener("click", handleChildInc);
childDel?.addEventListener("click", handleChildDel);
save?.addEventListener("click", saveData);

if (localStorage.getItem("children") === null) {
    addChild();
} else {
    // load pre-existing children
}

updateDisplay(children[curChild]);

slider.oninput = function () {
    children[curChild].weight = this.value;
    updateDisplay();
}

function addChild() {
    num = children.length + 1;
    child = new Child("Criança" + num, 100);
    children.push(child);

}

function handleDec() {
    children[curChild].weight = +children[curChild].weight - +1;
    updateDisplay();
}

function handleInc() {
    children[curChild].weight = +children[curChild].weight + +1;
    updateDisplay();
}

function handleChildDec() {
    curChild -= 1;
    nameDisplay.innerHTML = children[curChild].name;
    weightDisplay.innerHTML = normWeight(children[curChild].weight);
    if (curChild == 0) {
        childDec.setAttribute('disabled', '');
    }
}

function handleChildInc() {
    addChild();
    curChild += 1;
    nameDisplay.innerHTML = children[curChild].name;
    weightDisplay.innerHTML = normWeight(children[curChild].weight);
    childDec.removeAttribute('disabled');
}

function handleChildDel() {
    childDec.removeAttribute('disabled');
}

function saveData() {
    save.setAttribute('disabled', '');
}

// benuron
// max dose: 15mg/kg/dose
//
// brufen
// max dose: 20-30mg/kg/day
// max dose: 6.6-10mg/kg/dose (8h interval)
function updateDisplay() {
    child = children[curChild];
    w = child.weight;
    nameDisplay.innerHTML = child.name;
    weightDisplay.innerHTML = normWeight(child.weight);
    slider.value = w;
    ben = Math.round((w / 10) * (15 / 40) * 10) / 10;
    bru20 = Math.round((w / 10) * (7 / 20) * 10) / 10;
    bru40 = Math.round((w / 10) * (7 / 40) * 10) / 10;
    benuronDisplay.innerHTML = Number(ben).toFixed(1);
    brufen20Display.innerHTML = Number(bru20).toFixed(1);
    brufen40Display.innerHTML = Number(bru40).toFixed(1);
    setTimeout(function() { saveData(); }, 5000);
}

function normWeight(w) {
    return Number(w / 10).toFixed(1);
}