document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div")

    let doodlerLeft = 175
    let doodlerBottom = 275
    let obstacleCount = 2
    let obstacles = []
    let score = 0
    let speed = 2.3
    
    class Obstacle {
        constructor(newOpsBottom){
            let width = 30 + Math.random() * 50
            this.left =  Math.random() * 340
            this.bottom = newOpsBottom
            this.visual = document.createElement("div")

            const visual = this.visual
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            visual.style.width = width + 'px'
            visual.style.height = width + 'px'
            visual.classList.add("obstacle")

            grid.appendChild(visual)
        }
    }

    const createObstacles = () => {
        for(let i = 0; i<obstacleCount; i++){
            let obsGab = 610 / obstacleCount
            let newOpsBottom = 100 + i * obsGab
            let newobstacle = new Obstacle (newOpsBottom)
            obstacles.push(newobstacle)
        }
    }

    const moveObstacles = () => {
        obstacles.forEach(obstacle => {
            obstacle.bottom -= speed
            let visual = obstacle.visual
            visual.style.bottom = obstacle.bottom + 'px'

            if(obstacle.bottom < 5) {
                let firstObstacle = obstacles[0].visual
                firstObstacle.classList.remove("obstacle")
                obstacles.shift()
                score++
                if(score % 10 === 0 ) speed *= 1.07
                console.log(score)
                console.log(speed)
                let newobstacle = new Obstacle (600)
                obstacles.push(newobstacle)
            }
        })
    }

    const createDoodler = () => {
        grid.appendChild(doodler)
        doodler.classList.add("doodler")
        doodler.style.left = doodlerLeft + 'px'
        doodler.style.bottom = doodlerBottom + 'px'
    }

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

    const control = (e) => {
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

    const start = () => {
        createObstacles()
        createDoodler()
        setInterval(moveObstacles, 30)
        document.addEventListener("keyup", control)
    }
    
    start()
})