const scrollableDivs = document.querySelectorAll('.scrollable');
scrollableDivs.forEach(div => {
    let isDragging = false;
    let startX, scrollLeft;

    div.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.pageX - div.offsetLeft;
        scrollLeft = div.scrollLeft;
    });

    div.addEventListener('mouseleave', function () {
        isDragging = false;
    });

    div.addEventListener('mouseup', function () {
        isDragging = false;
    });

    div.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - div.offsetLeft;
        const walk = x - startX;
        div.scrollLeft = scrollLeft - walk;
    });
})
