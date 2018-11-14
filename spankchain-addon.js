if (window.pluginLoaded){
  alert('Plugin already loaded! Refresh page to reload it again.');
}

const version = '1.2.2';
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
};

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
};

let lastUsernameChat;
let lastChatMessage = document.querySelector('.chatMessage:last-child') && document.querySelector('.chatMessage:last-child').innerText;

let arraySpeed = [0.9,1,1.1];
function chatCheck(){
  if (document.querySelector('.chatMessage:last-child .chat-text') && lastChatMessage !== document.querySelector('.chatMessage:last-child .chat-text').innerText){
    if (document.getElementById('chat-toggle-sound').innerHTML == '🔔'){
      playChat();
    }
    lastUsernameChat = document.querySelector('.chatMessage:last-child .username') && document.querySelector('.chatMessage:last-child .username').innerText;
    lastChatMessage = document.querySelector('.chatMessage:last-child .chat-text') && document.querySelector('.chatMessage:last-child .chat-text').innerText;

    // Check to see if user is in "no-speak" list
	if (speakBanList.indexOf(lastUsernameChat) !== -1){
	  return;
	}

    if (document.getElementById('speak-toggle-sound').innerHTML == '🔔'){
      if (!userVoiceMap[lastUsernameChat]){
        const thisUser = userVoiceMap[lastUsernameChat] = {};
		thisUser.voiceRate = arraySpeed[Math.floor(Math.random()*arraySpeed.length)];
 		thisUser.voicePitch = arraySpeed[Math.floor(Math.random()*arraySpeed.length)];
      }
      if (userVoiceMap[lastUsernameChat] && (lastChatMessage.toLowerCase() == 'change voice' || !userVoiceMap[lastUsernameChat].voice)){
        const thisUser = userVoiceMap[lastUsernameChat] = {};
        const voices = window.speechSynthesis.getVoices();
        const voicesAr = voices.filter( obj => obj.lang.indexOf('en-') !== -1);
		thisUser.voiceRate = arraySpeed[Math.floor(Math.random()*arraySpeed.length)];
 		thisUser.voicePitch = arraySpeed[Math.floor(Math.random()*arraySpeed.length)];
        if (voicesAr && voicesAr.length){
          thisUser.voice = voicesAr[Math.floor(Math.random()*voicesAr.length)];
        }
      }

      let voiceMsg = new SpeechSynthesisUtterance(lastChatMessage);
	  voiceMsg.rate = userVoiceMap[lastUsernameChat].voiceRate;
	  voiceMsg.pitch = userVoiceMap[lastUsernameChat].voicePitch;
      if (userVoiceMap[lastUsernameChat].voice){
		voiceMsg.voice = userVoiceMap[lastUsernameChat].voice;
      }
      window.speechSynthesis.speak(voiceMsg);
    }
  }
};

let intervalTimer;
let promoMsg;
window.changePromoteTime = function(){
  let optionsEl = document.getElementById('promo-options'); 
  let minutes = Number(optionsEl.options[optionsEl.selectedIndex].value);
  promoMsg = document.getElementById('promote-text').value;
  clearInterval(intervalTimer);
  if (minutes !== 0){
    intervalTimer = setInterval(function(){
      sayMsg(document.getElementById('promote-text').value);
    }, minutes * 1000 * 60);
  }
};

window.saveLocalStorage = function(){
  localStorage.setItem('promoMsg', document.getElementById('promote-text').value);
};

window.sayButton = function(){
  sayMsg(document.getElementById('promote-text').value);
};

let addonDiv = document.createElement('div');
addonDiv.innerHTML = '<span>Version ' + version + '</span><span style="float: right">Roll: <a title="reset" id="dice-roll" href="#">🎲</a> <a style="display:none;" id="dice-reset" href="#">(r)</a> &nbsp; Join: <a id="join-toggle-sound" href="#">🔔</a> &nbsp; Leave: <a id="leave-toggle-sound" href="#">🔕</a> &nbsp; Chat: <a id="chat-toggle-sound" href="#">🔕</a>  &nbsp; Speak: <a id="speak-toggle-sound" href="#">🔕</a></span>';


