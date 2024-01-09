const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Store the event in the deferredPrompt variable for later use.

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {  
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';});


// When the install button is clicked, the prompt() method is called on the deferredPrompt to show the install prompt. 
butInstall.addEventListener('click', async () => {  
    if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    // userChoice determines whether User accepted or dismissed the install prompt. 
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    butInstall.style.display = 'none';}
});


window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully'); // 'appinstalled' event logs a message when the app is installed.
});

