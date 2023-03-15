window.addEventListener('DOMContentLoaded', () => {
    const allPosts = document.querySelectorAll('article.post-outer-container')
    const featuredPosts = Array.from(allPosts).slice(0, 2)
    const cloneFeaturedPosts = []

    featuredPosts.forEach(post => cloneFeaturedPosts.push(post.cloneNode(true)))

    const divFeaturedPosts = document.createElement('div')
    divFeaturedPosts.classList.add('featured-posts')

    cloneFeaturedPosts.forEach(post => divFeaturedPosts.appendChild(post))

    featuredPosts.forEach(post => cloneFeaturedPosts.push(post.cloneNode(true)))
    featuredPosts.forEach(post => post.parentNode.removeChild(post))

    const globArticles = document.querySelector('.blog-posts.hfeed.container')
    globArticles.insertAdjacentElement('beforebegin', divFeaturedPosts)
})