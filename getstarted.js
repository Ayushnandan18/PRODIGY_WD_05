document.getElementById("getStarted").addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = "New.html";
    }, 800);
  });