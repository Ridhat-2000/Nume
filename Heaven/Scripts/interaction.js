document.addEventListener('DOMContentLoaded', () => {
    // Interactionn with Nume's Photo
    const colorOverlay = document.querySelector('.color_overlay');

    document.addEventListener('mousemove', (e) => {
        const rect = colorOverlay.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        colorOverlay.style.mask = `radial-gradient(circle 125px at ${x}px ${y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)`;
        colorOverlay.style.webkitMask = `radial-gradient(circle 125px at ${x}px ${y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)`;


    });

    // Auto Scroll down
    const msgContainer = document.querySelector('.msg_Contener');

    function scrollToBottom() {
        console.log('scrolling');
        setTimeout(() => {
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }, 100);
    }

    // Scroll down whenever new content is added
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(msgContainer, { childList: true });
    // Scroll down whenever chat open
    const chat = document.querySelector('.chat');
    chat.addEventListener('click', () => {
        scrollToBottom();
    });
});