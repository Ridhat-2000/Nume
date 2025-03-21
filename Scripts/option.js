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
});