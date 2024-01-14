const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Store event in the deferredPrompt variable for later use.

// checks if app is installed in local storage
// changes butInstall to display none if app is present in local storage

// if (localStorage.getItem('appInstalled')) {
//   butInstall.style.display = 'none';
//   console.log('if')
// }

// Logic for installing PWA
window.addEventListener('beforeinstallprompt', (event) => {  
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
    // console.log('beforeinstallprompt')
    // localStorage.removeItem('appInstalled')
});

// Click install button, call prompt() on the deferredPrompt to display install prompt. 
butInstall.addEventListener('click', async () => {  
    if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    // userChoice determines whether User accepted or dismissed install prompt. 
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // localStorage.setItem('appInstalled', 'true');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    butInstall.style.display = 'none';}
    console.log('click')
});

window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully'); 
    // localStorage.setItem('appInstalled', 'true');
});

if(window.matchMedia('(display-mode: standalone').matches) {
  butInstall.style.display = 'none';
  console.log('matchMedia')
};

