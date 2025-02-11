document.getElementById('join-user').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'chatbox.html';
    } else {
        alert('Please enter a valid username');
    }
});//store local 