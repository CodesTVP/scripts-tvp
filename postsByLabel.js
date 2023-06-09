const labels = [
    'Enquete',
    'Política',
    'Curiosidades',
    'Saúde',
    'Tecnologia',
    'Polêmica',
];
const config = {
    imgHeight: 200,
    imgWidth: 350,
    numPosts: 20,
};
const results = [];
let index = 0;
const posts = document.querySelectorAll('.post-outer-container');
const selectedPosts = [];
for (let i = 0; i < posts.length; i++) {
    if ((i + 2) % 3 === 0) selectedPosts.push(posts[i]);
}

function displayGalleries(data) {
    data.forEach((obj, index) => {
        const posts = obj.feed.entry;
        const glrLabel = decodeURIComponent(
            obj.feed.link[2].href.match(/[^\/]+$/)[0]
        );
        const postsInHtmlString = posts.map((post) => {
            const postTitle = post.title.$t;
            const postMedia = post.media$thumbnail.url;
            const improvedPostMedia = replaceWithBetter(postMedia);
            const postLink = post.link[4].href;
            const imgHtmlString = `<div class="glr-post-img" style="background-image: url('${improvedPostMedia}')"></div>`;
            const titleHtmlString = `<div class="glr-post-title"><div><span>${postTitle}</span></div></div>`;
            const itemInHtmlString = `<a href="${postLink}">${imgHtmlString + titleHtmlString
                }</a>`;
            return `<div class="gallery-post-item">${itemInHtmlString}</div>`;
        });
        const galleryTitle = `<div class="gallery-title"><div class="filter-label"><a href="https://www.tvpovao.com.br/search/label/${glrLabel}"><div class="little-ball"></div><span>${glrLabel}</span></a></div></div>`;
        const galleryContent = `<div class="gallery-content scrollable">${postsInHtmlString.join(
            ''
        )}</div>`;
        const gallery = `<div class="posts-label-gallery">${galleryTitle + galleryContent
            }<div class="prev-post">&lt;</div><div class="next-post">&gt;</div></div>`;
        selectedPosts[index]?.insertAdjacentHTML('afterend', gallery);
    });
    scrollDiv();
}

function scrollDiv() {
    const galleriesContent = document.querySelectorAll('.gallery-content');

    galleriesContent.forEach((glr) => {
        const parent = glr.parentNode;
        const btnPrev = parent.querySelector('div.prev-post');
        const btnNext = parent.querySelector('div.next-post');

        btnPrev.onclick = () => (glr.scrollLeft = glr.scrollLeft - 260);
        btnNext.onclick = () => (glr.scrollLeft = glr.scrollLeft + 260);

        const checkScroll = (e) => {
            const scrollWidth = e.scrollWidth - e.clientWidth;

            if (e.scrollLeft === 0) {
                btnPrev.style.opacity = 0;
            } else {
                btnPrev.style.opacity = 1;
            }

            if (e.scrollLeft === scrollWidth) {
                btnNext.style.opacity = 0;
            } else {
                btnNext.style.opacity = 1;
            }
        };

        checkScroll(glr);
        glr.onscroll = (e) => {
            checkScroll(e.target);
        };
    });
}

const pushData = (data) => {
    data.labelIndex = index;
    results.push(data);
    if (results.length === labels.length) displayGalleries(results);
    index++;
};

const replaceWithBetter = (string) => {
    let newString = string.toString().split('/');
    if (newString[7]) newString[7] = 'w1200-h630-p-k-no-nu';
    return newString.join('/');
};

function getData() {
    labels.forEach((label) => {
        includeJS(
            'https://www.tvpovao.com.br/feeds/posts/default/-/' +
            label +
            '?start-index=1&max-results=' +
            config.numPosts +
            '&orderby=published&alt=json-in-script&callback=pushData'
        );
    });
}

function includeJS(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
}

getData();