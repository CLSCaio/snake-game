window.onload = function(){
    const stage = document.getElementById('stage')
    const gameOver = document.getElementById('gameOver')
    const score = document.getElementById('score')
    
    let ctx = stage.getContext('2d')
    let valueScore = parseInt(score.innerHTML)

    document.addEventListener('keydown', keyPush)
    
    let speedGame = 80
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

    let px = Math.floor(Math.random() * qpX)
    let py = Math.floor(Math.random() * qpY)

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

        if (px <0) {
            px = qpX-1;
        }
        if (px > qpX-1) {
            px = 0;
        }
        if (py < 0) {
            py = qpY-1;
        }
        if (py > qpY-1) {
            py = 0;
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
    
    let LEFT = 37; 
    let UP = 38; 
    let RIGHT = 39; 
    let DOWN = 40; 

    function randomicKeys() {
        const randomKeys = parseInt(Math.random() * 3)

        switch(randomKeys) {
            case 0:
                LEFT = '39'
                UP = '37'
                RIGHT = '38'
                DOWN = '40'
            break
            case 1:
                LEFT = '40'
                UP = '37'
                RIGHT = '38'
                DOWN = '39'
            break
            case 2:
                LEFT = '38'
                UP = '39'
                RIGHT = '40'
                DOWN = '37'
            break
            case 3:
                LEFT = '39'
                UP = '40'
                RIGHT = '37'
                DOWN = '38'
            break
            default:
                LEFT = '37'
                UP = '38'
                RIGHT = '39'
                DOWN = '40'
        } 
    }
    
    function keyPush(e) {
        if(e.keyCode == LEFT) {
            vx = -vel
            vy = 0

        } else if(e.keyCode == UP){
            vx = 0
            vy = -vel

        } else if(e.keyCode == RIGHT){
            vx = vel
            vy = 0

        } else if(e.keyCode == DOWN){
            vx = 0
            vy = vel   
        }   
    }

    setInterval(randomicKeys, 10000)
}

   
    
  
