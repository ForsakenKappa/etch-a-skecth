const divBoard = document.querySelector("#board");
const gridSizeP = document.querySelector("#grid-size-value");
const gridSizeInp = document.querySelector("#grid-size-input");
const colorInp = document.querySelector('#color-picker');

const toolBtns = document.getElementsByName('tool');

let gridSize = 16;
let isDrawing = false;
let color = '#000000';
let currentTool = 'pen';

gridSizeP.textContent = `${gridSize} x ${gridSize}`;
gridSizeInp.value = gridSize;
updateGrid()

colorInp.addEventListener('change', function(e){
    color = e.target.value
})

gridSizeInp.addEventListener('input', function(e){
    gridSize = e.target.value;
    gridSizeP.textContent = `${gridSize} x ${gridSize}`;
})

toolBtns.forEach(toolBtn => toolBtn.addEventListener('click', handleTools))

function doDrawing(e){

    if (isDrawing) {
        console.log(color);
        color = colorInp.value;
        switch (currentTool){
            case 'pen':
                e.target.style.backgroundColor = color;
                break
            case 'eraser':
                e.target.style.backgroundColor = '#ffffff';
                break;
            case 'pipette':
                colorInp.value = convertToHex(e.target.style.backgroundColor)

        }
        
    }
    
}


// I need to deal with that "rgb(255,255,255)" somehow
function convertToHex(string=''){
    let regexp = /\d+/g

    array = [...string.matchAll(regexp)]
    console.log(array)

    r = array[0][0]
    g = array[1][0]
    b = array[2][0]

    rHex = parseInt(r).toString(16)
    gHex = parseInt(g).toString(16)
    bHex = parseInt(b).toString(16)

    rHex = rHex.length > 1? rHex : '0' + rHex
    gHex = gHex.length > 1? gHex : '0' + gHex
    bHex = bHex.length > 1? bHex: '0'+ bHex

    //Will be #ffffff
    return `#${rHex}${gHex}${bHex}`

}

function createGrid(size){

    for (let i = 0; i < size * size; i++) {
        let pixel = document.createElement("div");
        pixel.className = 'pixel';
        pixel.id = i;
        pixel.style.backgroundColor = '#ffffff'
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

    console.log(e.target);

    currentTool = e.target.value;

    

    
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

