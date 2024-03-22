function printLetterByLetter(elementId, text, interval) {
  let i = 0;
  let intervalId = setInterval(function () {
    document.getElementById(elementId).innerHTML += text.charAt(i);
    ++i > text.length && clearInterval(intervalId);
  }, interval);
}

window.onload = () => {
  setTimeout(function () {
    document.body.style.display = "block";
    document.getElementById("boxes").style.display = "none";
    document.getElementById("all").style.display = "block";
    document.getElementById("scroll").addEventListener("click", () => {
      scrollToElem("#contact");
    });
    printLetterByLetter(
      "lbl",
      "I code beautifully simple things, and I love what I do.",
      65
    );
  }, 300);
};

const nativeSmoothScrollTo = (element) => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.getBoundingClientRect().top + window.pageYOffset,
  });
};

const smoothScrollTo = (element, duration) => {
  const scrollElement = document.scrollingElement || document.documentElement;
  const start = scrollElement.scrollTop;
  const distance = element - start;
  const startTime = +new Date();

  const animateScroll = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    scrollElement.scrollTop = parseInt(
      elapsedTime / duration < 1
        ? ((distance / 2) * elapsedTime * elapsedTime) / duration / duration +
            start
        : (-distance / 2) *
            ((elapsedTime -= duration) * (elapsedTime - 2) - 1) +
            start
    );
    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  animateScroll(startTime);
};

const supportsNativeSmoothScroll =
  "scrollBehavior" in document.documentElement.style;

const scrollToElem = (element) => {
  if (!element) return;
  const targetElement = document.querySelector(element);
  if (targetElement) {
    if (supportsNativeSmoothScroll) {
      nativeSmoothScrollTo(targetElement);
    } else {
      smoothScrollTo(targetElement.offsetTop, 600);
    }
  }
};

document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
});
