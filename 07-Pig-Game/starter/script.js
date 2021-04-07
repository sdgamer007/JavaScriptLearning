'use strict';

var scores, roundScore, activePlayer, gamePlaying , prevDice, winningValue;
 



//document.querySelector('#current--'+activePlayer).innerHTML = '<em>' + dice + '</em>'

reset();


document.querySelector('.btn--roll').addEventListener('click',function(){
    myFunction() ;
    if(gamePlaying){ //1>roll the dice
 var dice = Math.floor(Math.random()*6)+1;
 var dice2 = Math.floor(Math.random()*6)+1;

    //2>Display the result
    var diceDOM=document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

    var diceDOM=document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice2+'.png';
   // document.querySelector('#current--'+activePlayer).innerHTML = '<em>' + dice + '</em>'

   
 if(prevDice === 6 && dice === 6){
    scores[activePlayer]=0;
    document.getElementById('score--'+activePlayer).textContent = 0;
    nextPlayer();
 }

   else if(dice!== 1 || dice2 != 1){
        //add score
        roundScore += dice + dice2;
        document.querySelector('#current--'+activePlayer).innerHTML = '<em>' + roundScore + '</em>'
       
    }
    else{
        //Next player
        nextPlayer()
    }
    prevDice = dice;
    console.log(prevDice)
    }
});

document.querySelector('.btn--hold').addEventListener('click',function(){
    // add current score to global score table

    myFunction();
    if(gamePlaying){
    scores[activePlayer] += roundScore

    //update the ui
    document.getElementById('score--'+activePlayer).textContent =scores[activePlayer];


    //if player has won the game, update
   winningValue = document.getElementById('total').value
   console.log("assasa"+winningValue)
    if(scores[activePlayer]>=total)
    {
        document.getElementById('name--'+activePlayer).textContent='WINNER';
        document.querySelector('.dice').style.display = 'None';
        document.querySelector('.dice2').style.display = 'None';
        document.querySelector('.player--'+activePlayer).classList.add('winner');
        document.querySelector('.player--'+activePlayer).classList.remove('active');
        gamePlaying=false;
    }

    else{
    nextPlayer();
    }}
});


document.querySelector('.btn--new').addEventListener('click',function(){
    reset();
});

function  nextPlayer(){

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore =0
    document.getElementById('current--0').textContent ='0'
    document.getElementById('current--1').textContent ='0'
    document.querySelector('.player--0').classList.toggle('active')
    document.querySelector('.player--1').classList.toggle('active')

    document.querySelector('.dice').style.display = 'None'
    document.querySelector('.dice2').style.display = 'None'

}


function reset(){
scores=[0,0];
prevDice=0;
activePlayer=0;
gamePlaying = true;
roundScore =0;

document.getElementById('total').readOnly = false;
document.getElementById('total').value = 20;


    document.querySelector('.dice').style.display = 'None'
    document.querySelector('.dice2').style.display = 'None'

document.getElementById('score--0').textContent ='0'
document.getElementById('score--1').textContent ='0'
document.getElementById('current--0').textContent ='0'
document.getElementById('current--1').textContent ='0'
document.getElementById('name--0').textContent='Player 1';
document.getElementById('name--1').textContent='Player 2';
document.querySelector('.player--0').classList.remove('winner');
document.querySelector('.player--1').classList.remove('winner');

document.querySelector('.player--0').classList.remove('active');
document.querySelector('.player--1').classList.remove('active');
}

function myFunction() {
    var x, text;
  
    // Get the value of the input field with id="numb"
    x = document.getElementById("total").value;
  
    
    if (isNaN(x) || x <20 || x >250) {
        alert('Total winning value should be between 20 and 250');
        gamePlaying = false;
      
    } 
    
    document.getElementById("demo").innerHTML = text;
  }