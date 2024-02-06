const tvpcv = {
    apiKey: "AIzaSyA2UrVcfcR3_co-0SRvggAfritNB832t-4",
    authDomain: "send-mail-news.firebaseapp.com",
    projectId: "send-mail-news",
    storageBucket: "send-mail-news.appspot.com",
    messagingSenderId: "735458348101",
    appId: "1:735458348101:web:9448e2b6fd09b61efee72c"
}

firebase.initializeApp(tvpcv);

const db = firebase.firestore();

function isPostPage() {
    const bodyClass = document.body.classList;
    return bodyClass.contains('item-view');
}

function getAds() {
    return new Promise((resolve, reject) => {
        db.collection('anunciantes').get()
            .then((snapshot) => snapshot.docs.map(doc => doc.data()))
            .then((array) => resolve(array))
            .catch((err) => reject(err));
    });
}

function filterAds(object) {
    const postPage = isPostPage()
    const ads = {
        adsAnchor: [],
        adsHeader: [],
        adsMain: [],
        adsSideBar: [],
        adsSquares: [],
        adsFooter: [],
        adsFloating: [],
    };
    object.forEach((ad) => {
        const ifPostPage = postPage && ad.pages.includes('post')
        const ifHomePage = !postPage && ad.pages.includes('home')
        if (ifPostPage || ifHomePage) {
            if (ad.local.includes('anchor') &&
                new Date() <= new Date(ad.validity))
                ads.adsAnchor.push(ad);
            if (ad.local.includes('header') &&
                new Date() <= new Date(ad.validity))
                ads.adsHeader.push(ad);
            if (ad.local.includes('main') &&
                new Date() <= new Date(ad.validity))
                ads.adsMain.push(ad);
            if (ad.local.includes('sidebar') &&
                new Date() <= new Date(ad.validity))
                ads.adsSideBar.push(ad);
            if (ad.local.includes('squares') &&
                new Date() <= new Date(ad.validity))
                ads.adsSquares.push(ad);
            if (ad.local.includes('footer') &&
                new Date() <= new Date(ad.validity))
                ads.adsFooter.push(ad);
            if (ad.local.includes('floating') &&
                new Date() <= new Date(ad.validity))
                ads.adsFloating.push(ad);
        }
    });
    return ads;
}

function displayAds(obj) {
    const adsAnchorDiv = document.querySelector('.anchor-ads');
    const adsHeaderDiv = document.querySelector('.header-ads');
    const adsMainDiv = document.querySelectorAll('.main-ads');
    const adsSidebarDiv = document.querySelector('.sidebar-ads');
    const adsSquareDiv = document.querySelector('.square-ads');
    const adsFooterDiv = document.querySelector('.footer-ads');
    const adsFloatingDiv = document.querySelector('.floating-ads');
    adsOneAtATime(adsAnchorDiv, obj.adsAnchor);
    adsOneAtATime(adsHeaderDiv, obj.adsHeader);
    adsMultipleAtATime(adsSidebarDiv, obj.adsSideBar, 5);
    adsMainDiv.forEach((div) => adsOneAtATime(div, obj.adsMain));
    adsMultipleAtATime(adsSquareDiv, obj.adsSquares, 6);
    adsOneAtATime(adsFooterDiv, obj.adsFooter);
    adsOneAtATime(adsFloatingDiv, obj.adsFloating);
}

function adsOneAtATime(elem, arr) {
    if (arr.length === 1) {
        const divAd = document.createElement('div');
        divAd.classList.add('ad');
        divAd.id = arr[0].id;

        const linkAd = document.createElement('a');
        linkAd.href = arr[0].link;
        linkAd.target = '_blank';

        const imgAd = document.createElement('img');
        imgAd.src = arr[0].photoURL;
        imgAd.alt = `Banner do anúncio ${arr[0].name}`;

        linkAd.appendChild(imgAd);
        divAd.appendChild(linkAd);
        elem.appendChild(divAd);
    } else if (arr.length > 1) {
        let index = Math.floor(Math.random() * (arr.length - 0) + 0);
        function changeAd() {
            elem.querySelectorAll('.ad').forEach((ad) => ad.remove());
            const divAd = document.createElement('div');
            divAd.classList.add('ad');
            divAd.id = arr[index].id;

            const linkAd = document.createElement('a');
            linkAd.href = arr[index].link;
            linkAd.target = '_blank';

            const imgAd = document.createElement('img');
            imgAd.src = arr[index].photoURL;
            imgAd.alt = `Banner do anúncio ${arr[index].name}`;

            linkAd.appendChild(imgAd);
            divAd.appendChild(linkAd);
            elem.appendChild(divAd);
            index = Math.floor(Math.random() * (arr.length - 0) + 0);
        }
        changeAd();
        setInterval(() => {
            changeAd();
        }, 5000);
    }
}

