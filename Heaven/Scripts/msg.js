import { app } from "../Config/register.js";
import { getDatabase, ref, set, query, onValue, orderByKey, limitToLast} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const db = getDatabase(app);

// submit msg..................................................//
const send = document.querySelector('.send');
const msgInput = document.querySelector('.msg_Input');
const who_Check = document.querySelector('.who_Check');

send.addEventListener('click', sendMessage);

msgInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const msg = msgInput.value;
    if (msg) {
        writemsg(msg, who_Check.checked
            ? 'sayan'
            : 'nume');
        msgInput.value = '';
    }
}

function writemsg(msg, who) {
    const timestamp = getISTFormattedDate();
    console.log(timestamp);
    const reference = ref(db, 'chat/' + timestamp);

    set(reference, {
        msg: msg,
        who: who
    });
}

function getISTFormattedDate() {
    const now = new Date();

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);

    const yy = String(istTime.getUTCFullYear()).slice(-2);         // Last 2 digits of year
    const mm = String(istTime.getUTCMonth() + 1).padStart(2, '0'); // Month (2 digits)
    const dd = String(istTime.getUTCDate()).padStart(2, '0');      // Day (2 digits)
    const hh = String(istTime.getUTCHours()).padStart(2, '0');     // Hour (2 digits)
    const min = String(istTime.getUTCMinutes()).padStart(2, '0');  // Minute (2 digits)
    const sec = String(istTime.getUTCSeconds()).padStart(2, '0');  // Second (2 digits)

    return `${yy}${mm}${dd}${hh}${min}${sec}`;
}

//.............................................................//

// read msg....................................................//
const chatRef = ref(db, 'chat');
const chat = document.querySelector('.chat');
// Load msg
window.addEventListener('DOMContentLoaded', () => {
    onValue(chatRef, async (snapshot) => {
        if (snapshot.exists()) {
            for (const childSnapshot of Object.values(snapshot.val())) {
                const data = childSnapshot;
                await displaymsg(data.msg, data.who);
            }
        }
        chat.style.backgroundImage = "url('./Resources/Photos/nmsg.png')";

        
    }, { onlyOnce: true });
});

// Real time Load
let isInitialLoad = true;
const recentMessageQuery = query(chatRef, orderByKey(), limitToLast(1));
const chat_Box = document.querySelector('.chat_Box');
onValue(recentMessageQuery, async (snapshot) => {
    if (isInitialLoad) {
        isInitialLoad = false;
        return;  
    }
    if(chat_Box.style.display === "none")
        chat.style.backgroundImage = "url('./Resources/Photos/nmsg.png')";
    for (const childSnapshot of Object.values(snapshot.val())) {
        const data = childSnapshot;
        await displaymsg(data.msg, data.who);
    }
});

// Display msg
async function displaymsg(msg,who)
{
    const msgDiv = document.createElement('div');
    const msgContainer = document.querySelector('.msg_Contener');
    const who_Check = document.querySelector('.who_Check');
    msgDiv.classList.add('msg');
    msgDiv.textContent = msg;
    msgContainer.appendChild(msgDiv);
    const lineHeight = parseInt(window.getComputedStyle(msgDiv).lineHeight,10);
    const lines = Math.ceil(msgDiv.scrollHeight / lineHeight);
    msgDiv.style.height = `${lineHeight * lines}px`;
    if(who == "sayan"){
        msgDiv.style.backgroundColor = "#C8F3FF";
        if(who_Check.checked)
            msgDiv.style.alignSelf = "self-end";
        else
            msgDiv.style.alignSelf = "self-start";
    } else if(who == "nume"){
        msgDiv.style.backgroundColor = "#FFE4E5";
        if(who_Check.checked)
            msgDiv.style.alignSelf = "self-start";
        else
            msgDiv.style.alignSelf = "self-end";
    }
}
//.............................................................//

// Who Change..................................................//
who_Check.addEventListener('change', function() {
    if(who_Check.checked)
        who_Check.style.opacity = "1";
    else
        who_Check.style.opacity = "0";
    const chatRef = ref(db, 'chat');

    // Clear chat
    const msgContainer = document.querySelector('.msg_Contener');
    msgContainer.innerHTML = '';
    // Load msg
    onValue(chatRef, async (snapshot) => {
        if (snapshot.exists()) {
            for (const childSnapshot of Object.values(snapshot.val())) {
                const data = childSnapshot;
                await displaymsg(data.msg, data.who);
            }
        }
    }, { onlyOnce: true });
});
//.............................................................//