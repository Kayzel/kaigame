(function(){
    window.onload=function(){ 
        
    /*
       1. Составить меню: 
       1) Новая игра: Уровень сложности
       2) Рекорд
       3) Выход
       2. Убрать ускорение при нажатии на кнопку
                           
    */    
        
        
        /*
             var e =  event.offsetY;       
             var i =  event.offsetX;
             
             screen.width //Ширина экрана
             screen.height //Высота экрана
             
             document.body.clientWidth //Ширина браузера
             document.body.clientHeight //Высота браузера
             
             document.getElementById('klik').style.marginTop = dl+'px'; 
        */
        
    //присваивание кнопок уровней сложности переменным
     
       
  // объявление о работе с канвасом
        //conv
     //var window = document.getElementById("conv");   

        
    canvas = document.getElementById("snaki");
    ctx = canvas.getContext('2d'); 
    canvas.style.zIndex = 7;    
        if(screen.width<screen.height){
            var razmX = screen.width;
           
           document.getElementById("conv").style.width = '100%'; 
           document.getElementById("conv").style.height = '100%'; 
            
            
           canvas.width = razmX;
           canvas.height = razmX+100;
           
            
           //document.getElementsByTagName('body')[0].style.width = razmX+'px';
           //document.getElementsByTagName('body')[0].style.height = razmX+'px';

            //console.log(screen.width+'Ширина экрана'+screen.height+'Высота экрана');
           }else if(screen.width>screen.height){
                var razmX = screen.height;  
               
            document.getElementById("conv").style.width = razmX+'px';
           document.getElementById("conv").style.height = '100%';               
               
           canvas.width = razmX;
           canvas.height = razmX+120;
              
               
               

               
  
           }

        
//        document.getElementsByTagName('body')[0].onmousedown = function(event){
//            alert('X = '+event.clientX+' Y = '+event.clientY+' Ширина канваса = '+canvas.width+' Ширина экрана'+screen.width);
//            
//}  
    move(); // функция изначального движения
    starter(); //функция с вариантами уровней сложности
    randomA(); //функция рандомизатора позиции яблока
    
    document.getElementById('startGame').onmousedown = function(event){
        
        //starter();
       //document.getElementById('windowMenu').style.display = 'none';
        
    }
    
    
        
        
        
        
    //вызов слушателя, управление нажатиями клавиш
  //  document.addEventListener("keydown", keyPush);
    //document.getElementById("start").addEventListener("click", starter);
        

    
}
    
   
//объявления переменных    
 //переменная отвечающая за поле уровней сложности.
var dl 
    if(screen.width<screen.height){
        var razmX = screen.width;
          dl = razmX;
           }else if(screen.width>screen.height){
             var razmX = screen.height;   
           dl = razmX;
           }
   
var bl = dl /20;
log('Версия игры 0.1 / размер ячейки '+bl);
var muvet;
var up, down, left, right; // кнопки
var kuk;  //таймер
var hx=hy=10; //координаты головы.
var px=py=10; //координаты тела
var gs=bl;
var tc=20; 
var ax=ay=15; // координаты яблока
var rax=ray=15; // координаты гнилого яблока
var xv=yv=0; // движение
var trail=[]; // массив длины змейки
var rApple=[]; //массив гнилых яблок
var otlovsnak=[]; // массив для стерания змейки
var tail=1; // длина змейки
var event;
var buttondown = 0; // переменная уровня сложности
var rottenApple; // сомнительная переменная
var level1, level2, level3, level4, level5; //ур сложности
var plusRA = 0; // переменная уровня сложности

function game(){ // функция игры
     
    
    hx+=xv;
    hy+=yv;
    if(hx<0){
        hx=tc-1;
    }
    if(hx>tc-1){
        hx=0;
    }
    if(hy<0){
        hy=tc-1;
    }
    if(hy>tc-1){
        hy=0;
    }

    
//    ctx.fillStyle="#C0C0C0";
//    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    appleDrow(); //функция отрисовки яблок

    randomRA(); //функция рандома позиции яблока
    for(var i=0; i<rApple.length;i++){ //цикл отрисоавки гнилых яблок
            rottenAppleDrow();
            ctx.fillRect(rApple[i].x*gs,rApple[i].y*gs,gs-2,gs-2);
        //сравнение координат
        if(rApple[i].x==hx && rApple[i].y==hy){
            clearInterval(kuk);
            tail=1; 
            //alert('ты проиграл! мина!');
            filed();
             //buttondown = 0;
             randomRA();
             randomA();
            // starter();
           //вывод на экран значений длины и гнилых яблок
         } // если координаты гнилых яблок и обычных совпадают для обычных ищем новое место
            if(rApple[i].x==ax && rApple[i].y==ay){
                ax=Math.floor(Math.random()*tc);
                ay=Math.floor(Math.random()*tc);
            }
        
        }
        
    //отрисовка головы
    ctx.fillStyle="white";
    ctx.fillRect(hx*gs,hy*gs,gs-2,gs-2);
    
    //цикл по отрисовки туловища змеи
    for(var i=0; i<trail.length;i++){
       ctx.fillStyle="cyan"; ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
       
        if(trail[i].x==hx && trail[i].y==hy){ 
            tail=1;
            clearInterval(kuk);
             
           // alert('ты проиграл!');
            filed();
            //buttondown = 0;
            randomRA();
            randomA();
            
            //starter();
            
        

        } 
        if(trail[i].x==ax && trail[i].y==ay){
            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
        }
      
    }
    
    
       
    
    trail.push({x:hx,y:hy});
    while(trail.length>tail){
        otlovsnak.push(trail[0]);
         ctx.fillStyle="#C0C0C0";
         ctx.fillRect(otlovsnak[0].x*gs-2,otlovsnak[0].y*gs-2,gs+2,gs+2);
        otlovsnak.shift();
        trail.shift();
        
    }
        while(rApple.length>buttondown){
        rApple.shift();
        
    }
    
    if(ax==hx && ay==hy){
        tail++;
        randomA();
        randomRA();      
        buttondown = buttondown + plusRA;
        
        
        var obg={"kik":1}; 
        obg.kik = tail;
        console.log(obg);
        
        
        var sobg = JSON.stringify(obg);
        
        if(plusRA > 5){
            if(localStorage.getItem('1') == null){localStorage.setItem('1',JSON.stringify(obg));} 
            var prov = JSON.parse(localStorage.getItem('1'));
            if(prov.kik<tail){localStorage.setItem('1',JSON.stringify(obg));}}
        if(plusRA == 2){
            if(localStorage.getItem('2') == null){localStorage.setItem('2',JSON.stringify(obg));}
            var prov = JSON.parse(localStorage.getItem('2'));
            if(prov.kik<tail){localStorage.setItem('2',JSON.stringify(obg));}}
        if(plusRA == 3){
            if(localStorage.getItem('3') == null){localStorage.setItem('3',JSON.stringify(obg));}
            var prov = JSON.parse(localStorage.getItem('3'));
            if(prov.kik<tail){localStorage.setItem('3',JSON.stringify(obg));}}
        if(plusRA == 4){
            if(localStorage.getItem('4') == null){localStorage.setItem('4',JSON.stringify(obg));}
            var prov = JSON.parse(localStorage.getItem('4'));
            if(prov.kik<tail){localStorage.setItem('4',JSON.stringify(obg));}}
        if(plusRA == 5){
            if(localStorage.getItem('5') == null){localStorage.setItem('5',JSON.stringify(obg));}
            var prov = JSON.parse(localStorage.getItem('5'));
            if(prov.kik<tail){localStorage.setItem('5',JSON.stringify(obg));}}
    }
    
   butmuve(); 
   
}

    
function filed(){
    //location.reload();
    console.log(rApple);
    buttondown = plusRA;
    while(rApple.length>0){
        rApple.shift();    
    }
    document.getElementById('filedMenu').style.display = 'block';
    
    document.getElementById('buttonReload').onclick = function(event){
        ctx.fillStyle="#C0C0C0";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        start();
        document.getElementById('filedMenu').style.display = 'none';
        
    }
    document.getElementById('buttonMenu').onclick = function(event){
         ctx.fillStyle="#C0C0C0";
         ctx.fillRect(0,0,canvas.width,canvas.height);
        
        document.getElementById('windowMenu').style.display = 'block';
        document.getElementById('filedMenu').style.display = 'none';
    }
}
function starter(){
    //выбор уровня сложности.
   // buttondown = 1;
    //ctx.clearRect(0,0,canvas.width,canvas.height);
     //   start();  
    document.getElementById('easy').onclick = function(event){
        buttondown = 1;
        plusRA = 1;
        document.getElementById('windowMenu').style.display = 'none';
        randomRA();
        start();
        
    }
    document.getElementById('normal').onclick = function(){
        buttondown = 2;
        plusRA = 2;
        document.getElementById('windowMenu').style.display = 'none';
        randomRA();
        start();
    }
    document.getElementById('hard').onclick = function(){
        buttondown = 3;
        plusRA = 3;
        document.getElementById('windowMenu').style.display = 'none';
        randomRA();
        start();
    } 
    document.getElementById('heroic').onclick = function(){
        buttondown = 4;
        plusRA = 4;
        document.getElementById('windowMenu').style.display = 'none';
        randomRA();
        start();
    } 
    document.getElementById('dragon').onclick = function(){
        buttondown = 5;
        plusRA = 5;
        document.getElementById('windowMenu').style.display = 'none'; 
        randomRA();
        start();
    }
    
}
    
    
 
/*
    ctx.fillStyle = "#00F";
    ctx.strokeStyle = "#F00";
    ctx.font = "italic 30pt Arial";
    ctx.fillText("Fill text", 20, 50);
    ctx.font = 'bold 30px sans-serif';
    ctx.strokeText("Stroke text", 20, 100);
    
    bl - Размер ячейки
    dl - размер для канваса
*/    
function record(){
   
}
 
    
function menue(){
    
}

    
    
function choice(){
    
}   
    

    
    
function start() {        
      clearInterval(kuk);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#C0C0C0";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    control();
    document.addEventListener("keydown", keyPush);
    kuk = setInterval(game,100); 
        
    }

    
function control(){
     picUp = new Image(); 
     picUp.src = 'img/up-128.png';
        picUp.onload = function() {
            ctx.drawImage(picUp, bl*2, bl*20+bl/2,bl*3,bl*2+bl/2);
        }
     picDown = new Image(); 
     picDown.src = 'img/down-128.png';
        picDown.onload = function() {
            ctx.drawImage(picDown, bl*6,bl*20+bl/2,bl*3,bl*2+bl/2);
        }
     picLeft = new Image(); 
     picLeft.src = 'img/left-128.png';
        picLeft.onload = function() {
            ctx.drawImage(picLeft, bl*11,bl*20+bl/2,bl*3,bl*2+bl/2);
        }
     picRight = new Image(); 
     picRight.src = 'img/right-128.png';
        picRight.onload = function() {
            ctx.drawImage(picRight, bl*15,bl*20+bl/2,bl*3,bl*2+bl/2);
        }
    
            ctx.fillStyle="#4a3737";
        ctx.fillRect(0,bl*20,dl,bl*5);

            ctx.fillStyle="white";
        ctx.fillRect(bl*2,bl*20+bl/2,bl*3,bl*2+bl/2);

            ctx.fillStyle="white";
        ctx.fillRect(bl*6,bl*20+bl/2,bl*3,bl*2+bl/2);

            ctx.fillStyle="white";
        ctx.fillRect(bl*11,bl*20+bl/2,bl*3,bl*2+bl/2);

            ctx.fillStyle="white";
        ctx.fillRect(bl*15,bl*20+bl/2,bl*3,bl*2+bl/2);
    
    
        
    
    startup();
    
       function startup() {
            
          var el = document.getElementsByTagName("canvas")[0];
          el.addEventListener("touchstart", handleStart, false);
          el.addEventListener("touchend", handleEnd, false);
          el.addEventListener("touchcancel", handleCancel, false);
          el.addEventListener("touchmove", handleMove, false);
          log("initialized.");
           
        }
    
    
        function handleStart(evt) {
          evt.preventDefault();
          log("touchstart.");
          var touches = evt.changedTouches;
          var x, y;
          for (var i = 0; i < touches.length; i++) {
            
            
              
            x = touches[i].pageX - evt.target.offsetLeft;//e.pageX - e.target.offsetLeft,
            y = touches[i].pageY - evt.target.offsetTop;//e.pageY - e.target.offsetTop; 
            log("touchstart: x " + x+'<'+(bl*2+bl*3)+"...");  
            log("touchstart: x " + x+'>'+bl*2+"...");//log("touchstart:" + x+'and'+y + "...");
             
            log("touchstart: y " + y+'>'+(bl*20+bl/2)+"...");
            log("touchstart: y " + y+'<'+(bl*20+bl/2+bl*2+bl/2)+"...");  
              
            if((x>bl*2&&x<bl*2+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
                 xv= yv != 1 ?  0 : xv;
                 yv= yv != 1 ? -1 : yv;
                log("условие выполнено");
            }
            if((x>bl*6&&x<bl*6+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
                 xv= yv != -1 ? 0 : xv;
                 yv= yv != -1 ? 1 : yv;
            }
            if((x>bl*11&&x<bl*11+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
                 xv= xv != 1 ? -1 : xv;
                 yv= xv != 1 ?  0 : yv;
            }
            if((x>bl*15&&x<bl*15+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
                 xv= xv != -1 ?  1 : xv;
                 yv= xv != -1 ?  0 : yv;
            }   
              
            ongoingTouches.push(copyTouch(touches[i]));
            var color = 'black';//colorForTouch(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = color;
            ctx.fill();
          // log("touchstart:" + x+'>'+bl*2+"...");//log("touchstart:" + i + ".");
            log("touchstart:" + x+'<'+(bl*2+bl*3)+"...");
            console.log(x+' x -КанвасМенюГейм- y '+y)
 
          }
         // mousedown
            

        }
    
    /*
    function startup() {
      var el = document.getElementsByTagName("canvas")[0];
      el.addEventListener("touchstart", handleStart, false);
      el.addEventListener("touchend", handleEnd, false);
      el.addEventListener("touchcancel", handleCancel, false);
      el.addEventListener("touchmove", handleMove, false);
      log("initialized.");
      }
    */
    /*
    function handleStart(evt) {
          evt.preventDefault();
          log("touchstart.");
          var touches = evt.changedTouches;
          var x, y;
          for (var i = 0; i < touches.length; i++) {
            x = touches[i].pageX;//e.pageX - e.target.offsetLeft,
            y = touches[i].pageY;//e.pageY - e.target.offsetTop;    
            log("touchstart:" + x+'and'+y + "...");
            ongoingTouches.push(copyTouch(touches[i]));
            var color = colorForTouch(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = color;
            ctx.fill();
            log("touchstart:" + x+'and'+y + "...");//log("touchstart:" + i + ".");

          }
         // mousedown
     
        console.log(x+' x -КанвасМенюГейм- y '+y)
        if((x>bl*2&&x<bl*2+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
             xv= yv != 1 ?  0 : xv;
             yv= yv != 1 ? -1 : yv;
            if(white){
                console.log('bel');
            }
        }
        if((x>bl*6&&x<bl*6+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
             xv= yv != -1 ? 0 : xv;
             yv= yv != -1 ? 1 : yv;
        }
        if((x>bl*11&&x<bl*11+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
             xv= xv != 1 ? -1 : xv;
             yv= xv != 1 ?  0 : yv;
        }
        if((x>bl*15&&x<bl*15+bl*3)&&(y>bl*20+bl/2&&y<bl*20+bl/2+bl*2+bl/2)){
             xv= xv != -1 ?  1 : xv;
             yv= xv != -1 ?  0 : yv;
        }

    }
    
    */
}
    
function butmuve(click){
        //кнопки управления
    //временно не используется
//    up = document.getElementById('up').onclick = function(){
//        if (yv != 1){
//            xv=0;yv=-1; 
//            
//        }
//    }
//    down = document.getElementById('down').onclick = function(){
//        if(yv != -1){
//            xv=0;yv=1;   
//            
//        }
//    }
//    left = document.getElementById("left").onclick = function(){
//    if(xv != 1){
//            xv=-1;yv=0; 
//            
//       }
//    }
//    right = document.getElementById("right").onclick = function(){
//    if(xv != -1){
//            xv=1;yv=0;  
//            
//       }   
//    }
    
}    
function rottenAppleDrow(){    
    ctx.fillStyle="#BDB76B";
      
}
function randomRA(){
        while(rApple.length<buttondown){
            rApple.push({x:Math.floor(Math.random()*tc),y:Math.floor(Math.random()*tc)});
            }
}

function appleDrow(){
        
    ctx.fillStyle="#9ACD32";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2); 
}
function randomA(){
    ax=Math.floor(Math.random()*tc);
    ay=Math.floor(Math.random()*tc);
}

function move(){
    xv=1;yv=0;
}


function keyPush(event){   
    muvet = event.keyCode;
    console.log(muvet);
    if(buttondown != 0){
        if(muvet == 37 && xv != 1){
            xv=-1;yv=0; 
        }
        if(muvet == 38 && yv != 1){
            xv=0;yv=-1; 
        }
        if(muvet == 39 && xv != -1){
            xv=1;yv=0;  
        }
        if(muvet == 40 && yv != -1){
            xv=0;yv=1;       
        }
    }
}
    
    
    //отлов тачей

       /* 
        function handleStart(evt) {
          evt.preventDefault();
          log("touchstart.");
          var el = document.getElementsByTagName("canvas")[0];
          var ctx = el.getContext("2d");
          var touches = evt.changedTouches;

          for (var i = 0; i < touches.length; i++) {
            log("touchstart:" + i + "...");
            ongoingTouches.push(copyTouch(touches[i]));
            var color = colorForTouch(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = color;
            ctx.fill();
            log("touchstart:" + i + ".");
          }
        }
        */
        

    
    
        function handleMove(evt) {
          evt.preventDefault();
          var el = document.getElementsByTagName("canvas")[0];
          var ctx = el.getContext("2d");
          var touches = evt.changedTouches;

          for (var i = 0; i < touches.length; i++) {
            var color = colorForTouch(touches[i]);
            var idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) {
              log("continuing touch "+idx);
              ctx.beginPath();
              log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
              ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
              log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
              ctx.lineTo(touches[i].pageX, touches[i].pageY);
              ctx.lineWidth = 4;
              ctx.strokeStyle = color;
              ctx.stroke();

              ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
              log(".");
            } else {
              log("can't figure out which touch to continue");
            }
          }
        }
        
        
        function handleEnd(evt) {
          evt.preventDefault();
          log("touchend");
          var el = document.getElementsByTagName("canvas")[0];
          var ctx = el.getContext("2d");
          var touches = evt.changedTouches;

          for (var i = 0; i < touches.length; i++) {
            var color = colorForTouch(touches[i]);
            var idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) {
              ctx.lineWidth = 4;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
              ctx.lineTo(touches[i].pageX, touches[i].pageY);
              ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
              ongoingTouches.splice(idx, 1);  // remove it; we're done
            } else {
              log("can't figure out which touch to end");
            }
          }
        }
        
        function handleCancel(evt) {
          evt.preventDefault();
          log("touchcancel.");
          var touches = evt.changedTouches;

          for (var i = 0; i < touches.length; i++) {
            ongoingTouches.splice(i, 1);  // remove it; we're done
          }
        }
        
        function log(msg) {
          var p = document.getElementById('log');
          p.innerHTML = msg + "\n" + p.innerHTML;
        } 
    
    
})()