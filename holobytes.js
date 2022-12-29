function huntHoloBytes() {
    var holobytes = document.getElementsByClassName("hover:no-underline hover:text-neutral-700 text-sm font-base");
    for(var counter = 0; counter < holobytes.length; counter++){
        holobytes[counter].style.background = "red";
    }
    return holobytes;
}

console.log( "HoloBytes hunted: " + huntHoloBytes().length);
