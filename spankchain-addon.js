if (!window.pluginLoaded){
  const version = '1.1';
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

  const userVoiceMap = {};

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
  let lastUsernameChat;
  let lastChatMessage = document.querySelector('.chatMessage:last-child') && document.querySelector('.chatMessage:last-child .chat-text').innerText;
  
  let arraySpeed = [0.9,1,1.1]
  function chatCheck(){ 
    if (lastChatMessage !== document.querySelector('.chatMessage:last-child .chat-text').innerText){
      if (document.getElementById('chat-toggle-sound').innerHTML == '🔔'){
        playChat();
      }
      lastUsernameChat = document.querySelector('.chatMessage:last-child .username').innerText;
      lastChatMessage = document.querySelector('.chatMessage:last-child .chat-text').innerText;
      if (document.getElementById('speak-toggle-sound').innerHTML == '🔔'){
        if (!userVoiceMap[lastUsernameChat]){
		  userVoiceMap[lastUsernameChat] = {};
		  userVoiceMap[lastUsernameChat].voiceRate = arraySpeed[Math.floor(Math.random()*arraySpeed.length)];
 		  userVoiceMap[lastUsernameChat].voicePitch = arraySpeed[Math.floor(Math.random()*arraySpeed.length)];
        }
        let voiceMsg = new SpeechSynthesisUtterance(lastChatMessage);
		voiceMsg.rate = userVoiceMap[lastUsernameChat].voiceRate;
		voiceMsg.pitch = userVoiceMap[lastUsernameChat].voicePitch;
        window.speechSynthesis.speak(voiceMsg);
      }        
    }
  }

  let addonDiv = document.createElement('div');
  addonDiv.style.cssText= 'color: gray; padding: 5px; font-size: 0.75em;';
  addonDiv.innerHTML = '<span>Version ' + version + '</span><span style="float: right">Roll: <a title="reset" id="dice-roll" href="#">🎲</a> <a style="display:none;" id="dice-reset" href="#">(r)</a> &nbsp; Join: <a id="join-toggle-sound" href="#">🔔</a> &nbsp; Leave: <a id="leave-toggle-sound" href="#">🔕</a> &nbsp; Chat: <a id="chat-toggle-sound" href="#">🔕</a>  &nbsp; Speak: <a id="speak-toggle-sound" href="#">🔔</a></span>';


  document.querySelector('.tabsContainer').appendChild(addonDiv);

  document.getElementById('join-toggle-sound').onclick = soundToggle;
  document.getElementById('leave-toggle-sound').onclick = soundToggle;
  document.getElementById('chat-toggle-sound').onclick = soundToggle;
  document.getElementById('speak-toggle-sound').onclick = soundToggle;
  document.getElementById('dice-roll').onclick = diceRoll;
  document.getElementById('dice-reset').onclick = diceReset;

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

  let diceSides = null;

  function diceReset(){
    diceSides = null;
    document.getElementById('dice-reset').style.display = 'none';
    return false;
  }

  function diceRoll(){
    if (!diceSides){
      diceSides = prompt("How many sided dice?", "6");
      diceSides = parseInt(diceSides);
      document.getElementById('dice-reset').style.display = 'inline';
    }
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