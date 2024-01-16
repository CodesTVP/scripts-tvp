async function generateHTML() {
    const response = await getData()
    document.querySelector('.loading-posts').style.display = 'none'
    const elem = document.querySelector('#insta-posts .content')
    response.data.forEach((post) => {
        if (
            post.media_type === 'IMAGE' ||
            post.media_type === 'CAROUSEL_ALBUM'
        ) {
            const postDiv = document.createElement('div')
            postDiv.classList.add('post')

            const viewOnInsta = document.createElement('a')
            viewOnInsta.href = post.permalink
            viewOnInsta.target = '_blank'
            viewOnInsta.classList.add('media')

            const mediaElement = document.createElement('div')
            mediaElement.style.backgroundImage = `url('${post.media_url}')`

            viewOnInsta.appendChild(mediaElement)
            postDiv.appendChild(viewOnInsta)
            elem.appendChild(postDiv)
        }
    })
}

function getData() {
    function encrypt(text, displacement) {
        return text.replace(/[a-z]/gi, (letter) => {
            const code = letter.charCodeAt(0)
            const limit = letter.toUpperCase() === letter ? 65 : 97
            return String.fromCharCode(
                ((code - limit + displacement) % 26) + limit
            )
        })
    }

    return new Promise((resolve, reject) => {
        const token =
            'LJTZUReoEKVmBwg3CDLP2knPcImeGP3B1gzRJkddIQyVZQaVAkuemIVZAUKWHwJYp9JCD1IrXqMvCD2kvOYoOQXMnZn9SZXktPqD4fYQpT19qCDAg5YHYMTYEFeHwxP3gqQnCDVCDqQVhmkceX9HCDzCGCG'
        fetch(
            'https://graph.instagram.com/me/media?fields=media_type,media_url,permalink&limit=15&access_token=' +
                encrypt(token, (26 - 3) % 26)
        )
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    })
}

generateHTML()
