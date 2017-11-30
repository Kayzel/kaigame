var box3 = document.getElementById('boxitem3');
var box2 = document.getElementById('boxitem2');
//recordGame
var recordGame = document.getElementById('recordGame');
//startGame
var burgerStr = document.getElementById('burger2');
var burgerRec = document.getElementById('burger');
var startGame = document.getElementById('startGame');
var uiItem = document.getElementById('uiItem'); 
var uiItem2 = document.getElementById('uiItem2'); //     transform: translateY(-200px);

startGame.onclick = function(){
  if(!burgerStr.checked){
      uiItem.style.transform = 'translateY(0px) scale(1)';
  } else {
       uiItem.style.transform = 'translateY(-200px) scale(0)';
  }
    
    
    
   
    
    
    
    
    if(!!burgerRec.checked){
        burgerRec.checked = false;
        
    }
}

recordGame.onclick = function(){
    
    if(!burgerRec.checked){
      uiItem2.style.transform = 'translateY(0px) scale(1)';
  } else {
       uiItem2.style.transform = 'translateY(-200px) scale(0)';
  }
    
    if(!!burgerStr.checked){
        burgerStr.checked = false;
    }
}