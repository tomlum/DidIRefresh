window.addEventListener("load", initialize);

let firstTransition = true;
function handleToggle() {
  if (firstTransition) {
    firstTransition = false;
    document
      .getElementById("slider-button")
      .classList.add("slider-button-transition");
  }

  chrome.storage.sync.get("RefreshCheckOn", ({ RefreshCheckOn }) => {
    const on = !RefreshCheckOn;
    // Toggle saved setting
    chrome.storage.sync.set({ RefreshCheckOn: on });

    // send message
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, on);
    });

    // Change icon/popover
    if (on) {
      chrome.browserAction.setIcon({ path: "../../icons/icon128on.png" });
      document
        .getElementById("slider-button")
        .classList.add("slider-button-off");
    } else {
      chrome.browserAction.setIcon({ path: "../../icons/icon128off.png" });
      document
        .getElementById("slider-button")
        .classList.remove("slider-button-off");
    }
  });
}

function handleClick1() {
  // Toggle saved setting
  chrome.storage.sync.set({ RefreshCheckCount: 1 });
}
function handleClick2() {
  // Toggle saved setting
  chrome.storage.sync.set({ RefreshCheckCount: 2 });
}
function handleClick3() {
  // Toggle saved setting
  console.log("3");
  chrome.storage.sync.set({ RefreshCheckCount: 3 });
}

function initialize() {
  const link1 = document.getElementsByTagName("a")[0];
  link1.onclick = function () {
    chrome.tabs.create({ active: true, url: "https://www.TomLum.com" });
  };
  chrome.storage.sync.get(null, ({ RefreshCheckOn, RefreshCheckCount }) => {
    let on = true;
    let count = 1;

    console.log(RefreshCheckOn, RefreshCheckCount);

    // Init if undefined
    if (RefreshCheckOn === undefined || RefreshCheckCount === undefined) {
      chrome.storage.sync.set({ RefreshCheckOn: true, RefreshCheckCount: 1 });
    } else {
      on = RefreshCheckOn;
      count = RefreshCheckCount;
    }

    // Init icon
    if (on) {
      chrome.browserAction.setIcon({ path: "../../icons/icon128on.png" });
      document
        .getElementById("slider-button")
        .classList.add("slider-button-off");
    } else {
      chrome.browserAction.setIcon({ path: "../../icons/icon128off.png" });
      document
        .getElementById("slider-button")
        .classList.remove("slider-button-off");
    }

    if (RefreshCheckCount === 1) {
      document.getElementById("radio1").checked = true;
    }
    if (RefreshCheckCount === 2) {
      document.getElementById("radio2").checked = true;
    }
    if (RefreshCheckCount === 3) {
      document.getElementById("radio3").checked = true;
    }
  });

  // Set listener
  document.getElementById("toggle").addEventListener("click", handleToggle);
  document.getElementById("radio1").addEventListener("click", handleClick1);
  document.getElementById("radio2").addEventListener("click", handleClick2);
  document.getElementById("radio3").addEventListener("click", handleClick3);
}
