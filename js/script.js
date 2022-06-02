var formlist = document.querySelectorAll('form');
for(var form of formlist) {
    form.onsubmit = (e) => {
        e.preventDefault();
    }
}