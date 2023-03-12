function openMenu(bool) {
    if (bool) {
        document.querySelector('.body-menu')
            .classList.add('active')
    } else {
        document.querySelector('.body-menu')
            .classList.remove('active')
    }
}

function openSearch(bool) {
    if (bool) {
        document.querySelector('.body-search')
            .classList.add('active')
    } else {
        document.querySelector('.body-search')
            .classList.remove('active')
    }
}

function closeMenuAndSearch() {
    openMenu(false)
    openSearch(false)
}

function keyPressedOnInput(event) {
    const value = event.target.value
    const element = event.target
    const ulElement = document.querySelector('.search-suggestions')
    $(ulElement).empty()
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
        $.ajax({
            url: `https://www.googleapis.com/blogger/v3/blogs/7227783462440633533/posts/search?q=${encodeURI(value)}&key=AIzaSyCpzlcWPumI3Xc_emuT_aTtuizap0UfB7E`,
            method: 'get',
            success: (data) => resolve(data.items)
        })
    })
}