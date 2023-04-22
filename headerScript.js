let openedNow = false

function openMenu(bool) {
    if (bool === true) {
        openedNow = true
        document.querySelector('.body-menu')
        .classList.add('active')
        addParam('#menu')
        openedNow = false
    } else if (bool === false) {
        document.querySelector('.body-menu')
        .classList.remove('active')
    }
}

function openSearch(bool) {
    if (bool === true) {
        openedNow = true
        document.querySelector('.body-search')
        .classList.add('active')
        addParam('#search')
        openedNow = false
    } else if (bool === false) {
        document.querySelector('.body-search')
            .classList.remove('active')
    }
}

function closeMenuAndSearch() {
    openMenu(false)
    openSearch(false)
    goToInHistory(-1)
}

function keyPressedOnInput(event) {
    const value = event.target.value
    const element = event.target
    const ulElement = document.querySelector('.search-suggestions')
    ulElement.innerHTML = ''
    searchPosts(value)
        .then(results => results.map(post => {
            console.log(post)
            return `<li class="suggestion"><a href="${post.url}"><span>${post.title}</span></a></li>`
        }))
        .then(titles => titles.forEach(title => {
            ulElement.innerHTML += title
        }))
}

function searchPosts(value) {
    return new Promise((resolve, reject) => {
        ajax(`https://www.googleapis.com/blogger/v3/blogs/7227783462440633533/posts/search?q=${encodeURI(value)}&key=AIzaSyCpzlcWPumI3Xc_emuT_aTtuizap0UfB7E`)
            .then(data => resolve(data.items))
    })
}

function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    })
}

const goToInHistory = num => history.go(num)

function addParam(param) {
    let url = window.location.href
    let lastChar = url.charAt(url.length - 1)
    if (lastChar === '/') url.slice(0, -1)
    window.history.pushState(param.replace('#', ''), param, url + param)
}

window.addEventListener('popstate', event => {
    if (!openedNow) {
        openMenu(false)
        openSearch(false)
    }
})

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        if (!document.querySelector('header.body-header').classList.contains('compressed'))
            document.querySelector('header.body-header').classList.add('compressed')
    } else {
        document.querySelector('header.body-header').classList.remove('compressed')
    }
})

function typeBackwards(text, id) {
    let reversedText = text.split('').reverse().join('')
    let element = document.getElementById(id)
    let typedText = ''
    for (let i = reversedText.length - 1; i >= 0; i--) {
        setTimeout(() => {
            typedText = reversedText[i] + typedText
            element.innerHTML = typedText
            if (i === (reversedText.length - 1)) {
                setTimeout(() => {
                    for (let i = 0; i < reversedText.length; i++) {
                        text = text
                        setTimeout(() => {
                            typedText = text.slice(1)
                            text = typedText
                            element.innerHTML = typedText
                        }, i * 20)
                    }
                }, 1500)
            }
        }, i * 20)
    }
}

setTimeout(() => {
    typeBackwards('TV Povão, a tv web na sua mão!', 'animation-text')
}, 2000)