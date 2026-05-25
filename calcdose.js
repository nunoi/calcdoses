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
var carouselDisplay = document.getElementById("carouselDisplay");
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
nameDisplay?.addEventListener("focusout", handleNameChange);

if (localStorage.getItem("children") === null) {
    addChild();
} else {
    // load pre-existing children
}

hasChanged = false;
timerID = 0;
updateDisplay();

slider.oninput = function () {
    children[curChild].weight = this.value;
    hasChanged = true;
    updateDisplay();
}

function addChild() {
    num = children.length + 1;
    child = new Child("Criança" + num, 100);
    children.push(child);
    hasChanged = true;
}

function handleNameChange() {
    // alert("bla bla name changed");
    if (children[curChild].name !== nameDisplay.innerHTML) {
        children[curChild].name = nameDisplay.innerHTML;
    }
    hasChanged = true;
}

function handleDec() {
    children[curChild].weight = +children[curChild].weight - +1;
    hasChanged = true;
    updateDisplay();
}

function handleInc() {
    children[curChild].weight = +children[curChild].weight + +1;
    hasChanged = true;
    updateDisplay();
}

function handleChildDec() {
    curChild -= 1;
    nameDisplay.innerHTML = children[curChild].name;
    weightDisplay.innerHTML = normWeight(children[curChild].weight);
    updateDisplay();
}

function handleChildInc() {
    curChild += 1;
    if (curChild + 1 > children.length) {
        addChild();
    }
    nameDisplay.innerHTML = children[curChild].name;
    weightDisplay.innerHTML = normWeight(children[curChild].weight);
    updateDisplay();
}

function handleChildDel() {
    children.splice(curChild, 1);
    if (children.length == 0) {
        addChild();
    }
    hasChanged = true;
    updateDisplay();
}

function saveData() {
    hasChanged = false;
    clearTimeout(timerID);
    updateDisplay();
}

// benuron
// max dose: 15mg/kg/dose
//
// brufen
// max dose: 20-30mg/kg/day
// max dose: 6.6-10mg/kg/dose (8h interval)
function updateDisplay() {
    // alert(curChild + " : " + children.length);
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
    updateCarousel();
    if (curChild == 0) {
        childDec.setAttribute('disabled', '');
    } else {
        childDec.removeAttribute('disabled');
    }
    if (hasChanged) {
        timerID = setTimeout(function () { saveData(); }, 10000);
        save.removeAttribute('disabled');
    } else {
        save.setAttribute('disabled', '');
    }
}

function updateCarousel() {
    max = children.length;
    str = "";
    for (let i = 0; i < max; i++) {
        curChild === i ? sub = "●" : sub = "○";
        str += sub;
    }
    carouselDisplay.innerHTML = str;
}

function normWeight(w) {
    return Number(w / 10).toFixed(1);
}