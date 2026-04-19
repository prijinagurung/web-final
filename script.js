document.addEventListener("DOMContentLoaded", () => {

feather.replace();
gsap.registerPlugin(ScrollTrigger);

initTheme();
initThemeToggle();
startClocks();
setYear();
runAnimations();

});

/* CLOCKS */
function startClocks(){

const localClock = document.getElementById("local-clock");
const localDate = document.getElementById("local-date");

const nepalClock = document.getElementById("nepal-clock");
const nepalDate = document.getElementById("nepal-date");

function update(){

const now = new Date();

localClock.textContent = now.toLocaleTimeString();
localDate.textContent = now.toDateString();

/* Nepal time */
const nepal = new Date(
now.toLocaleString("en-US",{timeZone:"Asia/Kathmandu"})
);

nepalClock.textContent = nepal.toLocaleTimeString();
nepalDate.textContent = nepal.toDateString();
}

update();
setInterval(update,1000);
}

/* AUTO THEME */
function initTheme() {
    const btn = document.getElementById("theme-toggle");
    const hour = new Date().getHours();

    // 6am to 5:59pm (hour 6 through 17) -> Light
    // 6pm to 5:59am (hour 18 through 5) -> Dark
    const isDayTime = hour >= 6 && hour < 18;
    const theme = isDayTime ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", theme);
    
    // Update the button icon to match
    if (btn) {
        btn.textContent = theme === "light" ? "🌙" : "☀️";
    }
}

/* MANUAL TOGGLE */
function initThemeToggle(){

const btn = document.getElementById("theme-toggle");

btn.addEventListener("click",()=>{

const current =
document.documentElement.getAttribute("data-theme");

const next = current === "light" ? "dark" : "light";

document.documentElement.setAttribute("data-theme",next);

localStorage.setItem("theme",next);

btn.textContent = next === "light" ? "🌙" : "☀️";

});
}

/* YEAR */
function setYear(){
document.getElementById("year").textContent =
new Date().getFullYear();
}

/* GSAP */
function runAnimations(){

gsap.from(".hero-content > *",{
opacity:0,
y:30,
duration:1,
stagger:.15
});

gsap.from(".card",{
scrollTrigger:{
trigger:".cards",
start:"top 80%"
},
opacity:0,
y:50,
duration:.8,
stagger:.2
});

gsap.to(".circle",{
y:25,
repeat:-1,
yoyo:true,
duration:3
});

gsap.to(".square",{
rotation:360,
repeat:-1,
duration:12,
ease:"linear"
});

gsap.to(".triangle",{
x:20,
repeat:-1,
yoyo:true,
duration:4
});

}