const body = document.querySelector("body");
const config = { attributes: true, childList: true, subtree: true };
const modulename = 'TwitchPointClick';

if (body){
    console.log(`${modulename} : Body detected`);
    createObserver(body, onBodyMutation);
} else {
    console.error(`${modulename} : No Body`);
}

function createObserver(target, onMutationBehaviour){
    const callback = (mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === "childList") {
                onMutationBehaviour(observer);
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(target, config);
}

function onBodyMutation(observer){
    const targetNode = document.querySelector(".chat-input__buttons-container");
    if (targetNode){
        console.log(`${modulename} : Chat detected`);
        createObserver(targetNode, onButtonsContainerMutation);
        observer.disconnect();
    }else{
        console.error(`${modulename} : No chat in this Twitch page`);
    }
}

function onButtonsContainerMutation(observer){
    let evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    let el = document.querySelector(".tw-button--success");
    if (el){
        el.dispatchEvent(evt);
        console.log(`${modulename} : Points reward collected`);
    }
}