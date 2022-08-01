var txtInput = document.getElementById("txtInput").innerText;
var txtInput2 = document.getElementById("txtInput2").innerText;
var voiceList = document.querySelector("#voiceList");
var btnSpeak = document.querySelector("#btnSpeak");
var btnChange = document.querySelector("#btnChange");
var slider = document.getElementById("myRange");
var pitch = document.getElementById("myPitchs");
var btnPause = document.querySelector("#btnPause");
var btnResume = document.querySelector("#btnResume");
var btnStop = document.querySelector("#btnStop");
var synth = window.speechSynthesis;
var voices = [];
var myLines;
var myTitle;
var toSpeak;

PopulateVoices();
if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

fetchPoem = () => {
    axios
        .get("https://poetrydb.org/random")
        .then((response) => {
            myTitle = response.data[0].title;
            myLines = response.data[0].lines
                .join("<br>")
                .replaceAll("-", "")
                .replaceAll("—", "")
                .replaceAll("_", "");
            console.log(myLines);
            console.log(myLines);
        })
        .catch((error) => {
            console.log(error);
        });
};

fetchPoem();

btnSpeak.addEventListener("click", () => {
    toSpeak = new SpeechSynthesisUtterance(txtInput);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute("data-name");
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    toSpeak.pitch = pitch.value;
    toSpeak.rate = slider.value;
    synth.speak(toSpeak);
    btnPause.addEventListener("click", () => {
        synth.pause(toSpeak);
    });
    btnResume.addEventListener("click", () => {
        synth.resume(toSpeak);
    });
    btnStop.addEventListener("click", () => {
        synth.cancel(toSpeak);
    });
});

btnChange.addEventListener("click", () => {
    synth.cancel(toSpeak);
    fetchPoem();
    txtInput = myLines;
    document.getElementById("txtInput").innerHTML = myLines;
    document.getElementById("txtInput2").innerHTML = myTitle;
});

function PopulateVoices() {
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = "";
    voices.forEach((voice) => {
        var listItem = document.createElement("option");
        listItem.textContent = voice.name;
        listItem.setAttribute("data-lang", voice.lang);
        listItem.setAttribute("data-name", voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}
