document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.start_popup')?.addEventListener('click',()=>{
        chrome.tabs.query({active: true, currentWindow: true},tabs=>{
            const tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId,{action:"StartProccess"});
        });
    });
});

