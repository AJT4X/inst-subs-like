document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.start_popup')?.addEventListener('click',()=>{
        chrome.tabs.query({active: true, currentWindow: true},tabs=>{
            const tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId,{action:"StartProccess"});
        });
    });
    const input_likes = document.createElement('input');
    const max_count = document.createElement('div');
    const text = document.createElement('span');
    text.innerText = 'MaxLikes: ';
    max_count.append(text,input_likes);
    max_count.style.display = 'flex';
    document.body.append(max_count);
    input_likes.classList.add('input_likes');
    chrome.storage.sync.get(["likes"],(data)=>{
        input_likes.placeholder = data.likes;
    });
    input_likes.addEventListener('input',()=>{
        chrome.storage.sync.set({likes:input_likes.value});
    });
});