const promoteDiv = document.createElement('div');
promoteDiv.style.cssText = addonDiv.style.cssText= 'color: gray; padding: 5px; font-size: 0.75em;';
promoteDiv.style.cssText += ' text-align: center';

promoteDiv.innerHTML = 'Promote: <input id="promote-text" maxlength="255" type="text" style="width: 70%;color: rgb(255, 59, 129);" value="' + (localStorage.getItem('promoMsg') || '') + '" onblur="saveLocalStorage()"><select id="promo-options" onchange="changePromoteTime()"><option value="0">off</option><option value="5">5 min</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">1 hr</option></select> Repeat: <button onclick="sayButton()">send</button>';

document.querySelector('.row.bottom').parentNode.insertBefore(promoteDiv, document.querySelector('.row.bottom'));
document.querySelector('.tabsContainer').appendChild(addonDiv);

document.getElementById('join-toggle-sound').onclick = soundToggle;
document.getElementById('leave-toggle-sound').onclick = soundToggle;
document.getElementById('chat-toggle-sound').onclick = soundToggle;
document.getElementById('speak-toggle-sound').onclick = soundToggle;
document.getElementById('dice-roll').onclick = diceRoll;
document.getElementById('dice-reset').onclick = diceReset;

function getRandomInt(max) {max = max - 1; return (Math.round(Math.random() * Math.floor(max))) + 1;};
function sayMsg(txt){
  document.querySelector('.chat-user-input').value = txt;
  document.querySelector('.send-btn').click();
};

function soundToggle(e){
  // The link (action) that was clicked.
  let elId = e.target.id;
  if (this.innerHTML == '🔔'){
    if (elId == 'speak-toggle-sound' && window.speechSynthesis && window.speechSynthesis.cancel){
  	  window.speechSynthesis.cancel();
    }
    this.innerHTML = '🔕';
  }else{
    if (elId == 'speak-toggle-sound' && window.speechSynthesis && window.speechSynthesis.resume){
  	  window.speechSynthesis.resume();
    }

    this.innerHTML = '🔔';
  }

  return false;
};

let diceSides = null;

function diceReset(){
  diceSides = null;
  document.getElementById('dice-reset').style.display = 'none';
  return false;
};

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
};


// We remember the last user we clicked on.
let lastUserClicked;
document.querySelector('.chatListInner').addEventListener('click', function(e){
  lastUserClicked = e.target.innerText;
  if (!noSpeakElAdded){
	setTimeout(function(){
	  addNoSpeak();
	},1)
  }
});

// Add no speak div
let noSpeakElAdded = false;
const speakBanList = [];
function addNoSpeak(){
  noSpeakElAdded = true;
  var noSpeakEl = document.createElement('span');
  noSpeakEl.onclick = function(){
    // No-speak user
 	if (speakBanList.indexOf(lastUserClicked) == -1){
	  speakBanList.push(lastUserClicked);
    // Un no-speak user
	}else{
      speakBanList.splice(speakBanList.indexOf(lastUserClicked), 1);
    }
	document.querySelector('.menu-x').click();
  }

  noSpeakEl.className = 'menu-button';
  noSpeakEl.style.cssText = 'display: inline-block; cursor: pointer';
  noSpeakEl.innerHTML = 'Toggle Speak';
  let menu = document.querySelector('.ToolTipPortal div');
  let separater = document.createElement('span');
  separater.innerHTML= '|';
  separater.className = 'menu-seperator';
  separater.style.cssText = 'padding: 0 10px;';
  menu.insertBefore(separater, menu.childNodes[0]);
  menu.insertBefore(noSpeakEl, menu.childNodes[0]);
}

function addCustomCSS(){
  var css = '.menu-button:hover{ color: rgb(255, 59, 129);}';
  var style = document.createElement('style');

  if (style.styleSheet) {
	style.styleSheet.cssText = css;
  } else {
	style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName('head')[0].appendChild(style);

}
addCustomCSS();

setInterval(roomCheck, 2000);

window.pluginLoaded = 1;
