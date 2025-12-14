let main_tab_id = null;


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
    chrome.runtime.sendMessage({action: "back",text: "subs-load"});
    let elements_for_subs = [];
    const all_btns = document.getElementsByTagName('div');
    console.log(all_btns);
    for(const check_subs of all_btns){
        if(check_subs.textContent.trim()=='Подписаться'){
            elements_for_subs.push(check_subs);
            const randomMs = Math.floor(Math.random() * 1000);
            console.log(randomMs);
            check_subs.click();
            console.log(check_subs,'click');
            await sleep(randomMs);
        }
    };
    
    console.log(elements_for_subs);

    function sleep(ms){
        return new Promise(resolve=> setTimeout(resolve,ms));
    }
};

chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
   if(message.text == 'subs'){
    main_tab_id = sender.tab.id;
    subs(sender.tab.id);
   }
   if (message.text === 'subs-load'){
    chrome.tabs.sendMessage(main_tab_id,{
        text: "subs-load"
    });
   }
});


