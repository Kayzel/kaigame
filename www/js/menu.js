var box3 = document.getElementById('boxitem3');
var box2 = document.getElementById('boxitem2');
//recordGame
var recordGame = document.getElementById('recordGame');
//startGame
var burgerStr = document.getElementById('burger2');
var burgerRec = document.getElementById('burger');
var startGame = document.getElementById('startGame');


startGame.onclick = function(){
    if(!!burgerRec.checked){
        burgerRec.checked = false;
    }
}

recordGame.onclick = function(){
    if(!!burgerStr.checked){
        burgerStr.checked = false;
    }
}