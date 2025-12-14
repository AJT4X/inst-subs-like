


function subs(sender){
        chrome.tabs.create({ url: "https://www.instagram.com/explore/people/", active: true }, (tab) => {
      
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if(tabId === tab.id && info.status === "complete") {
                chrome.tabs.onUpdated.removeListener(listener);

                chrome.tabs.get(tab.id, (tabInfo) => {
                    if(tabInfo.url.includes("explore/people")) {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: workOnExplore
                        });
                    }
                });
            }
        });
        
    });

};


async function workOnExplore(){
    await sleep(3000);
    elements_for_subs = [];
    const all_btns = document.getElementsByTagName('div');
    for(const check_subs of all_btns){
        if(check_subs.textContent.includes('Подписаться')){
            elements_for_subs.push(check_subs);
            const randomMs = Math.floor(Math.random() * 2000) + 1000;
            await sleep(randomMs);
            check_subs.dispatchEvent(
                new MouseEvent("click",{
                    bubbles: true,
                    cancelable: true,
                    view: window
                })
            )
        }
    };
    console.log(elements_for_subs);

    function sleep(ms){
        return new Promise(resolve=> setTimeout(resolve,ms));
    }
};

chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
   if(message.text == 'subs'){
    subs(sender.tab.id);
   };
});


