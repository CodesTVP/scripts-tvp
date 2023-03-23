const divLogoFooter = document.getElementById('Image2')
divLogoFooter.classList.value = 'logo'
divLogoFooter.removeAttribute('data-version')
divLogoFooter.removeAttribute('id')

const divLabelsFooter = document.getElementById('Label1')
const LabelUlLis = document.querySelectorAll('#Label1 li')
const finalLabelUl1 = document.createElement('ul')
const finalLabelUl2 = document.createElement('ul')
const finalLabelUl3 = document.createElement('ul')
LabelUlLis.forEach((li, i) => {
    if (i < 8) {
        finalLabelUl1.appendChild(li)
    } else if (i >= 8 && i < 16) {
        finalLabelUl2.appendChild(li)
    } else if (i >= 16) {
        finalLabelUl3.appendChild(li)
    }
})
divLabelsFooter.innerHTML = ''
divLabelsFooter.classList.value = 'tags'
divLabelsFooter.removeAttribute('data-version')
divLabelsFooter.removeAttribute('id')
divLabelsFooter.appendChild(finalLabelUl1)
divLabelsFooter.appendChild(finalLabelUl2)
divLabelsFooter.appendChild(finalLabelUl3)

const lisSocialMedia = document.querySelectorAll('.social-media li')

lisSocialMedia.forEach(li => {
    const arrayData = li.textContent.split('/')
    li.style.setProperty('--color', arrayData[2])
    li.querySelector('a').style.setProperty('--color', arrayData[2])
    li.querySelector('a').innerHTML = `<i class="${arrayData[1]}"></i><span>${arrayData[0]}</span>`
})

const divSocialFooterHTML = document.getElementById('LinkList2').innerHTML
document.getElementById('LinkList2').remove()
document.querySelector('.body-footer .utilits-elements').innerHTML += divSocialFooterHTML