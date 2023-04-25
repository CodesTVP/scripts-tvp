async function generateHTML() {
    const response = await getData()
    document.querySelector('.loading-posts').style.display = 'none'
    const elem = document.querySelector('#insta-posts .content')
    response.data.forEach(post => {
        const postDiv = document.createElement('div')
        postDiv.classList.add('post')

        const mediaDiv = document.createElement('div')
        mediaDiv.classList.add('media')

        const mediaTypeTag = post.media_type === 'IMAGE' ||
            post.media_type === 'CAROUSEL_ALBUM' ? 'div' : 'video'

        const mediaElement = document.createElement(mediaTypeTag)
        if (mediaTypeTag === 'video') {
            mediaElement.src = post.media_url
            mediaElement.alt = 'Mídia da postagem'
            mediaElement.onclick = e => {
                if (e.target.paused) {
                    e.target.play()
                    mediaDiv.style.setProperty('--display', 'none')
                } else {
                    e.target.pause()
                    mediaDiv.style.setProperty('--display', 'block')
                }
            }
        } else {
            mediaElement.style.backgroundImage = `url('${post.media_url}')`
        }

        const captionDiv = document.createElement('div')
        captionDiv.classList.add('caption')

        const captionText = document.createElement('pre')
        captionText.innerHTML = post.caption

        const viewOnInsta = document.createElement('a')
        viewOnInsta.href = post.permalink
        viewOnInsta.target = '_blank'
        viewOnInsta.classList.add('view-on-insta')
        viewOnInsta.innerText = 'Ver no Instagram'

        mediaDiv.appendChild(mediaElement)
        captionDiv.appendChild(captionText)
        postDiv.appendChild(mediaDiv)
        postDiv.appendChild(captionDiv)
        postDiv.appendChild(viewOnInsta)
        elem.appendChild(postDiv)
    })
}


function getData() {
    function encrypt(text, displacement) {
        return text.replace(/[a-z]/gi, letter => {
            const code = letter.charCodeAt(0)
            const limit = letter.toUpperCase() === letter ? 65 : 97
            return String.fromCharCode(((code - limit + displacement) % 26) + limit)
        })
    }

    return new Promise((resolve, reject) => {
        const token = 'LJTYMATAUoCDJauWl1dUHU0YKDagnCDrRWCDWdIo2gIsafX94Pp5qBoYKeWIzgAP2X0CDJP0L0A1kJhmYogqkGCDmocYZQcgKE6emY4TXasQqj0eHsCDYcYnY1MyhJIGU1Q3U0aQU2otYoM0dmCDMBZB5VoUQVTCGCG'
        fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&limit=10&access_token=' + encrypt(token, (26 - 3) % 26))
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

generateHTML()