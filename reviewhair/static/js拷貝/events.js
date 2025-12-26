function repeatable(f, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
        f();
        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}

if (storageName !== localStorage.getItem('session')) {
    localStorage.clear();
    localStorage.setItem('session', storageName)
}

var event3counter = null;
if (localStorage.getItem('3') == null) {
    event3counter = 1;
    localStorage.setItem('3', 1);
} else {
    event3counter = localStorage.getItem('3');
}

repeatable(function () {
    event3counter = parseInt(event3counter) + 1;
    if (event3counter >= 81) {
        return;
    }
    request(3,event3counter, storageName)
}, 15000, 80);

let scroll = 0;
window.onscroll = () => {
    if (scroll !== 1) {
        scroll = 1;
        request(8, 1, storageName);
    }
}

/**
 * BEGIN Event 4 -> FREE EVENT
 */

/**
 * BEGIN Event 6 -> Scroll depth
 */
let percentagesArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 97], percent = 0;

window.addEventListener("scroll", function () {
    let url = window.location.search, // : array
        depth = url.search('&depth'); // : bool

    var h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight';

    percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    percentagesArr.forEach((item, elem) => {
        if (parseInt(percent) >= item) {
            if (depth == "-1") {
                if (undefined !== percentagesArr[elem]) {
                    var d = percentagesArr[elem];
                    percentagesArr.shift();
                    request(6, d, storageName);
                }
            }
        }
    })
});

/**
 * END OF Event 6
 */

/**
 * BEGIN Event 10 -> WEBRTC SUPPORTED BY BROWSER
 * FREE EVENT
 */


function localStorageJob(eventNumber, eventValue, session) {
    console.log(localStorage.getItem(eventNumber) < eventValue)
    if (localStorage.getItem(eventNumber) < eventValue) {
        localStorage.setItem(eventNumber, eventValue);
        return "https://"+domain +"/click.php?event" + eventNumber + "=" + eventValue;
    }
    return false;
}

function request(eventNumber, eventValue, session, contentType = "text/plain") {
    url = localStorageJob(eventNumber, eventValue, session);
    if (false === url) {
        return;
    }
    sendRequest(url+ "&upd_clickid=" + session, contentType);
}

// GET Request function
function sendRequest(url, contentType = "text/plain") {
    var req = new XMLHttpRequest();
    try {
        req.withCredentials = true;
        req.open('GET', url, true);
        req.setRequestHeader('Content-Type', contentType);
        req.responseType = 'text';
        req.send();
    } catch (e) {
        console.log(e)
    }
}

document.querySelectorAll("a[href*='lp=1'], .main-link").forEach((link, index, links) => {
    link.addEventListener("click", function () {
        let elem_index = (Array.from(links).indexOf(this)) + 1;
        console.log("Click index (GLOBAL):" + elem_index);
        request(10, elem_index, storageName);
    });
});