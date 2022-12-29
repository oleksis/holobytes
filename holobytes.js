var blogURL = "https://blog.holopin.io"
var holoBytesPath = "/holobyte/collect"

function getHoloBytesLinks(holoBytesPath = "/holobyte/collect"){
    const hbLinks = new Object()
    var holobytesLinks = document.getElementsByTagName("a");
    for(var counter = 0; counter < holobytesLinks.length; counter++){
        const _url = new URL(holobytesLinks[counter].href)
        if (holobytesLinks[counter].href.includes(holoBytesPath)){
            hbLinks[_url.href] = holobytesLinks[counter];
            hbLinks[_url.href].style.background = "red";
        }
    }
    return hbLinks;
}

// For each Post
const posts = getHoloBytesLinks("/posts/")

console.log( "HoloBytes hunted: " + Object.keys(getHoloBytesLinks()).length);

function huntHoloBytesByClass() {
    var holobytes = document.getElementsByClassName("hover:no-underline hover:text-neutral-700 text-sm font-base");
    for(var counter = 0; counter < holobytes.length; counter++){
        holobytes[counter].style.background = "red";
    }
    return holobytes;
}
