if (!window.pluginLoaded){
  const version = '1.0.2';
  const viewCountEl = document.querySelector(".viewerCount");

  if (!viewCountEl){
    alert('Script error: You must be a cammer or moderator.');
  }
  const enterAudio = new Audio("https://autotelic17.github.io/gong.wav");
  enterAudio.volume=0.3;
  function playEnter(){enterAudio.play();}

  const chatAudio = new Audio("https://autotelic17.github.io/slap.mp3");
  chatAudio.volume=0.3;
  function playChat(){chatAudio.play();}

  const leaveAudio = new Audio("https://autotelic17.github.io/leave.mp3");
  leaveAudio.volume=0.2;
  function playLeave(){leaveAudio.play();}

  const diceAudio = new Audio("https://autotelic17.github.io/dice.mp3");
  diceAudio.volume=0.4;
  function playDice(){diceAudio.play();}

  let lastCount = viewCountEl && Number(viewCountEl.innerHTML);
  function roomCheck(){
    if (document.querySelector('.tab.active').innerText == 'Chat'){
      joinCountCheck();
      chatCheck();
    }
  }

  function joinCountCheck(){

    let nowCount = Number(viewCountEl.innerHTML);
    if (nowCount > lastCount){
      if (document.getElementById('join-toggle-sound').innerHTML == '🔔'){
        playEnter();
      }
    }else if (nowCount < lastCount){
      if (document.getElementById('leave-toggle-sound').innerHTML == '🔔'){
        playLeave();
      }
    }
    lastCount = nowCount;
  }

  let lastChatMessage = document.querySelector('.chatMessage:last-child') && document.querySelector('.chatMessage:last-child').innerText;
  function chatCheck(){
    if (document.getElementById('chat-toggle-sound').innerHTML == '🔔'){
      if (lastChatMessage !== document.querySelector('.chatMessage:last-child').innerText){
        playChat();
        lastChatMessage = document.querySelector('.chatMessage:last-child').innerText
      }
    }
  }

  let addonDiv = document.createElement('div');
  addonDiv.style.cssText= 'color: gray; padding: 5px; font-size: 0.75em;';
  addonDiv.innerHTML = '<span>Version ' + version + '</span><span style="float: right">Roll: <a id="dice-roll" href="#">🎲</a> &nbsp; Join: <a id="join-toggle-sound" href="#">🔔</a> &nbsp; Leave: <a id="leave-toggle-sound" href="#">🔕</a> &nbsp; Chat: <a id="chat-toggle-sound" href="#">🔕</a></span>';


  document.querySelector('.tabsContainer').appendChild(addonDiv);

  document.getElementById('join-toggle-sound').onclick = soundToggle;
  document.getElementById('leave-toggle-sound').onclick = soundToggle;
  document.getElementById('chat-toggle-sound').onclick = soundToggle;
  document.getElementById('dice-roll').onclick = diceRoll;

  function getRandomInt(max) {max = max - 1; return (Math.round(Math.random() * Math.floor(max))) + 1;}
  function sayMsg(txt){
    document.querySelector('.chat-user-input').value = txt;
    document.querySelector('.send-btn').click();
  }

  function soundToggle(){
    if (this.innerHTML == '🔔'){
      this.innerHTML = '🔕';
    }else{
      this.innerHTML = '🔔';
    }

    return false;
  }

  function diceRoll(){
    sayMsg('Rolling the dice... 🎲');
    playDice();
    setTimeout(function(){
      sayMsg('You got ' + getRandomInt(12) + '!');
    }, 1000);
    return false;
  }

  setInterval(roomCheck, 2000);

  window.pluginLoaded = 1;
}
