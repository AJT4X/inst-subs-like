let max_likes = 80;
chrome.storage.get(['likes'],(data)=>{
    max_likes = data.likes;
});
async function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve,ms));
}
function start(){
    console.log('start');
    chrome.runtime.sendMessage({action: "main",text:"subs"});
};

async function subs(){
    try{

        const wait_storys = await waitElemnt({element: '.x1n2onr6'});
        console.log(wait_storys);
        if(wait_storys){
            const profileImg = document.querySelector('img[alt^="Фото профиля"]');
            profileImg.click();
            let index = 0;
            for(let i=0; i < max_likes; i++){
                console.log(i);
                const like = await waitElemnt({element: 'svg[aria-label^="Нравится"]'})
                if (like){
                    const likeBtn = like.closest('div[role="button"]');
                    likeBtn.click();
                };
                await sleep(300);
                const next = await waitElemnt({element: 'svg[aria-label^="Далее"]'});
                
                if(next){
                    const nextBtn = next.closest('div[role="button"]');
                    nextBtn.click();
                };
            }
               
            

        }
    }catch(err){
        console.log(err);
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
















