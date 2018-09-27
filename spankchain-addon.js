if (!window.pluginLoaded){

  const viewCountEl = document.querySelector(".viewerCount");
  const gongAudio = new Audio("http://www.rickshriver.net/sounds/keromong/gong%20A6.wav");
  gongAudio.volume=0.3;
  function playGong(){gongAudio.play();}

  const clickAudio = new Audio("https://freesound.org/data/previews/369/369955_6857950-lq.mp3");
  clickAudio.volume=0.3;
  function playClick(){clickAudio.play();}

  let lastCount = Number(viewCountEl.innerHTML);
  function roomCheck(){
    if (document.querySelector('.tab.active').innerText == 'Chat'){
      joinCountCheck();
      chatCheck();
    }
  }

  function joinCountCheck(){
    if (document.getElementById('join-toggle-sound').innerHTML == '🔔'){
      let nowCount = Number(viewCountEl.innerHTML);
      if (nowCount > lastCount){
        playGong();
      }
      lastCount = nowCount;
    }
  }

  let lastChatMessage = document.querySelector('.chatMessage:last-child').innerText;
  function chatCheck(){
    if (document.getElementById('chat-toggle-sound').innerHTML == '🔔'){
      if (lastChatMessage !== document.querySelector('.chatMessage:last-child').innerText){
        playClick();
        lastChatMessage = document.querySelector('.chatMessage:last-child').innerText
      }
    }
  }

  let addonDiv = document.createElement('div');
  addonDiv.style.cssText= 'text-align: right; color: gray; padding: 5px; font-size: 0.75em;';
  addonDiv.innerHTML = 'Join: <a id="join-toggle-sound" href="#">🔔</a> &nbsp; Chat: <a id="chat-toggle-sound" href="#">🔕</a>';


  document.querySelector('.tabsContainer').appendChild(addonDiv);

  document.getElementById('join-toggle-sound').onclick = soundToggle;
  document.getElementById('chat-toggle-sound').onclick = soundToggle;

  function soundToggle(){
    if (this.innerHTML == '🔔'){
      this.innerHTML = '🔕';
    }else{
      this.innerHTML = '🔔';
    }
  }

  setInterval(roomCheck, 2000);

  window.pluginLoaded = 1;
}
