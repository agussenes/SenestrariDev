document.addEventListener('DOMContentLoaded', () => {
    const menuCheckbox = document.getElementById('menu_hamburguesa');
    const menuLinks = document.querySelectorAll('.ul_links a');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox.checked) {
                menuCheckbox.checked = false;
            }
        });
    });
});