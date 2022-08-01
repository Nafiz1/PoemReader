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
const voiceSelect = document.querySelector("select");
var myLines;
var myTitle;
var toSpeak;

fetchPoem = () => {
    axios
        .get("https://poetrydb.org/random")
        .then((response) => {
            myTitle = response.data[0].title;
            myLines = response.data[0].lines
                .join("<br />")
                .replaceAll("-", "")
                .replaceAll("—", "")
                .replaceAll("_", "");
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

function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;

        if (voices[i].default) {
            option.textContent += " — DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        if (i < 5) {
            voiceSelect.appendChild(option);
        }
    }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}
