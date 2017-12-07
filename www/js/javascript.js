    window.onload=function(){ 
        
    /*
       1. Составить меню: 
       1) Новая игра: Уровень сложности
       2) Рекорд
       3) Выход
       2. Убрать ускорение при нажатии на кнопку
                           
    */    
        var num1 = JSON.parse(localStorage.getItem('1'));
        var num2 = JSON.parse(localStorage.getItem('2'));
        var num3 = JSON.parse(localStorage.getItem('3'));
        var num4 = JSON.parse(localStorage.getItem('4'));
        var num5 = JSON.parse(localStorage.getItem('5'));
        
        if(localStorage.getItem('1') != null) {document.getElementById('recEazy').innerHTML = num1.kik;}
        if(localStorage.getItem('2') != null) {document.getElementById('recEazy2').innerHTML = num2.kik;}
        if(localStorage.getItem('3') != null) {document.getElementById('recEazy3').innerHTML = num3.kik;}
        if(localStorage.getItem('4') != null) {document.getElementById('recEazy4').innerHTML = num4.kik;}
        if(localStorage.getItem('5') != null) {document.getElementById('recEazy5').innerHTML = num5.kik;}
        
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

        var box = document.getElementById("conv");
        var Wbox = box.clientHeight || box.offsetHeight;
        var Hbox = box.clientWidth || box.offsetWidth;
        //td.getAttribute('height') // 
        
     controler = document.getElementById('control');
    controlCtx = controler.getContext('2d'); 
        
    canvas = document.getElementById("snaki");
    ctx = canvas.getContext('2d'); 
    canvas.style.zIndex = 7;   
        var Wcanbox = canvas.clientHeight || canvas.offsetHeight;
        var Hcanbox = canvas.clientWidth || canvas.offsetWidth;
        if(window.screen.width<window.screen.height){
            var razmX = Hbox;
            //alert(razmX);
          // document.getElementById("conv").style.width = '100%'; 
        //   document.getElementById("conv").style.height = razmX+'px%'; 
            
            
           canvas.width = razmX;
           canvas.height = razmX;
          // controler.width = razmX;
          
           //document.getElementsByTagName('body')[0].style.width = razmX+'px';
           //document.getElementsByTagName('body')[0].style.height = razmX+'px';

            //console.log(screen.width+'Ширина экрана'+screen.height+'Высота экрана');
           }else if(window.screen.width>window.screen.height){
                var razmX = Wbox;  
              
          //  document.getElementById("conv").style.width = '100%';
         //  document.getElementById("conv").style.height = razmX+'px';               
               
           canvas.width = razmX-280;
           canvas.height = razmX-280;
         //  controler.width = razmX; 
              box.style.width = canvas.width+'px';
               
               

               
  
           }
        
        var dl 
        if(window.screen.width<window.screen.height){
            var razmX = Hbox;
            dl = razmX;
           }else if(window.screen.width>window.screen.height){
             var razmX = Wbox-280;  
           dl = razmX;
           }
        
        var wid = dl;
        var xakh = canvas.offsetHeight;// - canvas.clientHeight;
        var hexs = canvas.offsetTop;
        var heig = Wbox;
        var newHei = heig-(hexs+xakh)-2;
        //console.log(heig+' '+hexs+' '+xakh+' '+30);
        var heblock = newHei/3;
        
//        controler.width = wid;
//        controler.height = newHei; 
       /* var p = document.getElementById('log');  
          p.style.marginTop = canvas.height+'px';   */
        //    alert('ширина '+window.screen.width+' / высота '+window.screen.height);
       // alert('ширина канваса '+canvas.width+' / высота канваса '+canvas.height);
            
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
var attr = document.getElementById('filedMenu');
var playGame = document.getElementById('playButtonGameplay');
var stopGame = document.getElementById('stopButtonGameplay')
var tailScope = document.getElementById('tailScope');
var windowMenu = document.getElementById('windowMenu');
var box = document.getElementById('conv');
        var Wbox = box.clientHeight || box.offsetHeight;
        var Hbox = box.clientWidth || box.offsetWidth;    
//объявления переменных    
 //переменная отвечающая за поле уровней сложности.
var dl 
    if(window.screen.width<window.screen.height){
        var razmX = Hbox;
          dl = razmX;
           }else if(window.screen.width>window.screen.height){
             var razmX = Wbox-280;  
           dl = razmX;
           }
   
var bl = dl /20;
//alert('Версия игры 0.2.1 / размер ячейки '+bl);
        var imagup = new Image();
        imagup.src = 'img/up-128.png';
        var imagdown = new Image();
        imagdown.src = 'img/down-128.png';
        var imagleft = new Image();
        imagleft.src = 'img/left-128.png';
        var imagright = new Image();
        imagright.src = 'img/right-128.png';

var muvet;
var up, down, left, right; // кнопки
var kuk;  //таймер
var hx=hy=10; //координаты головы.
var px=py=10; //координаты тела
var gs=bl; // размер ячейки
var tc=20; 
var ax=ay=15; // координаты яблока
var rax=ray=15; // координаты гнилого яблока
var xv=yv=0; // движение
var trail=[]; // массив длины змейки
var rApple=[]; //массив гнилых яблок
var tail=1; // длина змейки
var event;
var buttondown = 0; // переменная уровня сложности
var rottenApple; // сомнительная переменная
var level1, level2, level3, level4, level5; //ур сложности
var plusRA = 0; // переменная уровня сложности
var luser = true;
var speadSnake = 100;



function sdv(){
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
 }  
    
    
function game(){ // функция игры
    sdv();
     ctx.clearRect(0,0,canvas.width,canvas.height);

   
    
//    ctx.fillStyle="#C0C0C0";
//    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    appleDrow(); //функция отрисовки яблок

     //функция рандома позиции яблока
    for(var i=0; i<rApple.length;i++){ //цикл отрисоавки гнилых яблок
            rottenAppleDrow();
            ctx.fillRect(rApple[i].x*gs,rApple[i].y*gs,gs-2,gs-2);
        //сравнение координат
        if(rApple[i].x==hx && rApple[i].y==hy){
            clearInterval(kuk);
            tail=1; 
            luser = true;
            //alert('ты проиграл! мина!');
            filed();
             //buttondown = 0;
             
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
       ctx.fillStyle="cyan";
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==hx && trail[i].y==hy){ 
            tail=1;
            clearInterval(kuk);
             luser = true;
           // alert('ты проиграл!');
            filed();
            //buttondown = 0;

            
            //starter();
            
        

        } 
        if(trail[i].x==ax && trail[i].y==ay){
            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
        }
      
    }
    
    
       
    
    trail.push({x:hx,y:hy});
    while(trail.length>tail){
        //ctx.fillStyle="#C0C0C0";  ctx.fillRect
        trail.shift();
        
    }
        while(rApple.length>buttondown){
        rApple.shift();
        
    }
    
    
   collisionAppleHead();
   
}

    
function collisionAppleHead(){
    if(ax==hx && ay==hy){
        happyBlock();
        tail++;
        randomA();
        buttondown = buttondown + plusRA;
        randomRA();      
        tailScope.innerHTML = tail;
       
        var obg={"kik":1}; 
        obg.kik = tail;
        
        
        
        var sobg = JSON.stringify(obg);
        
        if(plusRA == 1){
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
}      
function happyBlock(){
    var tt = 20;
      // Inital starting position
      var posX = ax,
          posY = ay;
    
      // No longer setting velocites as they will be random
      // Set up object to contain particles and set some default values
      var particles = {},
          particleIndex = 0,
          settings = {
            density: 10,
            particleSize: 10,
            startingX: posX*gs,
            startingY: posY*gs,
            gravity: 0.5
          };

      // Set up a function to create multiple particles
      function Particle() {
        // Establish starting positions and velocities
        this.x = settings.startingX;
        this.y = settings.startingY;

        // Determine original X-axis speed based on setting limitation
        this.vx = Math.random() * 3 - 1;
        this.vy = Math.random() * 3 - 1;

        // Add new particle to the index
        // Object used as it's simpler to manage that an array
        particleIndex ++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.maxLife = 100;
        this.tt = Math.random() * 20 - 5;
      }

      // Some prototype methods for the particle's "draw" function
      Particle.prototype.draw = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.tt =  this.tt >=0?  this.tt -=0.2 : 0; 
        // Adjust for gravity
       // this.vy += settings.gravity;
           if(luser){
               stopTik();
            } else{
               setTimeout(stopTik,3000); 
            }
        // Age the particle
        this.life++;

        // If Particle is old, it goes in the chamber for renewal
        if (this.life >= this.maxLife) {
          delete particles[this.id];
        }

        // Create the shapes
        //ctx.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
        ctx.fillStyle="#ffffff";
          
        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
        ctx.fillRect(this.x, this.y, this.tt,this.tt);  
          

      }

       var tiki = setInterval(bums, 1000/36);

        function stopTik(){
            clearInterval(tiki);
        }
   
        
    
    function bums() {
        
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the particles
        for (var i = 0; i < settings.density; i++) {
          if (Math.random() > 0.97) {
            // Introducing a random chance of creating a particle
            // corresponding to an chance of 1 per second,
            // per "density" value
            new Particle();
          }
        }

        for (var i in particles) {
          particles[i].draw();
        }
      }
}       
    
function filed(){
    //location.reload();
   
   // console.log(rApple);
    stopGame.style.display = 'none';
    playGame.style.display = 'none';
    while(rApple.length!==0){
        rApple.pop();    
    }
  //  controlCtx.clearRect(0,0,canvas.width,canvas.height);
   // var canva = document.getElementsByTagName('canvas')[1];
  //  var ctxCanva = canva.getContext('2d');
    controlCtx.clearRect(0,0,controler.width,controler.height);
    //randomRA();
    randomA();

    attr.style.display = 'block';

    
    
    
    document.getElementById('buttonReload').onclick = function(event){
        tailScope.innerHTML = 0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
       /* ctx.fillStyle="#C0C0C0";
        ctx.fillRect(0,0,canvas.width,canvas.height);*/
        start();
        attr.style.display = 'none';
        
    }
    document.getElementById('buttonMenu').onclick = function(event){
        tailScope.innerHTML = 0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        /* ctx.fillStyle="#C0C0C0";
         ctx.fillRect(0,0,canvas.width,canvas.height);*/
        
        var num1 = JSON.parse(localStorage.getItem('1'));
        var num2 = JSON.parse(localStorage.getItem('2'));
        var num3 = JSON.parse(localStorage.getItem('3'));
        var num4 = JSON.parse(localStorage.getItem('4'));
        var num5 = JSON.parse(localStorage.getItem('5'));
        
        if(localStorage.getItem('1') != null) {document.getElementById('recEazy').innerHTML = num1.kik;}
        if(localStorage.getItem('2') != null) {document.getElementById('recEazy2').innerHTML = num2.kik;}
        if(localStorage.getItem('3') != null) {document.getElementById('recEazy3').innerHTML = num3.kik;}
        if(localStorage.getItem('4') != null) {document.getElementById('recEazy4').innerHTML = num4.kik;}
        if(localStorage.getItem('5') != null) {document.getElementById('recEazy5').innerHTML = num5.kik;}
        
        
        windowMenu.style.display = 'block';
        attr.style.display = 'none';
    }
    //tailScope.innerHTML = 0;
}
function starter(){
    //выбор уровня сложности.
   // buttondown = 1;
    
    //ctx.clearRect(0,0,canvas.width,canvas.height);
     //   start();  
    document.getElementById('easy').onclick = function(event){
        plusRA = 1;
        windowMenu.style.display = 'none';
        speadSnake = 100;
        start();
    }
    document.getElementById('normal').onclick = function(){
        plusRA = 2;
        windowMenu.style.display = 'none';
        speadSnake = 100;
        start();
    }
    document.getElementById('hard').onclick = function(){
        plusRA = 3;
        windowMenu.style.display = 'none';
        speadSnake = 100;
        start();
    } 
    document.getElementById('heroic').onclick = function(){
        plusRA = 4;
        windowMenu.style.display = 'none';
        speadSnake = 100;
        start();
    } 
    document.getElementById('dragon').onclick = function(){
        plusRA = 5;
        windowMenu.style.display = 'none';
        speadSnake = 100;
        start();
    }
    
}
playGame.onclick = function(){
    kuk = setInterval(game,speadSnake); 
    playGame.style.display = 'none';
    stopGame.style.display = 'inline';
}
stopGame.onclick = function(){

    clearInterval(kuk);
    playGame.style.display = 'inline';
    stopGame.style.display = 'none';
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

function start() { 
        ctx.clearRect(0,0,canvas.width,canvas.height);
        luser = false;
        stopGame.style.display = 'inline';
        buttondown = plusRA;
        randomRA();
        clearInterval(kuk);
        control();
        document.addEventListener("keydown", keyPush);
        kuk = setInterval(game,speadSnake);   
    }

function control(){
       controler = document.getElementById('control');
       controlCtx = controler.getContext('2d'); 
    
    /*
    var wid = dl;
    
    var xak = canvas.getBoundingClientRect();// - canvas.clientHeight;
    var heig = box.getBoundingClientRect();
   
    var newHei = heig.height-(xak.x+xak.height)-30;
    */
    var boxconv = document.getElementById('conv');
    
    
    var boxbody = document.getElementsByTagName('body')[0];
    var Wboxbody = boxbody.clientHeight || boxbody.offsetHeight;
    var wid = dl;
    var razX = dl/3;
    var boxix = boxconv.offsetTop;
    var xakh = boxconv.offsetHeight;// - canvas.clientHeight;
    var heig = Wboxbody;
    var newHei = heig-(xakh+boxix)-2;
    //console.log(heig+' '+hexs+' '+xakh+' '+30);
    controler.width = wid;
    controler.height = newHei;
    
    var heblock = newHei/3;
    var razY = 0;
    
    
 //   controler.width = wid;
  //  controler.height = newHei;
    /*
     width: wid,
      height: newHei
          x: razX,
      y: 0,
      width: razX,
      height: heblock,*/
    
        controlCtx.strokeStyle="#ed8f62";
    //up
        controlCtx.strokeRect(razX,0,razX,heblock);
         
    //left        
        controlCtx.strokeRect(0,heblock,razX,heblock);
    
    //right        
        controlCtx.strokeRect(razX*2,heblock,razX,heblock);

    //down        
        controlCtx.strokeRect(razX,heblock*2,razX,heblock);
    
    
    
    picUp = new Image(); 
     picUp.src = 'img/up-128.png';
        picUp.onload = function() {
            controlCtx.drawImage(picUp, razX,0,razX,heblock);
        }
     picDown = new Image(); 
     picDown.src = 'img/down-128.png';
        picDown.onload = function() {
            controlCtx.drawImage(picDown, razX,heblock*2,razX,heblock);
        }
     picLeft = new Image(); 
     picLeft.src = 'img/left-128.png';
        picLeft.onload = function() {
            controlCtx.drawImage(picLeft, 0,heblock,razX,heblock);
        }
     picRight = new Image(); 
     picRight.src = 'img/right-128.png';
        picRight.onload = function() {
            controlCtx.drawImage(picRight, razX*2,heblock,razX,heblock);
        }
    
        
        
            startup();
    var ongoingTouches = [];
    
       function startup() {
          controler.addEventListener("touchstart", handleStart, false);
          controler.addEventListener("touchmove", handleMove, false);
        }
    
    
        function handleStart(event) {
            var touch = event.touches[0];
         //   console.log(touch);
          event.preventDefault();
 
          var touches = event.changedTouches;
          var x = touch.pageX - event.target.offsetLeft, 
              y = touch.pageY - event.target.offsetTop;
  
          for (var i = 0; i < touches.length; i++) {
              ongoingTouches.push(copyTouch(touches[i]));
       // var x = touch.pageX - event.target.offsetLeft,
    //        y = touch.pageY - event.target.offsetTop;
             ongoingTouches.push(copyTouch(touches[i])); 
            console.log(x+' '+y);
               console.log(x-10+' '+y);
              console.log(touch.radiusX+' '+touch.radiusY);
           
              //up razX,0,razX,heblock
            if((x>razX&&x<razX+razX)&&(y>0&&y<heblock)){
                 xv= yv != 1 ?  0 : xv;
                 yv= yv != 1 ? -1 : yv;
            } //down razX,heblock*2,razX,heblock
            else if((x>razX&&x<razX+razX)&&(y>heblock*2&&y<heblock*2+heblock)){
                 xv= yv != -1 ? 0 : xv;
                 yv= yv != -1 ? 1 : yv;
            } //left 0,heblock,razX,heblock
            else if((x>0&&x<razX)&&(y>heblock&&y<heblock+heblock)){
                 xv= xv != 1 ? -1 : xv;
                 yv= xv != 1 ?  0 : yv;
            } //right razX*2,heblock,razX,heblock
            else if((x>razX*2&&x<razX*2+razX)&&(y>heblock&&y<heblock+heblock)){
                 xv= xv != -1 ?  1 : xv;
                 yv= xv != -1 ?  0 : yv;
            } 
              
            //ongoingTouches.push(copyTouch(touches[i]));
         /*   var color = 'white';//colorForTouch(touches[i]);
            controlCtx.beginPath();
            controlCtx.fillStyle = color;
            controlCtx.arc(x, y, 10, 0, 2 * Math.PI, false);  // a circle at the start
            
            controlCtx.fill(); */
          // log("touchstart:" + x+'>'+bl*2+"...");//log("touchstart:" + i + ".");
              
          }
        }  
     //muvetuchlove
        function handleMove(event) {
          event.preventDefault();
          var touches = event.changedTouches;
            var touch = event.touches[0];
          var x = touch.pageX - event.target.offsetLeft, 
              y = touch.pageY - event.target.offsetTop;
            
          for (var i = 0; i < touches.length; i++) {
           // var color = 'white'; //colorForTouch(touches[i]);
            //var idx = ongoingTouchIndexById(touches[i].identifier);
              var idx = ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
             if((x>razX&&x<razX+razX)&&(y>0&&y<heblock)){
                 xv= yv != 1 ?  0 : xv;
                 yv= yv != 1 ? -1 : yv;
            } //down razX,heblock*2,razX,heblock
            else if((x>razX&&x<razX+razX)&&(y>heblock*2&&y<heblock*2+heblock)){
                 xv= yv != -1 ? 0 : xv;
                 yv= yv != -1 ? 1 : yv;
            } //left 0,heblock,razX,heblock
            else if((x>0&&x<razX)&&(y>heblock&&y<heblock+heblock)){
                 xv= xv != 1 ? -1 : xv;
                 yv= xv != 1 ?  0 : yv;
            } //right razX*2,heblock,razX,heblock
            else if((x>razX*2&&x<razX*2+razX)&&(y>heblock&&y<heblock+heblock)){
                 xv= xv != -1 ?  1 : xv;
                 yv= xv != -1 ?  0 : yv;
            } 
            
            } 
          }
        }
                function copyTouch(touch) {
                    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
                    }
                function ongoingTouchIndexById(idToFind) {
                      for (var i = 0; i < ongoingTouches.length; i++) {
                        var id = ongoingTouches[i].identifier;

                        if (id == idToFind) {
                          return i;
                        }
                      }
                      return -1;    // not found
                    }
      }    /*
function control2(){
    
       //     ctx.fillStyle="#4a3737";
     //   ctx.fillRect(0,bl*20,dl,bl*5);
    
    


            controlCtx.strokeStyle="#ed8f62";
        controlCtx.strokeRect(bl*2,bl*2+bl/2,bl*3,bl*2+bl/2);
         //   log("Левая кнопка x- "+bl*2+' y- '+(bl*20+bl/2)+' ширина- '+bl*3+' высота- '+(bl*2+bl/2));
            
        controlCtx.strokeRect(bl*6,bl*2+bl/2,bl*3,bl*2+bl/2);

            
        controlCtx.strokeRect(bl*11,bl*2+bl/2,bl*3,bl*2+bl/2);

            
        controlCtx.strokeRect(bl*15,bl*2+bl/2,bl*3,bl*2+bl/2);
    
    
    
     picUp = new Image(); 
     picUp.src = 'img/up-128.png';
        picUp.onload = function() {
            controlCtx.drawImage(picUp, bl*2, bl*2+bl/2,bl*3,bl*2+bl/2);
        }
     picDown = new Image(); 
     picDown.src = 'img/down-128.png';
        picDown.onload = function() {
            controlCtx.drawImage(picDown, bl*6,bl*2+bl/2,bl*3,bl*2+bl/2);
        }
     picLeft = new Image(); 
     picLeft.src = 'img/left-128.png';
        picLeft.onload = function() {
            controlCtx.drawImage(picLeft, bl*11,bl*2+bl/2,bl*3,bl*2+bl/2);
        }
     picRight = new Image(); 
     picRight.src = 'img/right-128.png';
        picRight.onload = function() {
            controlCtx.drawImage(picRight, bl*15,bl*2+bl/2,bl*3,bl*2+bl/2);
        }
    
            
    
    
        
    
    startup();
    
       function startup() {
            
          //var el = document.getElementsByTagName("canvas")[0];
          controler.addEventListener("touchstart", handleStart, false);
       //   canvas.addEventListener("touchend", handleEnd, false);
       //   canvas.addEventListener("touchcancel", handleCancel, false);
        //  canvas.addEventListener("touchmove", handleMove, false);
         // log("initialized.");
           
        }
    
    
        function handleStart(event) {
          var touch = event.touches[0];//event.targetTouches[0]; 
            console.log(touch);
          event.preventDefault();
        //  log("touchstart.");
          var touches = event.changedTouches;
          var x = touch.pageX - event.target.offsetLeft, 
              y = touch.pageY - event.target.offsetTop;
         // log("тачгор "+x+' тачверт '+y);  
          for (var i = 0; i < touches.length; i++) {
            
            console.log('touch');
              
            //x = touches[i].pageX;//e.pageX - e.target.offsetLeft,
            //y = touches[i].pageY;//e.pageY - e.target.offsetTop;
              
            if((x>bl*2&&x<bl*2+bl*3)&&(y>(bl*2)+(bl/2)&&y<(bl*2)+(bl/2)+(bl*2)+(bl/2))){
                 xv= yv != 1 ?  0 : xv;
                 yv= yv != 1 ? -1 : yv;
                
            }
            if((x>bl*6&&x<bl*6+bl*3)&&(y>bl*2+bl/2&&y<bl*2+bl/2+bl*2+bl/2)){
                 xv= yv != -1 ? 0 : xv;
                 yv= yv != -1 ? 1 : yv;
            }
            if((x>bl*11&&x<bl*11+bl*3)&&(y>bl*2+bl/2&&y<bl*2+bl/2+bl*2+bl/2)){
                 xv= xv != 1 ? -1 : xv;
                 yv= xv != 1 ?  0 : yv;
            }
            if((x>bl*15&&x<bl*15+bl*3)&&(y>bl*2+bl/2&&y<bl*2+bl/2+bl*2+bl/2)){
                 xv= xv != -1 ?  1 : xv;
                 yv= xv != -1 ?  0 : yv;
            }   
              
           // ongoingTouches.push(copyTouch(touches[i]));
           // var color = 'black';//colorForTouch(touches[i]);
            //ctx.beginPath();
            //ctx.arc(x, y, 10, 0, 2 * Math.PI, false);  // a circle at the start
            //ctx.fillStyle = color;
            //ctx.fill();
          // log("touchstart:" + x+'>'+bl*2+"...");//log("touchstart:" + i + ".");
            
 
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
    
    
}
    */
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
    //console.log(muvet);
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
        

    
        /*
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
    */


