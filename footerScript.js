const LabelUlLis = document.querySelectorAll('#Label1 .list-label-widget-content ul li')
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
document.getElementById('Label1').innerHTML = ''
document.getElementById('Label1').appendChild(finalLabelUl1)
document.getElementById('Label1').appendChild(finalLabelUl2)
document.getElementById('Label1').appendChild(finalLabelUl3)

lisSocialMedia.forEach(li => {
    const arrayData = li.textContent.split('/')
    li.style.setProperty('--color', arrayData[2])
    li.querySelector('a').style.setProperty('--color', arrayData[2])
    li.innerHTML = `<i class="${arrayData[1]}"></i><span>${arrayData[0]}</span>`
})