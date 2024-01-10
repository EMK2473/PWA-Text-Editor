const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Store event in the deferredPrompt variable for later use.

// Logic for installing PWA
window.addEventListener('beforeinstallprompt', (event) => {  
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});


// Click install button, call prompt() on the deferredPrompt to display install prompt. 
butInstall.addEventListener('click', async () => {  
    if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    // userChoice determines whether User accepted or dismissed install prompt. 
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    butInstall.style.display = 'none';}
});


window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully'); // 'appinstalled' event logs message when app is installed.
});

