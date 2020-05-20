import openChat from './openChat';

// inbox, buttons dynamically created from the chats that you have
inboxMsgButton(() => {
    document.getElementById("chatsStarted").innerHTML = "";
    document.getElementById('searchUser').style.display = "none";
    document.getElementById('inbox').style.display = "block";
    document.getElementById('sendNewMessage').style.display = "none";

    for (var c = 0; c < chats.length; c++) {
        if (chats[c].includes(user[2])) {
            var btn = document.createElement('input');
            btn.setAttribute('type', 'button')
            btn.setAttribute('value', chats[c].toString().replace(user[2], '').replace('-', ''));
            btn.setAttribute('id', c);
            btn.onclick = openChat();
            document.getElementById('chatsStarted').appendChild(btn);
        }
    }
})

module.export.inboxMsgButton = inboxMsgButton;