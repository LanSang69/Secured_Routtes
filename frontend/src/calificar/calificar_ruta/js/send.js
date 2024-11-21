function success(event) {
    event.preventDefault();
    const success_content = document.getElementById("success-content");
    const main = document.getElementById("main");
    success_content.classList.remove("none");
    main.classList.add("oscuridad");
}
function hide(event) {
    event.preventDefault();
    const success_content = document.getElementById("success-content");
    const main = document.getElementById("main");
    main.classList.remove("oscuridad");
    success_content.classList.add("none");
}

document.getElementById("submit").addEventListener("click", success);