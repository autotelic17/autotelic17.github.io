javascript:(function()%7Bif%20(!window.pluginLoaded)%7Bconst%20version%20%3D%20'1.1'%3Bconst%20viewCountEl%20%3D%20document.querySelector(%22.viewerCount%22)%3Bif%20(!viewCountEl)%7Balert('Script%20error%3A%20You%20must%20be%20a%20cammer%20or%20moderator.')%3B%7Dconst%20enterAudio%20%3D%20new%20Audio(%22https%3A%2F%2Fautotelic17.github.io%2Fgong.wav%22)%3BenterAudio.volume%3D0.3%3Bfunction%20playEnter()%7BenterAudio.play()%3B%7Dconst%20chatAudio%20%3D%20new%20Audio(%22https%3A%2F%2Fautotelic17.github.io%2Fslap.mp3%22)%3BchatAudio.volume%3D0.3%3Bfunction%20playChat()%7BchatAudio.play()%3B%7Dconst%20leaveAudio%20%3D%20new%20Audio(%22https%3A%2F%2Fautotelic17.github.io%2Fleave.mp3%22)%3BleaveAudio.volume%3D0.2%3Bfunction%20playLeave()%7BleaveAudio.play()%3B%7Dconst%20diceAudio%20%3D%20new%20Audio(%22https%3A%2F%2Fautotelic17.github.io%2Fdice.mp3%22)%3BdiceAudio.volume%3D0.4%3Bfunction%20playDice()%7BdiceAudio.play()%3B%7Dconst%20userVoiceMap%20%3D%20%7B%7D%3Blet%20lastCount%20%3D%20viewCountEl%20%26%26%20Number(viewCountEl.innerHTML)%3Bfunction%20roomCheck()%7Bif%20(document.querySelector('.tab.active').innerText%20%3D%3D%20'Chat')%7BjoinCountCheck()%3BchatCheck()%3B%7D%7Dfunction%20joinCountCheck()%7Blet%20nowCount%20%3D%20Number(viewCountEl.innerHTML)%3Bif%20(nowCount%20%3E%20lastCount)%7Bif%20(document.getElementById('join-toggle-sound').innerHTML%20%3D%3D%20'%F0%9F%94%94')%7BplayEnter()%3B%7D%7Delse%20if%20(nowCount%20%3C%20lastCount)%7Bif%20(document.getElementById('leave-toggle-sound').innerHTML%20%3D%3D%20'%F0%9F%94%94')%7BplayLeave()%3B%7D%7DlastCount%20%3D%20nowCount%3B%7Dlet%20lastUsernameChat%3Blet%20lastChatMessage%20%3D%20document.querySelector('.chatMessage%3Alast-child')%20%26%26%20document.querySelector('.chatMessage%3Alast-child').innerText%3Blet%20arraySpeed%20%3D%20%5B0.9%2C1%2C1.1%5D%3Bfunction%20chatCheck()%7Bif%20(lastChatMessage%20!%3D%3D%20document.querySelector('.chatMessage%3Alast-child%20.chat-text').innerText)%7Bif%20(document.getElementById('chat-toggle-sound').innerHTML%20%3D%3D%20'%F0%9F%94%94')%7BplayChat()%3B%7DlastUsernameChat%20%3D%20document.querySelector('.chatMessage%3Alast-child%20.username')%20%26%26%20document.querySelector('.chatMessage%3Alast-child%20.username').innerText%3BlastChatMessage%20%3D%20document.querySelector('.chatMessage%3Alast-child%20.chat-text')%20%26%26%20document.querySelector('.chatMessage%3Alast-child%20.chat-text').innerText%3Bif%20(document.getElementById('speak-toggle-sound').innerHTML%20%3D%3D%20'%F0%9F%94%94')%7Bif%20(!userVoiceMap%5BlastUsernameChat%5D)%7Bconst%20thisUser%20%3D%20userVoiceMap%5BlastUsernameChat%5D%20%3D%20%7B%7D%3BthisUser.voiceRate%20%3D%20arraySpeed%5BMath.floor(Math.random()*arraySpeed.length)%5D%3BthisUser.voicePitch%20%3D%20arraySpeed%5BMath.floor(Math.random()*arraySpeed.length)%5D%3B%7Dif%20(userVoiceMap%5BlastUsernameChat%5D%20%26%26%20(lastChatMessage.toLowerCase()%20%3D%3D%20'change%20voice'%20%7C%7C%20!userVoiceMap%5BlastUsernameChat%5D.voice))%7Bconst%20thisUser%20%3D%20userVoiceMap%5BlastUsernameChat%5D%20%3D%20%7B%7D%3Bconst%20voices%20%3D%20window.speechSynthesis.getVoices()%3Bconst%20voicesAr%20%3D%20voices.filter(%20obj%20%3D%3E%20obj.lang.indexOf('en-')%20!%3D%3D%20-1)%3BthisUser.voiceRate%20%3D%20arraySpeed%5BMath.floor(Math.random()*arraySpeed.length)%5D%3BthisUser.voicePitch%20%3D%20arraySpeed%5BMath.floor(Math.random()*arraySpeed.length)%5D%3Bif%20(voicesAr%20%26%26%20voicesAr.length)%7BthisUser.voice%20%3D%20voicesAr%5BMath.floor(Math.random()*voicesAr.length)%5D%3B%7D%7Dlet%20voiceMsg%20%3D%20new%20SpeechSynthesisUtterance(lastChatMessage)%3BvoiceMsg.rate%20%3D%20userVoiceMap%5BlastUsernameChat%5D.voiceRate%3BvoiceMsg.pitch%20%3D%20userVoiceMap%5BlastUsernameChat%5D.voicePitch%3Bif%20(userVoiceMap%5BlastUsernameChat%5D.voice)%7BvoiceMsg.voice%20%3D%20userVoiceMap%5BlastUsernameChat%5D.voice%3B%7Dwindow.speechSynthesis.speak(voiceMsg)%3B%7D%7D%7Dlet%20addonDiv%20%3D%20document.createElement('div')%3BaddonDiv.style.cssText%3D%20'color%3A%20gray%3B%20padding%3A%205px%3B%20font-size%3A%200.75em%3B'%3BaddonDiv.innerHTML%20%3D%20'%3Cspan%3EVersion%20'%20%2B%20version%20%2B%20'%3C%2Fspan%3E%3Cspan%20style%3D%22float%3A%20right%22%3ERoll%3A%20%3Ca%20title%3D%22reset%22%20id%3D%22dice-roll%22%20href%3D%22%23%22%3E%F0%9F%8E%B2%3C%2Fa%3E%20%3Ca%20style%3D%22display%3Anone%3B%22%20id%3D%22dice-reset%22%20href%3D%22%23%22%3E(r)%3C%2Fa%3E%20%26nbsp%3B%20Join%3A%20%3Ca%20id%3D%22join-toggle-sound%22%20href%3D%22%23%22%3E%F0%9F%94%94%3C%2Fa%3E%20%26nbsp%3B%20Leave%3A%20%3Ca%20id%3D%22leave-toggle-sound%22%20href%3D%22%23%22%3E%F0%9F%94%95%3C%2Fa%3E%20%26nbsp%3B%20Chat%3A%20%3Ca%20id%3D%22chat-toggle-sound%22%20href%3D%22%23%22%3E%F0%9F%94%95%3C%2Fa%3E%20%20%26nbsp%3B%20Speak%3A%20%3Ca%20id%3D%22speak-toggle-sound%22%20href%3D%22%23%22%3E%F0%9F%94%95%3C%2Fa%3E%3C%2Fspan%3E'%3Bdocument.querySelector('.tabsContainer').appendChild(addonDiv)%3Bdocument.getElementById('join-toggle-sound').onclick%20%3D%20soundToggle%3Bdocument.getElementById('leave-toggle-sound').onclick%20%3D%20soundToggle%3Bdocument.getElementById('chat-toggle-sound').onclick%20%3D%20soundToggle%3Bdocument.getElementById('speak-toggle-sound').onclick%20%3D%20soundToggle%3Bdocument.getElementById('dice-roll').onclick%20%3D%20diceRoll%3Bdocument.getElementById('dice-reset').onclick%20%3D%20diceReset%3Bfunction%20getRandomInt(max)%20%7Bmax%20%3D%20max%20-%201%3B%20return%20(Math.round(Math.random()%20*%20Math.floor(max)))%20%2B%201%3B%7Dfunction%20sayMsg(txt)%7Bdocument.querySelector('.chat-user-input').value%20%3D%20txt%3Bdocument.querySelector('.send-btn').click()%3B%7Dfunction%20soundToggle()%7Bif%20(this.innerHTML%20%3D%3D%20'%F0%9F%94%94')%7Bthis.innerHTML%20%3D%20'%F0%9F%94%95'%3B%7Delse%7Bthis.innerHTML%20%3D%20'%F0%9F%94%94'%3B%7Dreturn%20false%3B%7Dlet%20diceSides%20%3D%20null%3Bfunction%20diceReset()%7BdiceSides%20%3D%20null%3Bdocument.getElementById('dice-reset').style.display%20%3D%20'none'%3Breturn%20false%3B%7Dfunction%20diceRoll()%7Bif%20(!diceSides)%7BdiceSides%20%3D%20prompt(%22How%20many%20sided%20dice%3F%22%2C%20%226%22)%3BdiceSides%20%3D%20parseInt(diceSides)%3Bdocument.getElementById('dice-reset').style.display%20%3D%20'inline'%3B%7DsayMsg('Rolling%20the%20dice...%20%F0%9F%8E%B2')%3BplayDice()%3BsetTimeout(function()%7BsayMsg('You%20got%20'%20%2B%20getRandomInt(12)%20%2B%20'!')%3B%7D%2C%201000)%3Breturn%20false%3B%7DsetInterval(roomCheck%2C%202000)%3Bwindow.pluginLoaded%20%3D%201%3B%7D%7D)()