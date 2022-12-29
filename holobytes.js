const blogURL = "https://blog.holopin.io";
const holoBytesPath = "/holobyte/collect";
const ul = document.getElementById("holobytes");
const list = document.createDocumentFragment();
const holoBytesLinks = {};

function getHoloBytesLinks(doc = document, path = holoBytesPath) {
  const hbLinks = new Object();
  let holobytesLinks = doc.getElementsByTagName("a");
  for (var counter = 0; counter < holobytesLinks.length; counter++) {
    const _url = new URL(holobytesLinks[counter].href);
    if (holobytesLinks[counter].href.includes(path)) {
      hbLinks[_url.pathname] = holobytesLinks[counter];
      hbLinks[_url.pathname].style.background = "red";
    }
  }
  return hbLinks;
}

async function getDocumentObject(url) {
  return await fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      let parser = new DOMParser();
      return parser.parseFromString(html, "text/html");
    })
    .catch(function (err) {
      console.log("Failed to fetch document: ", err);
    });
}

const main = async (_) => {
  let doc = await getDocumentObject(blogURL);

  let home = getHoloBytesLinks(doc);

  for (const [key, value] of Object.entries(home)) {
    holoBytesLinks[key] = value;
  }

  const posts = getHoloBytesLinks(doc, "/posts/");

  for (const postURL of Object.keys(posts)) {
    let doc = await getDocumentObject(`${blogURL}${postURL}`);
    let postLinks = getHoloBytesLinks(doc);
    for (const [_url, element] of Object.entries(postLinks)) {
      holoBytesLinks[_url] = element;
    }
  }

  console.log("HoloBytes hunted: " + Object.keys(holoBytesLinks).length);
  for (const [_url, element] of Object.entries(holoBytesLinks)) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let _uri = `${blogURL}${_url}`;
    a.href = _uri;
    a.innerText = element.innerText;
    li.appendChild(a);
    list.appendChild(li);
    console.log(_uri);
  }

  ul.appendChild(list);
};

main();
