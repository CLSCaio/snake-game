window.onload = function(){
    const stage = document.getElementById('stage')
    const gameOver = document.getElementById('gameOver')
    const score = document.getElementById('score')
    
    let ctx = stage.getContext('2d')
    let valueScore = parseInt(score.innerHTML)

    document.addEventListener('keydown', keyPush)
    
    let speedGame = 60
    const gameInterval =  setTimeout(() => {
        setInterval(game, speedGame)
    }, 60)
   
    

    const vel = 1

    let vx = 1
    let vy = 0 
    let tp = 30
    let qpX = 30
    let qpY = 19 

    let appleX = Math.floor(Math.random() * qpX)
    let appleY = Math.floor(Math.random() * qpY)
    let goldAppleX
    let goldAppleY
    let purpleAppleX
    let purpleAppleY
    let brownAppleY
    let brownAppleX

    let px = 5
    let py = 5

    let trail = []
    let tail = 3

    function purpleApplePoison() {
        score.innerHTML--
        tail--
        if(score.innerHTML == 0) {
            gameOverFunction()
        } 
    }
    
    let setPoison
    function poisonTimer() {
        setPoison = setInterval(purpleApplePoison, 1500);
    }

    function stopPoison() {
        clearInterval(setPoison)
    }

    function gerarPosGoldApple() {
        goldAppleX = Math.floor(Math.random() * qpX)
        goldAppleY = Math.floor(Math.random() * qpY)
    }

    function gerarPosPurpleApple() {
        purpleAppleX = Math.floor(Math.random() * qpX)
        purpleAppleY = Math.floor(Math.random() * qpY)
    }

    function gerarPosApple() {
        appleX = Math.floor(Math.random() * qpX)
        appleY = Math.floor(Math.random() * qpY)
    }

    function gerarPosBrownApple() {
        brownAppleX = Math.floor(Math.random() * qpX)
        brownAppleY = Math.floor(Math.random() * qpY)
    }

    function gameOverFunction() {
        vx = vy = 0
        tail = 3
        valueScore = parseInt(score.innerHTML = 0)
        stopPoison()

        clearTimeout(gameInterval)

        gameOver.style.display = 'flex'
    }
    
    function game() {    

        px += vx
        py += vy

        if(px < 0 || px > qpX -1) {
            gameOverFunction()

        } else if(py < 0 || py > qpY -1) {
            gameOverFunction()
        }

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, stage.width, stage.height)

        ctx.fillStyle = "red"
        ctx.fillRect(appleX*tp, appleY*tp, tp, tp)  
        
        ctx.fillStyle = "gold"
        ctx.fillRect(goldAppleX*tp, goldAppleY*tp, tp, tp)

        ctx.fillStyle = "brown"
        ctx.fillRect(brownAppleX*tp, brownAppleY*tp, tp, tp)

        ctx.fillStyle = "purple"
        ctx.fillRect(purpleAppleX*tp, purpleAppleY*tp, tp, tp)

        if(appleX == px && appleY == py) {
            tail++
            score.innerHTML = valueScore += 1
            appleX = Math.floor(Math.random() * qpX)
            appleY = Math.floor(Math.random() * qpY)
        }

        if(brownAppleX == px && brownAppleY == py) {
            gameOverFunction()
        }

        if(goldAppleX == px && goldAppleY == py) {
            stopPoison()
            tail += 2
            score.innerHTML = valueScore += 2
            goldAppleX = undefined
            goldAppleY = undefined
            setTimeout(gerarPosGoldApple, 10000)
        }
 
        if(purpleAppleX == px && purpleAppleY == py) {
            if(score.innerHTML == 0) {
                gameOverFunction()

            } else {
                poisonTimer()
                purpleAppleX = undefined
                purpleAppleY = undefined
                setTimeout(gerarPosPurpleApple, 5000)
            }
        }

        ctx.fillStyle = "gray"
        for(let i = 0; i<trail.length; i++) {
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1, tp-1)
            if(trail[i].x == px && trail[i].y == py) {
                gameOverFunction()
            }
        }
        trail.push({x:px, y:py})
        while(trail.length > tail) {
            trail.shift()
        }
        
    }



    setInterval(gerarPosApple, 5000)
    setInterval(gerarPosGoldApple, 10000)
    setInterval(gerarPosPurpleApple, 3000)
    setInterval(gerarPosBrownApple, 15000)
    
    function keyPush(e) {
        switch(e.keyCode) {
            case 37: // left
                vx = -vel
                vy = 0
                break
            case 38: // up
                vx = 0
                vy = -vel
                break
            case 39: // right
                vx = vel
                vy = 0
                break
            case 40: // down
                vx = 0
                vy = vel
                break
            default:
        }   
    }
}