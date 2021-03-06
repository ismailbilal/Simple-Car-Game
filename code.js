document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div")
    const top = document.querySelector(".top")
    const game_Over = document.createElement("h1")
    const scoreViewer = document.createElement("h3")
    const scoreCount = document.createElement("em")

    let doodlerLeft = 183
    let doodlerBottom = 30
    let doodlerWidth = 70
    let doodlerHieght = 85
    let obstacleCount = 2

    let obstacleWidth = 70
    let obstacleHieght = 85

    let obstacles = []
    let score = 0
    let speed = 2.4
    let isGameOver = false
    let movingTimer
    
    class Obstacle {
        constructor(newOpsBottom){
            this.left =  58 + Math.random() * 233
            this.bottom = newOpsBottom
            this.visual = document.createElement("div")

            const visual = this.visual
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            visual.classList.add("obstacle")

            grid.appendChild(visual)
        }
    }

    const createObstacles = () => {
        for(let i = 0; i<obstacleCount; i++){
            let obsGab = 610 / obstacleCount
            let newOpsBottom = 200 + i * obsGab
            let newobstacle = new Obstacle (newOpsBottom)
            obstacles.push(newobstacle)
        }
    }

    const moveObstacles = () => {
        obstacles.forEach(obstacle => {
            obstacle.bottom -= speed
            let visual = obstacle.visual
            visual.style.bottom = obstacle.bottom + 'px'

            if(
                obstacle.bottom <= doodlerBottom + doodlerHieght &&
                obstacle.bottom + obstacleHieght >= doodlerBottom &&
                obstacle.left <= doodlerLeft + doodlerWidth &&
                obstacle.left + obstacleWidth >= doodlerLeft
            )gameOver()

            if(obstacle.bottom < speed) {
                let firstObstacle = obstacles[0].visual
                firstObstacle.classList.remove("obstacle")
                obstacles.shift()
                score++
                scoreCount.innerHTML = score
                if(score % 10 === 0 ) speed *= 1.09
                console.log(score)
                console.log(speed)
                let newobstacle = new Obstacle (530)
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
        if(doodlerLeft < 283){
            doodlerLeft +=25
            doodler.style.left = doodlerLeft + 'px'
        }
    }
    
    const moveLeft = () => {
        if(doodlerLeft > 58){
            doodlerLeft -=25
            doodler.style.left = doodlerLeft + 'px'
        }
    }

    const moveTop = () => {
        if(doodlerBottom < 430){
            doodlerBottom +=25
            doodler.style.bottom = doodlerBottom + 'px'
        }
    }

    const moveDown = () => {
        if(doodlerBottom > 25){
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

        console.log(doodlerBottom)
    }

    const writeGameOver = () => {
        game_Over.innerHTML = "GAME OVER"
        game_Over.classList.add("game-over")
        grid.appendChild(game_Over)
    }

    const gameOver = () => {
        isGameOver = true
        clearInterval(movingTimer)
        while (grid.firstChild) {
          console.log('remove')
          grid.removeChild(grid.firstChild)
        }
        writeGameOver()
    }

    const writeScore = () => {
        scoreViewer.innerHTML = "score : "
        scoreViewer.appendChild(scoreCount)
        top.appendChild(scoreViewer)
        scoreViewer.classList.add("score")
    }

    const start = () => {
        if(!isGameOver){
            createObstacles()
            createDoodler()
            writeScore()
            movingTimer = setInterval(moveObstacles, 30)
            document.addEventListener("keyup", control)
        }
    }
    
    start()
})