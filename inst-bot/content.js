



function start(){
    console.log('start');
    chrome.runtime.sendMessage({action: "main",text:"subs"});
};

function subs(){
    const wait_storys = waitElemnt('.x1n2onr6');
    console.log(wait_storys);
    if(wait_storys){
        wait_storys.click();
    };
}
function waitElemnt({
    element,
    timeout = 3000,
    root = document
}){
    try{ 
        const check = () => {
            const el = document.querySelector(element);
            if(!el) return false;
            return el;
        };
        return new Promise(resolve=>{
            if(check()){
                resolve(check());
                return
            }

            const observer = new MutationObserver(()=>{
                const result = check();
                if(result){
                    observer.disconnect();
                    clearTimeout(timer);
                    resolve(result);
                }
            });
            observer.observe(root,{
                childList: true,
                subtree: true,
                attributes: true
            });


            const timer = setTimeout(()=>{
                observer.disconnect();
                resolve(false);

            },timeout);

        });
    }catch(err){
        console.log(err);
    }
};




chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if(message.action == 'StartProccess'){
        start();
    }
    else if(message.text == 'subs-load'){
        console.log('subs');
        subs();
    };
});
















