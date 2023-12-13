document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
    document.querySelector(".job-offers").style.visibility = "hidden";
    document.getElementById("loading_indicator").style.visibility = "visible";
    }
    else {
    setTimeout(() => {
       document.getElementById("loading_indicator").style.display ="none";
       document.querySelector(".job-offers").style.visibility = "visible";
    }, 10)
    }
};
