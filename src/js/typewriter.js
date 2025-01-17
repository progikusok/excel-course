export class Typewriter {
  index = 0;
  charIndex = 0;
  isTyping = true;

  delayInProgress = false;

  constructor(id, texts, animationTime = 100) {
    this.container = document.getElementById(id);
    this.texts = texts;

    setInterval(this.init.bind(this), animationTime);
  }

  init() {
    if (this.delayInProgress) {
      return;
    }

    if (this.index >= this.texts.length) {
      this.index = 0;
      return;
    }

    // Check if there are more strings to display or erase
    const currentString = this.texts[this.index];

    if (this.isTyping) {
      // Typing animation
      if (this.charIndex < currentString.length) {
        this.container.innerHTML += currentString.charAt(this.charIndex);
        this.charIndex++;

        return;
      }

      this.isTyping = false; // Switch to erasing mode

      return;
    }

    if (currentString.length === this.container.innerHTML.trim().length) {
      this.delayInProgress = true;
      setTimeout(() => {
        this.delayInProgress = false;
        this.container.innerHTML = currentString.substring(
          0,
          this.charIndex - 1
        );
        this.charIndex--;
      }, 1000);
      return;
    }

    // Erasing animation
    if (this.charIndex > 0) {
      this.container.innerHTML = currentString.substring(0, this.charIndex - 1);
      this.charIndex--;
      return;
    }

    this.isTyping = true; // Switch back to typing mode
    this.index++; // Move to the next string

    if (this.index >= this.texts.length) {
      this.index = 0; // Reset to the beginning of the array
    }

    this.charIndex = 0; // Reset character index
    this.container.innerHTML = ""; // Clear the content for the new string
  }
}