function adsMultipleAtATime(elem, arr, max) {
    if (arr.length >= 1 && arr.length <= max) {
        arr.forEach((ad) => {
            const divAd = document.createElement('div');
            divAd.classList.add('ad');
            divAd.id = ad.id;

            const linkAd = document.createElement('a');
            linkAd.href = ad.link;
            linkAd.target = '_blank';

            const imgAd = document.createElement('img');
            imgAd.src = ad.photoURL;
            imgAd.alt = `Banner do anúncio ${ad.name}`;

            linkAd.appendChild(imgAd);
            divAd.appendChild(linkAd);
            elem.appendChild(divAd);
        });
    } else if ((arr.length > 1) & (arr.length > max)) {
        refreshAdsMultiple(elem, arr, max);
        setInterval(() => refreshAdsMultiple(elem, arr, max), 5000);
    }
}

function refreshAdsMultiple(elem, arr, max) {
    const random = generateRandomArray(0, arr.length - 1, max);
    elem.querySelectorAll('.ad').forEach((ad) => ad.remove());
    random.forEach((num) => {
        const ad = arr[num];
        const divAd = document.createElement('div');
        divAd.classList.add('ad');
        divAd.id = ad.id;

        const linkAd = document.createElement('a');
        linkAd.href = ad.link;
        linkAd.target = '_blank';

        const imgAd = document.createElement('img');
        imgAd.src = ad.photoURL;
        imgAd.alt = `Banner do anúncio ${ad.name}`;

        linkAd.appendChild(imgAd);
        divAd.appendChild(linkAd);
        elem.appendChild(divAd);
    });
}

function generateRandomArray(min, max, size, jump = 1) {
    const result = new Set();
    while (result.size < size) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        let isValid = true;
        for (const existingNum of result)
            if (Math.abs(num - existingNum) < jump) {
                isValid = false;
                break;
            }
        if (isValid) result.add(num);
    }
    return Array.from(result);
}

function initRenderAds() {
    const divMainAds = '<div class="main-ads ads-region"></div>';
    if (!isPostPage()) {
        const posts = document.querySelectorAll('.post-outer-container');
        for (let i = 0; i < posts.length; i++)
            if ((i + 2) % 3 === 0)
                posts[i].insertAdjacentHTML('afterend', divMainAds);
    } else {
        const lineBreaks = document.querySelectorAll('.post-body br');
        let numAds = null;

        if (lineBreaks.length <= 4) numAds = 1;
        else if (lineBreaks.length > 4 && lineBreaks.length <= 8) numAds = 2;
        else if (lineBreaks.length > 8 && lineBreaks.length <= 12) numAds = 3;
        else if (lineBreaks.length > 12) numAds = 4;

        const random = generateRandomArray(0, (lineBreaks.length - 3), numAds, 3);
        for (let i = 0; i < random.length; i++)
            lineBreaks[random[i]].insertAdjacentHTML('afterend', divMainAds);
    }
    getAds()
        .then((resp) => filterAds(resp))
        .then((ads) => displayAds(ads))
        .then(() => initStatistics())
}

function initStatistics() {
    const ads = document.querySelectorAll('.ad')
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id
            if (entry.isIntersecting)
                setTimeout(() => {
                    if (entry.isIntersecting)
                        updateStatistics(id, 'views')
                }, 2000)
            else clearTimeout()
        })
    })

    ads.forEach(ad => {
        const id = ad.id
        observer.observe(ad);
        updateStatistics(id, 'prints')
        ad.onclick = e => updateStatistics(id, 'clicks')
    })

    function updateStatistics(id, type) {
        db.collection('statistics').doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    const docData = doc.data()
                    docData[type] += 1
                    db.collection('statistics').doc(id)
                        .update(docData)
                        .then(() => updateDayData(id, type))
                } else {
                    const docData = { clicks: 0, views: 0, prints: 0 }
                    docData[type] += 1
                    db.collection('statistics').doc(id)
                        .set(docData)
                        .then(() => updateDayData(id, type))
                }
                function updateDayData(id, type) {
                    const day = formatDateString(new Date().toLocaleDateString())
                    db.collection(`statistics/${id}/byDay`).doc(day)
                        .get().then(doc => {
                            if (doc.exists) {
                                const dataDay = doc.data()
                                dataDay[type] += 1
                                db.collection(`statistics/${id}/byDay`).doc(day)
                                    .update(dataDay)
                                    .catch(e => console.error(e))
                            } else {
                                const dataDay = { clicks: 0, views: 0, prints: 0 }
                                dataDay[type] += 1
                                db.collection(`statistics/${id}/byDay`).doc(day)
                                    .set(dataDay)
                                    .catch(e => console.error(e))
                            }
                        })
                }
            })
    }
}

function formatDateString(date) {
    var day = parseInt(date.split("/")[0]);
    var month = parseInt(date.split("/")[1]);
    var year = parseInt(date.split("/")[2]);
    return `${month}-${day}-${year}`
}

initRenderAds();

document.querySelector('.floating-ads .close').onclick = () => {
    const div = document.querySelector('.floating-ads');
    div.style.transform = 'scale(0)';
    setTimeout(() => (div.style.transform = 'scale(1)'), 15000);
};

document.querySelector('.anchor-ads .show-hide').onclick = () => {
    const div = document.querySelector('.anchor-ads');
    div.classList.toggle('active');
    setTimeout(() => div.classList.add('active'), 15000);
};