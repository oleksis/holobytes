var blogURL = "https://blog.holopin.io";
var holoBytesPath = "/holobyte/collect";

function getHoloBytesLinks(
  doc = document,
  holoBytesPath = "/holobyte/collect"
) {
  const hbLinks = new Object();
  var holobytesLinks = doc.getElementsByTagName("a");
  for (var counter = 0; counter < holobytesLinks.length; counter++) {
    const _url = new URL(holobytesLinks[counter].href);
    if (holobytesLinks[counter].href.includes(holoBytesPath)) {
      hbLinks[_url.href] = holobytesLinks[counter];
      hbLinks[_url.href].style.background = "red";
    }
  }
  return hbLinks;
}

result = await fetch(blogURL)
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    const hbLinks = {};
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let links = getHoloBytesLinks(doc);

    for (const [key, value] of Object.entries(links)) {
      hbLinks[key] = value;
    }

    var posts = getHoloBytesLinks(doc, "/posts/");

    Object.keys(posts).map((url) => {
      fetch(url)
        .then(function (response) {
          return response.text();
        })
        .then(function (html) {
          let parser = new DOMParser();
          let doc = parser.parseFromString(html, "text/html");
          let links = getHoloBytesLinks(doc);

          for (const [_url, element] of Object.entries(links)) {
            hbLinks[_url] = element;
          }
        })
        .catch(function (err) {
          console.log("Failed to fetch post page: ", err);
        });
    });

    return hbLinks;
  })
  .catch(function (err) {
    console.log("Failed to fetch page: ", err);
  });

setTimeout(() => {
  console.log("HoloBytes hunted: " + Object.keys(result).length);
  Object.keys(result).map((url) => {
    console.log(url);
  });
}, 5000);

function huntHoloBytesByClass() {
  var holobytes = document.getElementsByClassName(
    "hover:no-underline hover:text-neutral-700 text-sm font-base"
  );
  for (var counter = 0; counter < holobytes.length; counter++) {
    holobytes[counter].style.background = "red";
  }
  return holobytes;
}
