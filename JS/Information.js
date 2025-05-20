const textarr = [
    "Join our company in Technology Zone of Visionary Innovation Hub for unparalleled opportunities in cutting-edge tech development! 15 QUOTAS LEFT!", 
    "Become part of the Innovation Zone at Visionary Innovation Hub, where creativity meets research for groundbreaking solutions! 10 QUOTAS LEFT!", 
    "Discover the Eco Zone at Visionary Innovation Hub, dedicated to sustainable practices and technologies for a greener future! 12 QUOTAS LEFT!"
];

function textloop(text) {
    var randomIndex = Math.floor(Math.random() * textarr.length);
    text.textContent = textarr[randomIndex];
}

const videos = [
    {
        mp4: "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.mp4",
        webm: "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.webm",
        h3: "Your browser does not support this video format"
    },
    {
        mp4: "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.mp4",
        webm: "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.webm",
        h3: "Your browser does not support this video format" 
    }
];

var index = 0;

function videoloop(index) {
    video.innerHTML = `
        <source src="${videos[index].mp4}" type="video/mp4">
        <source src="${videos[index].webm}" type="video/webm">
        <h3>${videos[index].h3}</h3>
    `;
    video.load();
    video.play();
}

function indexchange() {
    index = (index + 1) % videos.length; 
    videoloop(index);
}

function pageload() {
    const video = document.getElementById('video');
    const text = document.getElementById('t1');
    textloop(text);
    setInterval(() => textloop(text), 3000);
    videoloop(index);
    video.addEventListener('ended', indexchange);
};
window.onload = pageload;