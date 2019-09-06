let values = [];
let rounds = 0;
let totrounds = 0;
let swaps = 0;
let comparisons = 0;
let fr = 10000000;
let type = "";
let depth = 1;

function setup(){
  values = [];
  rounds = 0;
  totrounds = 0;
  swaps = 0;
  comparisons = 0;
  depth = 1;
  type = document.getElementById("select").value;
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  for(let i = 0; i < width/5; i++){
    values[i] = random(height);
  }
}

function draw(){
  background(0);

  if(type == "Bubble"){
    bubble();
  }else if(type == "Selection"){
    selection();
  }else if(type == "Insertion"){
    insertion();
  }else if(type == "Merge"){
    merge();
  }
}

function swap(a, b){
  let altA = values[a];
  values[a] = values[b];
  values[b] = altA;
}

function bubble(){
  for(let i = 0; i < values.length; i++){
    let c = color(255);
    if(i == rounds){
      if(values[i] > values[i + 1]){
        c = color(0, 255, 0);
      }else{
        c = color(255, 0, 0);
      }
    }
    fill(c);
    rect(i * 5, height - values[i], 5, values[i]);
  }

  if(totrounds < values.length){
    if(rounds < values.length - 1 - totrounds){
      if(values[rounds] > values[rounds + 1]){
        swap(rounds, rounds + 1);
        swaps++;
      }
      rounds++;
      comparisons++;
    }else{
      totrounds++;
      rounds = 0;
    }
  }else{
    noLoop();
  }

  textSize(20);
  fill(200);
  text("Comparisons: " + comparisons, 20, 30);
  text("Swaps: " + swaps, 20, 60);
}

function selection(){
  for(let i = 0; i < values.length; i++){
    let c = color(255);
    fill(c);
    rect(i * 5, height - values[i], 5, values[i]);
  }

  let bigIn = 0;
  let biggest = 0;
  for(let i = 0; i < values.length - rounds; i++){
    comparisons++;
    if(values[i] > biggest){
      biggest = values[i];
      bigIn = i;
    }
  }

  for(let i = bigIn; i < values.length - rounds; i++){
    values[i] = values[i + 1];
    swaps++;
  }
  rounds++;
  values[values.length - rounds] = biggest;
  text("Comparisons: " + comparisons, 20, 30);
  text("Swaps: " + swaps, 20, 60);
}

function insertion(){
  if(rounds < values.length){
    let temp = values[rounds];
    let j = rounds - 1;
    while (j >= 0 && values[j] > temp) {
      values[j + 1] = values[j];
      j--;
      swaps++;
    }
    swaps++;
    values[j + 1] = temp;
    rounds++;
  }

  for(let i = 0; i < values.length; i++){
    let c = color(255);
    fill(c);
    rect(i * 5, height - values[i], 5, values[i]);
  }
  text("Swaps: " + swaps, 20, 60);
}

function merge(){
  values = mergeSort(values, depth);
  depth++;
  for (i = 0; i < values.length; i++) {
    let col = color(255);
    stroke(col);
    fill(col);
    rect(i * 5, height - values[i], 5, values[i]);
  }
}

function mergeSort(a, d) {
  if (a.length <= 1) {
    return a;
  }
  d--;
  if (d < 1){
    return a;
  }
  var mid = Math.round((a.length / 2));
  var left = a.slice(0, mid);
  var right = a.slice(mid);
  return mergeFunc(mergeSort(left,d), mergeSort(right, d));
}

function mergeFunc(left, right) {
  sorted = [];
  while (left && left.length > 0 && right && right.length > 0) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift());
    }
    else {
      sorted.push(right.shift());
    }
  }
  return sorted.concat(left, right);
}
