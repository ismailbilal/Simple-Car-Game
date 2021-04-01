document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div")

    doodler.classList.add("doodler")
    grid.appendChild(doodler)
    let doodlerLeft = 175
    let doodlerBottom = 275
    doodler.style.left = doodlerLeft + 'px'
    doodler.style.bottom = doodlerBottom + 'px'
    
    const moveRight = () => {
        if(doodlerLeft < 350){
            doodlerLeft +=25
            doodler.style.left = doodlerLeft + 'px'
        }
    }
    
    const moveLeft = () => {
        if(doodlerLeft > 0){
            doodlerLeft -=25
            doodler.style.left = doodlerLeft + 'px'
        }
    }

    const moveTop = () => {
        if(doodlerBottom < 550){
            doodlerBottom +=25
            doodler.style.bottom = doodlerBottom + 'px'
        }
    }

    const moveDown = () => {
        if(doodlerBottom > 0){
            doodlerBottom -=25
            doodler.style.bottom = doodlerBottom + 'px'
        }
    }

    function control(e) {
        if(e.key === 'ArrowLeft') {
          moveLeft()
        } else if (e.key === 'ArrowRight') {
          moveRight()
        } else if (e.key === 'ArrowUp') {
          moveTop()
        } else if (e.key === 'ArrowDown') {
            moveDown()
        }
        console.log(doodlerLeft)
        console.log(doodlerBottom)
    }

    document.addEventListener("keyup", control)
})