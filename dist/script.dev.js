"use strict";

var dino = document.querySelector(".dino");
var background = document.querySelector('.background');
var isJump = false;
var position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJump) {
      jump();
    }
  }
}

function jump() {
  isJump = true;
  var upInterval = setInterval(function () {
    if (position >= 150) {
      clearInterval(upInterval); //Descendo

      var downInterval = setInterval(function () {
        if (position <= 0) {
          clearInterval(downInterval);
          isJump = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      //Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  var cactus = document.createElement('div');
  var cactusPosition = 1000;
  var randomTime = Math.random() * 6000;
  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);
  var leftInterval = setInterval(function () {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="gamer-over">Fim de Jogo </h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);