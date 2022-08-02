function fontchange(n) {
    var paragraph = document.getElementById("content");
    paragraph.style.fontSize = n + "px";
}

var buttons = document.querySelector(".buttons");
var button = buttons.querySelectorAll(".button");

for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    });
}
