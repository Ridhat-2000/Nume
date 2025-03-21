document.addEventListener('DOMContentLoaded', () => {
    // msgInput hide and show
    const chatBtn = document.querySelector('.chat');
    const chat_Box = document.querySelector('.chat_Box');
    const bw_image = document.querySelector('.bw_image');
    const chat = document.querySelector('.chat');
    chatBtn.addEventListener('click', () => {
        if(chat_Box.style.display === "flex")
        {
            chat_Box.style.display = "none";
            bw_image.style.filter = "none";
        }
        else
        {
            chat_Box.style.display = "flex";
            bw_image.style.filter = "blur(2px)";
            chat.style.backgroundImage = "url('./Resources/Photos/msg.png')";
        }
    });

    const audio = document.querySelector('.audio');
    const song = document.querySelector('.song');
    if (!(audio instanceof HTMLAudioElement)) {
        console.error("The selected '.audio' element is not an audio element!", audio);
    } else {
        song.addEventListener('click', () => {
            if (audio.paused) {
                console.log("audio played");
                audio.play();
                song.style.backgroundImage = "url('./Resources/Photos/SongOn.png')";
            } else {
                console.log("audio paused");
                audio.pause();
                song.style.backgroundImage = "url('./Resources/Photos/SongOff.png')";
            }
        });
    }

});