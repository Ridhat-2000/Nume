let gIndex = 1;
document.addEventListener("DOMContentLoaded", function () {
    let timeout; // Store timeout reference
    const mainCover = document.querySelector(".main_cover");
    const contener = document.querySelector(".contener");
    const contener2 = document.querySelector(".contener2");
    const chat_Box = document.querySelector('.chat_Box');

    function cancelTransition() {
        clearTimeout(timeout); // Stop the transition timer
        // console.log("Transition cancelled");
    }

    mainCover.addEventListener("mouseenter", function () {
        console.log("1");
        if(!(chat_Box.style.display === "flex")){
            console.log("2");
        // console.log("mouseenter event triggered");
        timeout = setTimeout(() => {
            // console.log("Starting fadeOut");
            setup();
            fadeOut(contener, () => {
                contener.style.display = "none"; // Hide contener after fade-out
                // console.log("Starting fadeIn");
                fadeIn(contener2);
            });
        }, 3000); // 3-second delay
        }
    });
    // Click on contener2 to switch back to contener
    contener2.addEventListener("click", function () {
        fadeOut(contener2, () => {
            contener2.style.display = "none"; // Hide contener2 after fade-out
            fadeIn(contener);
        });
    });

    mainCover.addEventListener("mouseleave", cancelTransition);

    function fadeOut(element, callback) {
        // console.log("fadeOut called");
        let opacity = 1;
        const fadeEffect = setInterval(() => {
            if (opacity > 0) {
                opacity -= 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect);
                callback(); // Call the callback function after fade-out
            }
        }, 50);
    }

    function fadeIn(element) {
        // console.log("fadeIn called");
        element.style.display = "flex"; // Make contener2 visible
        changeAuido();
        element.style.opacity = 0;
        let opacity = 0;
        const fadeEffect = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect);
            }
        }, 50);
    }

    function setup(){
        const bgvideo = document.querySelector('.bgvideo');
        const bgvideoSource = bgvideo.querySelector('source');
        const nphoto = document.querySelector('.nphoto');
        const ntext1 = document.querySelector('.ntext1');
        const ntext2 = document.querySelector('.ntext2');
        const audio = document.querySelector('.audio');
        function changeScene(index) {
            bgvideoSource.src = infoList[index].bgvideo;
            bgvideo.load();
            nphoto.style.backgroundImage = `url('${infoList[index].nphoto}')`;
            ntext1.innerText = infoList[index].ntext1;
            ntext2.innerText = infoList[index].ntext2;
        }
        const numbers = [1, 2, 3, 11, 12, 21, 22];
        let index = numbers[Math.floor(Math.random() * numbers.length)];
        if(index > 10 && index < 21)
            nphoto.style.right = "0";
        else
            nphoto.style.left = "0";
        gIndex = index;
        changeScene(index);
    }

    const infoList = {
        1: {
            bgvideo: "./Resources/Videos/BG0.mp4",
            nphoto: "./Resources/Photos/Nume1.png",
            ntext1: "It's not just a song—I mean it. I always think about you. Maybe that's why I never feel like we are apart,,,",
            ntext2: "It's you who is always with me whenever I am alone, even though it's just my imagination..."
        },
        2: {
            bgvideo: "./Resources/Videos/BG0.mp4",
            nphoto: "./Resources/Photos/Nume2.png",
            ntext1: "In a saree, you look so gorgeous.Now, as I write this, I don’t know why,",
            ntext2: " but I feel an unknown relief and happiness. I’m just smiling right now. Thank you,,,"
        },
        3: {
            bgvideo: "./Resources/Videos/BG0.mp4",
            nphoto: "./Resources/Photos/Nume3.png",
            ntext1: "I just don't know what I'm supposed to say or what I should say. You look just so cute in this photo,,,",
            ntext2: "When I see you, it's just breathtaking. I forget to act, and I can't describe what I'm feeling then..."
        },
        11: {
            bgvideo: "./Resources/Videos/BG1.mp4",
            nphoto: "./Resources/Photos/Nume11.png",
            ntext1: "I am sorry for the way I acted,",
            ntext2: "It was not me, it was my heart..."
        },
        12: {
            bgvideo: "./Resources/Videos/BG1.mp4",
            nphoto: "./Resources/Photos/Nume12.png",
            ntext1: "I am sorry for the way I acted,",
            ntext2: "It was not me, it was my heart..."
        },
        21: {
            bgvideo: "./Resources/Videos/BG2.mp4",
            nphoto: "./Resources/Photos/Nume21.png",
            ntext1: "I am sorry for the way I acted,",
            ntext2: "It was not me, it was my heart..."
        },
        22: {
            bgvideo: "./Resources/Videos/BG2.mp4",
            nphoto: "./Resources/Photos/Nume22.png",
            ntext1: "I am sorry for the way I acted,",
            ntext2: "It was not me, it was my heart..."
        }
    };

    function changeAuido(){
        if(!(contener2.style.display === "none")){
            const audio = document.querySelector('.audio');
            audio.src = audioInFo[gIndex];
            audio.load();
            audio.play();
        }
        else{
            const audio = document.querySelector('.audio');
            audio.src = "./Resources/Songs/Roshni.mp3";
            audio.load();
            audio.play();
        }

        
    }
    const audioInFo = {
        1:  "./Resources/Songs/Kya_kiya.mp3",
        2:  "./Resources/Songs/Iktara.mp3",
        3:  "./Resources/Songs/Aankhon.mp3",
        11: "./Resources/Songs/Tu_hay.mp3",
        12: "./Resources/Songs/Naina.mp3",
        21: "./Resources/Songs/Jis_din.mp3",
        22: "./Resources/Songs/Dill_tu.mp3"
    }
});