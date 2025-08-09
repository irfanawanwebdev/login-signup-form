

let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");
let mainEl = document.querySelector(".main");

const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;

const syncSwitchWithMode = () => {
    if (!isMobile()) return; // only enforce on mobile
    if (!mainEl) return;
    if (mainEl.classList.contains('mode-b')) {
        // Active form: Sign In (b) → show SIGN UP panel
        switchC1.classList.add('is-hidden');
        switchC2.classList.remove('is-hidden');
    } else if (mainEl.classList.contains('mode-a')) {
        // Active form: Sign Up (a) → show SIGN IN panel
        switchC2.classList.add('is-hidden');
        switchC1.classList.remove('is-hidden');
    }
};

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function () {
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");

    // Toggle responsive mode classes for small screens only
    if (mainEl && isMobile()) {
        if (mainEl.classList.contains('mode-b')) {
            mainEl.classList.remove('mode-b');
            mainEl.classList.add('mode-a');
        } else {
            mainEl.classList.remove('mode-a');
            mainEl.classList.add('mode-b');
        }
        syncSwitchWithMode();
    }
}

let mainF = (e) => {
    // Default to sign-in view on load for mobile layout
    if (mainEl && isMobile() && !mainEl.classList.contains('mode-a') && !mainEl.classList.contains('mode-b')) {
        mainEl.classList.add('mode-b');
    }
    syncSwitchWithMode();

    // Keep behavior in sync across resizes
    window.addEventListener('resize', () => {
        if (!mainEl) return;
        if (isMobile()) {
            if (!mainEl.classList.contains('mode-a') && !mainEl.classList.contains('mode-b')) {
                mainEl.classList.add('mode-b');
            }
            syncSwitchWithMode();
        } else {
            // On desktop/tablet, restore default switch visibility control to original classes
            switchC1.classList.remove('is-hidden');
            switchC2.classList.add('is-hidden');
        }
    });
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons);
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);
