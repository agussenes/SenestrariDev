document.querySelectorAll('.contImgVision').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.querySelector('.info-hover').style.opacity = '1';
    });

    item.addEventListener('mouseout', () => {
        item.querySelector('.info-hover').style.opacity = '0';
    });
});