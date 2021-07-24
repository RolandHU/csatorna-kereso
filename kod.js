var tarolo = document.getElementById("tarolo");
var cs = document.getElementById("cs");
var mezo = document.getElementById("mezo");
var img = document.getElementById("img");
var f = document.getElementById("f");
var m = document.getElementById("m");
var v = document.getElementById("v");

var hiba = document.getElementById("hiba");
var hibau = document.getElementById("hibauzenet");
var szam = 3;
var setTime;

window.addEventListener("load", function(){
    document.body.classList.remove("preload");
})


var api_kulcs = "AIzaSyBHH7-CuYeyJ-dAyIiuW-U5PodACHb7dt0";
//YouTube: UCBR8-60-B28hp2BmDPdntcQ
var csatorna_id = "UCBR8-60-B28hp2BmDPdntcQ";

window.addEventListener("load", talalat(csatorna_id));

function szamlalo() {
    szam--;
    console.log(szam);
    if (szam == 0) {
        hibauzenet();
    } else {
        setTime = setTimeout(szamlalo, 1000);
    }
}

function hibauzenet(uzenet) {
    if (uzenet != undefined) {
        if (szam == 3) {
            szamlalo();
            hibau.innerHTML = uzenet;
        }
    }

    hiba.style.display = "flex";
    if (szam == 0) {
        hiba.style.display = "none";
        szam = 3;
    }
}

function talalat(csatorna_id, nev) {
    if (nev) {
        fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics,brandingSettings,snippet&forUsername=" + csatorna_id + "&key=" + api_kulcs)
        .then (response => {
            return response.json();
        })
        .then (adat => {
            if (adat.pageInfo.totalResults == 0) {
                hibauzenet("Nincs találat.");
            } else {
                tarolo.style.backgroundImage = "linear-gradient(to top, rgb(43, 95, 240) 66%, transparent 100%), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + adat.items[0].brandingSettings.image.bannerExternalUrl + "=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)";
                cs.innerHTML = adat.items[0].snippet.localized.title;
                img.src = adat.items[0].snippet.thumbnails.high.url;
                f.innerHTML = Number(adat.items[0].statistics.subscriberCount).toLocaleString();
                v.innerHTML = Number(adat.items[0].statistics.videoCount).toLocaleString();
                m.innerHTML = Number(adat.items[0].statistics.viewCount).toLocaleString();
            }
        })
    } else {
        fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics,brandingSettings,snippet&id=" + csatorna_id + "&key=" + api_kulcs)
        .then (response => {
            return response.json();
        })
        .then (adat => {
            if (adat.pageInfo.totalResults == 0) {
                hibauzenet("Nincs találat.");
            } else {
                tarolo.style.backgroundImage = "linear-gradient(to top, rgb(43, 95, 240) 66%, transparent 100%), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + adat.items[0].brandingSettings.image.bannerExternalUrl + "=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)";
                cs.innerHTML = adat.items[0].snippet.localized.title;
                img.src = adat.items[0].snippet.thumbnails.high.url;
                f.innerHTML = Number(adat.items[0].statistics.subscriberCount).toLocaleString();
                v.innerHTML = Number(adat.items[0].statistics.videoCount).toLocaleString();
                m.innerHTML = Number(adat.items[0].statistics.viewCount).toLocaleString();
            }
        })
    }
}


function kereses() {
    if (mezo.value.includes("/c/") > 0 || mezo.value.includes("/user/") > 0) {
        if (mezo.value.length == 0) {
            hibauzenet("Érvénytelen link.");
        } else {
            if (mezo.value.includes(" ") > 0) {
                hibauzenet("Ne használj szóközt!");
            } else {
                if (mezo.value.includes("/c/") > 0) {
                    talalat(mezo.value.slice(mezo.value.indexOf("/c/") + 3, mezo.value.length), true);    
                } else {
                    talalat(mezo.value.slice(mezo.value.indexOf("/user/") + 6, mezo.value.length), true);
                }
            }
        }
    } else {
        if (mezo.value.length >= 25) {
            if (mezo.value.includes(" ") > 0) {
                hibauzenet("Ne használj szóközt!");
            } else {
                talalat(mezo.value.slice(mezo.value.length - 24, mezo.value.length), false);
            }
        } else if (mezo.value.length == 25) {
            if (mezo.value.includes(" ") > 0) {
                hibauzenet("Ne használj szóközt!");
            } else {
                talalat(mezo.value, false);
            } 
        } else if (mezo.value == "" || mezo.value.includes(" ") > 0) {
            hibauzenet("Érvénytelen link.");
        } else {
            talalat(mezo.value);
        }
    }
}