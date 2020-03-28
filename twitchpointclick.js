const body = document.querySelector('body');
const config = { attributes: true, childList: true, subtree: true };

if (body){
    console.log('TwitchCoinClick : body detected');
    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const targetNode = document.querySelector('.chat-input__buttons-container');
                if (targetNode){
                    console.log('TwitchCoinClick : chat detected')
                    clicker(targetNode);
                    observer.disconnect();
                }else{
                    console.error('TwitchCoinClick : No chat in this Twitch page');
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(body, config);
} else {
    console.error('TwitchCoinClick : no body');
}

function clicker(targetNode){
    let evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    
    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let el = document.querySelector(".tw-button--success");
                if (el){
                    el.dispatchEvent(evt);
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}