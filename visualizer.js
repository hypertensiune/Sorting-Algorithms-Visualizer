const canv = document.getElementById("visualizerCanvas");
const ctx2 = canv.getContext("2d");

canv.width = 0.9375 * innerWidth;
canv.height = 0.81 * innerHeight;

const slider = document.getElementById("myRange");
const elSlider = document.getElementById("elRange");

const btnBubble = document.getElementById("bubbleSort");
const btnInsertion = document.getElementById("insertionSort");
const btnSelection = document.getElementById("selectionSort");
const btnQuick = document.getElementById("quickSort");
const btnCocktail = document.getElementById("cocktailSort");
const btnShell = document.getElementById("shellSort");
const btnMerge = document.getElementById("mergeSort");

var arr = [];
var numberOfEl = 250;
var margin = 1;
var speed = slider.value;
var sorted = false;
var alreadySelected = btnBubble;
var elWidth = 1;
var space = 0;
var x = elWidth + space;
var multiplier;
var color = "white";
var ho;

window.onload = function () {
    updateData(elSlider);
    generateArray();
}

function updateData(obj) {
    numberOfEl = obj.value;
    elWidth = Math.round((canv.width / numberOfEl) * 1) / 1;
    margin = (canv.width - elWidth * numberOfEl) / 2;
    multiplier = canv.height / numberOfEl;
    ho = numberOfEl > 100 ? 0 : 10;
    x = elWidth + space;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(i, j) {
    let aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
}

function generateArray() {
    ctx2.clearRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < numberOfEl; i++) {
        arr[i] = multiplier * i;
    }

    for (let i = 0; i < numberOfEl; i++) {
        let rand = Math.floor(Math.random() * numberOfEl);
        let aux = arr[i];
        arr[i] = arr[rand];
        arr[rand] = aux;
    }

    for (let i = 0; i < numberOfEl; i++) {
        ctx2.fillStyle = color;
        ctx2.fillRect(margin + x * i, canv.height - arr[i] - ho, elWidth, 2000);
    }
}

function hide(i, j) {
    ctx2.clearRect(margin + x * i, 0, elWidth, canv.height);
    ctx2.clearRect(margin + x * j, 0, elWidth, canv.height);
}

function show(i, j) {
    ctx2.fillStyle = color;
    ctx2.fillRect(margin + x * i, canv.height - arr[i] - ho, elWidth, 2000);
    ctx2.fillRect(margin + x * j, canv.height - arr[j] - ho, elWidth, 2000);
}

/*function highlight(i, j){
    ctx.fillStyle = "red";
    ctx2.fillRect(margin + x * i, canv.height - arr[i] - ho, elWidth, canv.height);
    ctx2.fillRect(margin + x * j, canv.height - arr[j] - ho, elWidth, canv.height);
}*/

btnBubble.onclick = function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    bubbleSort();
}

btnInsertion.onclick = function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    insertionSort();
}

btnSelection.onclick = function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    selectionSort();
}

btnQuick.onclick = function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    quickSort(0, numberOfEl);
}

btnCocktail.onclick = function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    cocktailSort();
}

btnShell.onclick = function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    shellSort();
}

btnMerge.onclick = async function () {
    alreadySelected.id = "notactive";
    alreadySelected = this;
    this.id = "active";
    if (sorted) {
        generateArray();
    }
    sorted = false;
    let aux = [];
    mergeSort(arr, aux, 0, numberOfEl - 1);
}

slider.oninput = function () {
    speed = this.value;
}

elSlider.oninput = function () {
    updateData(this);
    generateArray();
}

//
//#region  Sortari
async function bubbleSort() {
    let sch = 1;
    while (sch) {
        sch = 0;
        for (let i = 0; i < numberOfEl - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                await sleep(speed);
                hide(i, i + 1);
                swap(i, i + 1);
                show(i, i + 1);
                sch = 1;
            }
        }
    }
    sorted = true;
}

async function insertionSort() {
    for (let i = 1; i < numberOfEl; i++) {
        let aux = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > aux) {
            await sleep(speed);
            hide(j, j + 1);
            arr[j + 1] = arr[j];
            show(j, j + 1);
            j = j - 1;
        }
        arr[j + 1] = aux;
    }
    sorted = true;
}

async function selectionSort() {
    for (let i = 0; i < numberOfEl - 1; i++) {
        let minim = i;
        await sleep(speed);
        for (let j = i + 1; j < numberOfEl; j++) {
            if (arr[j] < arr[minim]) {
                minim = j;
            }
            show(j, j);
        }
        hide(i, minim);
        swap(i, minim);
        show(i, minim);
    }
}

async function partition(low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high; j++) {
        if (arr[j] < pivot) {
            await sleep(speed);
            i++;
            hide(i, j);
            swap(i, j);
            show(i, j);
        }
    }
    hide(i + 1, high);
    swap(i + 1, high);
    show(i + 1, high);
    return i + 1;
}

async function quickSort(low, high) {
    if (low < high) {
        let part = await partition(low, high);
        await quickSort(low, part - 1);
        await quickSort(part + 1, high);
    }
}

async function cocktailSort() {
    let sch = 1, start = 0, end = numberOfEl - 1;
    while (sch) {
        sch = 0;
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                await sleep(speed);
                hide(i, i + 1);
                swap(i, i + 1);
                sch = 1;
                show(i, i + 1);
            }
        }
        if (sch == 0) {
            break;
        }
        sch = 0;
        --end;
        for (let i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                await sleep(speed);
                hide(i, i + 1);
                swap(i, i + 1);
                sch = 1;
                show(i, i + 1);
            }
        }
        ++start;
    }
}

async function shellSort() {
    for (let d = Math.floor(numberOfEl / 2); d > 0; d = Math.floor(d / 2)) {
        for (let i = 0; i < numberOfEl; i++) {
            let aux = arr[i];
            let j;
            for (j = i; j >= d && arr[j - d] > aux; j -= d) {
                await sleep(speed);
                hide(j, j);
                arr[j] = arr[j - d];
                show(j, j);
            }
            hide(j, j);
            arr[j] = aux;
            show(j, j);
        }
    }
}

async function mergeSort(arr, aux, l, r){
    if(l != r){
        let mid = Math.floor((l + r) / 2);

        //await sleep(speed);
        await mergeSort(arr, aux, l, mid);
        await mergeSort(arr, aux, mid + 1, r);
        
        let i = l, j = mid + 1, k = 1;
        while(i <= mid && j <= r){
            if(arr[i] > arr[j])
                aux[k++] = arr[j++];
            else
                aux[k++] = arr[i++];
        }
        while(i <= mid) aux[k++] = arr[i++];
        while(j <= r) aux[k++] = arr[j++];

        for(let o = 1; o < k; o++){
            await sleep(speed); 
            hide(l + o - 1, l + o - 1);
            arr[l + o - 1] = aux[o]; 
            show(l + o - 1, l + o - 1);
        }
    }
    else return;
}

//#endregion
//