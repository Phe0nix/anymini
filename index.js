// AnyMini script start form here

var notMini = document.querySelector(".notMini"),
    mini = document.querySelector(".mini"),
    result = '';

var minify = function() {
    if (notMini.value) {
        var singleMultiCmnt = /(\/\/.{0,})|(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)/g;
        var singleCmntRmv = notMini.value.replace(singleMultiCmnt, "");
        var whiteSpace = singleCmntRmv.replace(/\n/g, "");
        var extraSpace = whiteSpace.replace(/\s{2,3}/g, "");
        result = extraSpace.replace(/\s{0,}=\s{0,}/g, "=");
        mini.value = result;
    } else {
        alert("No Input Detected. Write Something!!");
        notMini.focus();
    }
};

notMini.addEventListener("keydown", function(e) {
    mini.value = "typing...";
});

notMini.addEventListener("keyup", function(e) {
    mini.value = "";
});

mini.onclick = function() {
    this.setSelectionRange(0, this.value.length);
};

// AnyMini script ends here
