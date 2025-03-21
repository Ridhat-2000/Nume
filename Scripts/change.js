document.addEventListener("DOMContentLoaded", function () {
    let timeout; // Store timeout reference
    const mainCover = document.querySelector(".main_cover");
    const contener = document.querySelector(".contener");
    const contener2 = document.querySelector(".contener2");

    function cancelTransition() {
        clearTimeout(timeout); // Stop the transition timer
        // console.log("Transition cancelled");
    }

    mainCover.addEventListener("mouseenter", function () {
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
        function changeScene(index) {
            bgvideoSource.src = infoList[index].bgvideo;
            bgvideo.load();
            nphoto.style.backgroundImage = `url('${infoList[index].nphoto}')`;
            ntext1.innerText = infoList[index].ntext1;
            ntext2.innerText = infoList[index].ntext2;
        }
        const numbers = [1, 2, 3, 11, 21, 22];
        let index = numbers[Math.floor(Math.random() * numbers.length)];
        if(index > 10 && index < 21)
            nphoto.style.right = "0";
        else
            nphoto.style.left = "0";
        changeScene(index);
    }

    const infoList = {
        1: {
            bgvideo: "./Resources/Videos/BG0.mp4",
            nphoto: "./Resources/Photos/Nume1.png",
            ntext1: "Sometimes I think that, if I don’t do that all was be fine,",
            ntext2: "I am thdde one who need to be sorry,,, not you..."
        },
        2: {
            bgvideo: "./Resources/Videos/BG0.mp4",
            nphoto: "./Resources/Photos/Nume2.png",
            ntext1: "I am sorry for the way I acted,",
            ntext2: "It was not me, it was my heart..."
        },
        3: {
            bgvideo: "./Resources/Videos/BG0.mp4",
            nphoto: "./Resources/Photos/Nume3.png",
            ntext1: "I am sorry for the way I acted,",
            ntext2: "It was not me, it was my heart..."
        },
        11: {
            bgvideo: "./Resources/Videos/BG1.mp4",
            nphoto: "./Resources/Photos/Nume11.png",
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
});