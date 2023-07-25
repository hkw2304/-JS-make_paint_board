const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = document.querySelector("#canvasWidth");
const canvasColor = document.querySelector("#canvasColor");
const canvasColors = Array.from(document.querySelectorAll(".colors"));
// 선택자가 여러 개여서 배열로 만들어줘야 함수 실행 시 오류가 발생 안함
// const canvasColors = document.querySelectorAll(".colors");
const selectBtn = document.querySelector("#selectBtn");
const destroyBtn = document.querySelector("#destroy");
const eraseBtn = document.querySelector("#erase");
const imgBtn = document.querySelector("#file");
const textAdd = document.querySelector("#text");
const saveBtn = document.querySelector("#save");

let ispainting = false;
let isfill = false;
canvas.width = 800;
canvas.height = 800;
ctx.lineCap = "round";

ctx.lineWidth = canvasWidth.value;
ctx.strokeStyle = "#000000";

function onMouseDown() {
  ispainting = true;
}
function onMouseUp() {
  ispainting = false;
}
function onMouseMove(event) {
  //   console.dir(event);
  if (ispainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onWidthChange(event) {
  ctx.lineWidth = event.target.value;
  ctx.beginPath();
}
function onColorChange(event) {
  ctx.beginPath();
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  ctx.beginPath();
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  canvasColor.value = event.target.dataset.color;
}
function onColorSelectClick() {
  if (!isfill) {
    ctx.beginPath();
    selectBtn.innerHTML = "Stroke";
    ctx.fillRect(0, 0, 800, 800);
    isfill = true;
  } else {
    ctx.beginPath();
    selectBtn.innerHTML = "Fill";
    isfill = false;
  }
}
function onDestroyClick() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}
function onEraseClick() {
  ctx.strokeStyle = "white";
  ctx.beginPath();
}
function onImgBtn(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;

  image.addEventListener("load", onLoad);
  function onLoad() {
    ctx.drawImage(image, 0, 0, 800, 800);
    fileInput = null;
  }
  ctx.beginPath();
}
function onDBLClick(event) {
  const text = textAdd.value;
  if (text !== null) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.strokeText(text, event.offsetX, event.offsetY);
    textAdd.value = "";
    ctx.restore();
  }
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myImg";
  a.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("dblclick", onDBLClick);
canvasWidth.addEventListener("change", onWidthChange);
canvasColor.addEventListener("change", onColorChange);
canvasColors.forEach((color) => {
  color.addEventListener("click", onColorClick);
});
selectBtn.addEventListener("click", onColorSelectClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
imgBtn.addEventListener("change", onImgBtn);
saveBtn.addEventListener("click", onSaveClick);
