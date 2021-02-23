const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

// 캔버스의 크기를 따로 지정해 줘야 픽셀이 떠다닐 공간이 만들어짐.
canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;


function startPainting(e){
    painting = true;
}


function stopPainting(e){
    painting = false;
}


function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else{
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}

function changeColor(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}


function handleRangeChange(e){
    const linewidth = e.target.value;
    ctx.lineWidth = linewidth;
}


function handleModeClick(e){
    if (filling === true){
        filling = false;
        fill.innerHTML = "fill";
    } else{
        filling = true;
        fill.innerHTML = "paint";
    }
        
}


function handleCanvasClick(e){
    if (filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}


function handleCM(e){
    e.preventDefault();
    alert("우클릭 방지입니다.");
}


function handleSaveClick(e){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();
}


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (colors){
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if (range){
    range.addEventListener("input", handleRangeChange);
}

if (fill){
    fill.addEventListener("click", handleModeClick);
}

if (save){
    save.addEventListener("click", handleSaveClick);
}
