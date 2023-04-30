const ads = document.querySelectorAll('.ad')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const id = entry.target.id
        if (entry.isIntersecting)
            setTimeout(() => {
                if (entry.isIntersecting)
                    fetch(`https://serve-ads.onrender.com/post?type=views&id=${id}`, { method: 'POST' })
            }, 2000)
        else clearTimeout()
    })
})

ads.forEach(ad => {
    observer.observe(ad);
    fetch(`https://serve-ads.onrender.com/post?type=prints&id=${id}`, { method: 'POST' })
    ad.onclick = e => {
        const id = ad.id
        console.log(e)
        fetch(`https://serve-ads.onrender.com/post?type=clicks&id=${id}`, { method: 'POST' })
    }
})