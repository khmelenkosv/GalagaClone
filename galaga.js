//TODO

/**
 * =============================================================================================================================
 * Global Variables
 * =============================================================================================================================
 */
var isPaused = true;

var initGame = function(){
    var canvas = createCanvas();
    renderBackground(canvas);
}


var startMenu = function(){

}

var background = function(){

}

var galaga = function(){
    
}


/**
 * =============================================================================================================================
 * Main menu
 * =============================================================================================================================
 */
function initMenu(){
    
}



/**
 * =============================================================================================================================
 * Game functions
 * =============================================================================================================================
 */
function togglePause(){
    this.isPaused = !this.isPaused;
}


// нарисовать холст на всю высоту и на половину ширины в середине
var checkCanvas = function(){
    var canvas = document.createElement("canvas");
    return  canvas.getContext || canvas.getContext("2d");
}

var createCanvas = function(){
    if(checkCanvas)
    {
        var canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width = window.outerWidth /2;
        canvas.height = window.outerHeight;
        
    }
    return canvas;
}





/**
 * =============================================================================================================================
 * Background
 * =============================================================================================================================
 */

function Star(x,y){
    this.color = "#FFFFFF"
    this.size = Math.random()*4;
    this.opacity = Math.floor(Math.random() * 255).toString(16);
    this.iSvisible = Math.random() >= 0.5;
    this.x = x;
    this.y = y;
}

function renderBackground(canvas)
{
    var ctx = canvas.getContext("2d");
    var starsCount = 150;
    var additionalStarsCount = 50;

    function makeStarsArray(starsCount){
        var arr = [];
        for(var i = 0; i < starsCount; i++)
        {
            arr.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
        }    
        return arr;
    }
   
    var starsArray = makeStarsArray(starsCount);
    var additionalStarsArray = makeStarsArray(additionalStarsCount);
   

    function renderStarsStatic(starsArray,speed){
        starsArray.forEach(element => {
            ctx.beginPath();
            ctx.fillStyle = element["color"] + element["opacity"] ;
            if(element['iSvisible']){
                ctx.fillRect(element['x'],element["y"], element["size"], element["size"]);
            }
            if(element["y"]<= canvas.height)
            {
                element["y"] += speed;
            }else
            {
                element["y"] = 0;
                element["x"] = canvas.width - Math.random()* canvas.width;
            }
                
        });
    }

    function animateStarsBlinking(){
            ctx.clearRect(0,0, canvas.width, canvas.height)
            renderStarsStatic(starsArray, 5);
            renderStarsStatic(additionalStarsArray, 5);
            if(isPaused)
            {
                cancelAnimationFrame(RAF);
                return;
            }
            
        requestAnimationFrame(animateStarsBlinking);
    }
    
    var RAF = requestAnimationFrame(animateStarsBlinking);
    var starsArrayInt = setInterval(function(){
        starsArray.forEach(element => {
            element['iSvisible'] = !element['iSvisible'];
        });
    }, 300);
    var additionalstarsArrayInt = setInterval(function(){
        additionalStarsArray.forEach(element => {
            element['iSvisible'] = !element['iSvisible'];
        });
    }, 20);


    // поставить в подходящее место 
    canvas.onclick = function(){
        if(isPaused)
        {
            requestAnimationFrame(animateStarsBlinking);
        }
        isPaused = !isPaused; 
    }
 
}





/**
 * =============================================================================================================================
 * Start Game
 * =============================================================================================================================
 */
initGame();

