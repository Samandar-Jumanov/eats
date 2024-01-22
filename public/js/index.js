const button = document.getElementById('start-chat');

button.addEventListener('click', () => {
     fetch('/video-chat').then(res => {
         res = res.text();
     }) .then(html => {
        document.documentElement.innerHTML = html;
    });
});