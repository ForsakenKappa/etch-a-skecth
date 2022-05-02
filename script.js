const divBoard = document.querySelector("#board");
const gridSizeP = document.querySelector("#grid-size-value");
const gridSizeInp = document.querySelector("#grid-size-input");
const colorInp = document.querySelector('#color-picker');

const toolBtns = document.querySelectorAll('.tool');

let gridSize = 16;
let isDrawing = false;
let color = 'black';

gridSizeP.textContent = `${gridSize} x ${gridSize}`;
gridSizeInp.value = gridSize;
updateGrid()

colorInp.addEventListener('input', function(e){
    color = e.target.value
})

gridSizeInp.addEventListener('input', function(e){
    gridSize = e.target.value;
    gridSizeP.textContent = `${gridSize} x ${gridSize}`;
})

toolBtns.forEach(toolBtn => toolBtn.addEventListener('click', handleTools))

function doDrawing(e){
    if (isDrawing) {
        e.target.style.backgroundColor = color;
    }
}

function createGrid(size){

    for (let i = 0; i < size * size; i++) {
        let pixel = document.createElement("div");
        pixel.className = 'pixel';
        pixel.id = i;
        pixel.addEventListener('mousedown', function(e){
            isDrawing = true
            doDrawing(e)
        })
        pixel.addEventListener('mouseenter', doDrawing)
        pixel.addEventListener('mouseup', () => isDrawing = false)
        divBoard.appendChild(pixel)

    }
}

function handleTools(e){

    console.log(e);

    tool = e.target
    toolClassList = Array.from(tool.classList)

    
}

function toggleGrid(button){

    button.classList.toggle("active");

    document.querySelectorAll('.pixel').forEach(element => {
        element.classList.toggle("grid-pixel")
    });

}

function updateGrid(){ 
    console.log(gridSize);

    let pixels = document.querySelectorAll('.pixel');
    if (pixels){
        pixels.forEach(function(pixel){
            divBoard.removeChild(pixel);
        })
    }

    divBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    divBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    createGrid(gridSize);
}

