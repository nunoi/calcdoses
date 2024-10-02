var slider = document.getElementById("weightRange");
var weightDisplay = document.getElementById("weightDisplay");
var benuronDisplay = document.getElementById("benuronDisplay");
var brufen20Display = document.getElementById("brufen20Display");
var brufen40Display = document.getElementById("brufen40Display");

dec?.addEventListener("click", handleDec);
inc?.addEventListener("click", handleInc);

weight = slider.value;
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

function updateWeight(w) {
    weightDisplay.innerHTML = Number(w / 10).toFixed(1);
    slider.value = weight;
    ben = Math.round((w / 10) * (15 / 40) * 10) / 10;
    bru20 = Math.round((w / 10) * (7 / 20) * 10) / 10;
    bru40 = Math.round((w / 10) * (7 / 40) * 10) / 10;
    benuronDisplay.innerHTML = Number(ben).toFixed(1);
    brufen20Display.innerHTML = Number(bru20).toFixed(1);;
    brufen40Display.innerHTML = Number(bru40).toFixed(1);;
}
