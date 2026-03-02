document.addEventListener("DOMContentLoaded", function () {

    const texts = ["Student", "Learner", "Developer"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    function type() {

        if (count === texts.length) {
            count = 0;
        }

        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        const typingElement = document.getElementById("typing");

        if (typingElement) {
            typingElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            count++;
            index = 0;
        }

        setTimeout(type, 150);
    }

    type();
});
