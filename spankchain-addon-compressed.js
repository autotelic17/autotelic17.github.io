javascript:(function()%7Bif%20(!window.pluginLoaded)%7Bconst%20viewCountEl%20%3D%20document.querySelector(%22.viewerCount%22)%3Bconst%20gongAudio%20%3D%20new%20Audio(%22https%3A%2F%2Fautotelic17.github.io%2Fgong.wav%22)%3BgongAudio.volume%3D0.3%3Bfunction%20playGong()%7BgongAudio.play()%3B%7Dconst%20clickAudio%20%3D%20new%20Audio(%22https%3A%2F%2Fautotelic17.github.io%2Fslap.mp3%22)%3BclickAudio.volume%3D0.3%3Bfunction%20playClick()%7BclickAudio.play()%3B%7Dlet%20lastCount%20%3D%20Number(viewCountEl.innerHTML)%3Bfunction%20roomCheck()%7Bif%20(document.querySelector('.tab.active').innerText%20%3D%3D%20'Chat')%7BjoinCountCheck()%3BchatCheck()%3B%7D%7Dfunction%20joinCountCheck()%7Bif%20(document.getElementById('join-toggle-sound').innerHTML%20%3D%3D%20'%F0%9F%94%94')%7Blet%20nowCount%20%3D%20Number(viewCountEl.innerHTML)%3Bif%20(nowCount%20%3E%20lastCount)%7BplayGong()%3B%7DlastCount%20%3D%20nowCount%3B%7D%7Dlet%20lastChatMessage%20%3D%20document.querySelector('.chatMessage%3Alast-child').innerText%3Bfunction%20chatCheck()%7Bif%20(document.getElementById('chat-toggle-sound').innerHTML%20%3D%3D%20'%F0%9F%94%94')%7Bif%20(lastChatMessage%20!%3D%3D%20document.querySelector('.chatMessage%3Alast-child').innerText)%7BplayClick()%3BlastChatMessage%20%3D%20document.querySelector('.chatMessage%3Alast-child').innerText%7D%7D%7Dlet%20addonDiv%20%3D%20document.createElement('div')%3BaddonDiv.style.cssText%3D%20'text-align%3A%20right%3B%20color%3A%20gray%3B%20padding%3A%205px%3B%20font-size%3A%200.75em%3B'%3BaddonDiv.innerHTML%20%3D%20'Join%3A%20%3Ca%20id%3D%22join-toggle-sound%22%20href%3D%22%23%22%3E%F0%9F%94%94%3C%2Fa%3E%20%26nbsp%3B%20Chat%3A%20%3Ca%20id%3D%22chat-toggle-sound%22%20href%3D%22%23%22%3E%F0%9F%94%95%3C%2Fa%3E'%3Bdocument.querySelector('.tabsContainer').appendChild(addonDiv)%3Bdocument.getElementById('join-toggle-sound').onclick%20%3D%20soundToggle%3Bdocument.getElementById('chat-toggle-sound').onclick%20%3D%20soundToggle%3Bfunction%20soundToggle()%7Bif%20(this.innerHTML%20%3D%3D%20'%F0%9F%94%94')%7Bthis.innerHTML%20%3D%20'%F0%9F%94%95'%3B%7Delse%7Bthis.innerHTML%20%3D%20'%F0%9F%94%94'%3B%7Dreturn%20false%3B%7DsetInterval(roomCheck%2C%202000)%3Bwindow.pluginLoaded%20%3D%201%3B%7D%7D)()
