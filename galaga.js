//TODO 
// Разобраться с Лисенером и обращению к переменным в них!!!!!
// Перестроить всё в MVC
// Размер холста равне размеру развёрнутого экрана браузера, сделать перерисовку при изменении!!!
// При зажатии стрелок игрок должен сразу лететь а не стопориться после первого нажатия
var startGalaga = function(){
    initGame();
}


/**
 * =============================================================================================================================
 * Global Variables
 * =============================================================================================================================
 */
var isPaused = true;
var backgroundCanvas;
var globalMenuCanvas;

/**
 * =============================================================================================================================
 * Main menu
 * =============================================================================================================================
 */
function showMenu(canvas)
{
    var ctx = canvas.getContext("2d");
    var logoImage = new Image(400,300);
    var textImage = new Image();
    var spritesImage = new Image();

    logoImage.src = "textures/Galaga_logo.png";
    textImage.src = "textures/font.jpg";
    spritesImage.src = "textures/sprites.png"
    
    
    logoImage.onload = function()
    {
        ctx.drawImage(logoImage, canvas.width / 2 - logoImage.width/2 , 100, 400, 300);
    }
   
    function drawStartText(){
        var dw = 16;
        var dh = 16;
        var size = 35;
        var sp = canvas.width/3 - size;

        ctx.clearRect(sp,canvas.height/2, size * 10, size);
        //                      координаты в картинке | ширина и высота вырезки|   коорд в холсте |       изменённые размеры
        ctx.drawImage(textImage,  dw * 3, dh * 5,       dw-1, dh-1 ,     sp + size * 0 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 4, dh * 5,       dw-1, dh-1 ,     sp + size * 1 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 1, dh * 4,       dw-1, dh-1 ,     sp + size * 2 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 2, dh * 5,       dw-1, dh-1 ,     sp + size * 3 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 4, dh * 5,       dw-1, dh-1 ,     sp + size * 4 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 7, dh * 4,       dw-1, dh-1 ,     sp + size * 6 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 1, dh * 4,       dw-1, dh-1 ,     sp + size * 7 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 13, dh * 4,      dw-1, dh-1 ,     sp + size * 8 ,canvas.height/2,      size,size);
        ctx.drawImage(textImage,  dw * 5, dh * 4,       dw-1, dh-1 ,     sp + size * 9 ,canvas.height/2,      size,size);
    }

    textImage.onload = function()
    {
        var size = 35;
        var visibility = false;
        var RAF = requestAnimationFrame(drawStartText);
        setInterval(function(){
            if(visibility){
                requestAnimationFrame(drawStartText);
                visibility = !visibility;
            } else{
                cancelAnimationFrame(RAF);
                visibility = !visibility;
                ctx.clearRect(0, canvas.height/2, canvas.width, canvas.height);
            } 
        },500);
    }
}

/**
 * =============================================================================================================================
 * Game functions
 * =============================================================================================================================
 */
function initGame(){
    var backgroundCanvas = createCanvas();
    showBackground(backgroundCanvas);
    var menuCanvas = createCanvas();

    //кастыль -> лежит в глобальных переменных
    GlobalMenuCanvas = menuCanvas;
    showMenu(menuCanvas);

    //+ загрузить весь контент, показать на экране стартовое меню
}

function startGame(){
    var gameCanvas = createCanvas();
    showGame(gameCanvas);

}

function showGame(canvas){
    var ctx = canvas.getContext("2d"),
        gameSprites = new Image(),
        spriteSize = 20,
        renderedSpriteSize = 60,
        spriteSW = 180,
        spriteSH = 55,
        playerStartW = canvas.width/2 - renderedSpriteSize/2,
        playerStartH = canvas.height- renderedSpriteSize,

    function Rocket(){
        this.x;
        this.y;
    }
    
    gameSprites.src = "textures/sprites.png";

    function renderPlayer()
    {
        
        ctx.drawImage(gameSprites, spriteSW, spriteSH, spriteSize, spriteSize , playerStartW  , playerStartH , renderedSpriteSize, renderedSpriteSize);
    }

    gameSprites.onload = renderPlayer();
    

    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
    console.log(keyName);
    if(keyName === "ArrowLeft"){
        if((playerStartW - 20) > (window.screen.availWidth - document.documentElement.clientWidth)){
            ctx.clearRect(playerStartW,playerStartH,renderedSpriteSize, renderedSpriteSize);
            playerStartW -= 20;
            renderPlayer();
        }
        return;
    }
    if(keyName === "ArrowRight"){
        if((playerStartW + 20 + renderedSpriteSize) < (window.screen.availWidth - document.documentElement.clientWidth / 2)){
            ctx.clearRect(playerStartW,playerStartH,renderedSpriteSize, renderedSpriteSize);
            playerStartW += 20;
            renderPlayer();
        }
        return;
    }
    }, false);
}




function togglePause(){
    this.isPaused = !this.isPaused;
}


// нарисовать холст на всю высоту и на половину ширины в середине
 function checkCanvas(){
    var canvas = document.createElement("canvas");
    return  canvas.getContext || canvas.getContext("2d");
}

function createCanvas(){
    if(checkCanvas)
    {
        var canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width =  window.screen.availWidth - document.documentElement.clientWidth /2;
        canvas.height = document.documentElement.clientHeight ;
        // window.screen.availHeight - (window.screen.availHeight - document.documentElement.clientHeight
    }
    return canvas;
}
function deleteCanvas(canvas){
    document.body.removeChild(canvas);
}


/**
 * =============================================================================================================================
 * Background 
 *              Create star object
 *              Render background (space)
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

function showBackground(canvas)
{
    var ctx = canvas.getContext("2d");
    var starsCount = 250;
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
   

    function renderStars(starsArray,speed){
        ctx.beginPath();
        starsArray.forEach(element => {
            
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
            renderStars(starsArray, 5);
            renderStars(additionalStarsArray, 5);
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

/**
 * =============================================================================================================================
 * Controlls
 * =============================================================================================================================
 */

// сделать глобальным
document.addEventListener("keydown", (event) => {
    const keyName = event.key;

if(keyName === "Enter"){
    if(isPaused)
        {
            requestAnimationFrame(animateStarsBlinking);
            deleteCanvas(GlobalMenuCanvas);
            startGame();
        }
        isPaused = false;
    return;
}

if(keyName === "p" || keyName === "P" || keyName === "з" || keyName === "З"){
    if(isPaused)
        {
            requestAnimationFrame(animateStarsBlinking);
        }
        isPaused = !isPaused;
    return;
}

}, false);


}





/**
 * =============================================================================================================================
 * Start Game
 * =============================================================================================================================
 */
startGalaga(); 



