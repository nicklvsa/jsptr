const _ptr = (from, to) => {
    return {
        get v() {
            return from();
        },
        set v(i) {
            return to(i);
        }
    };
};

const refName = "_ptr(";
document.body.querySelectorAll('script').forEach((tag) => {
    tag.getAttributeNames().forEach((name) => {
        if (name == 'use_refs') {
            const script = tag.textContent;
            if (script.includes(refName)) {
                for (let line of script.split("\n")) {
                    if (line.includes(refName)) {
                        const change = tag.textContent.substring(tag.textContent.indexOf(line), tag.textContent.indexOf(line) + line.length).trim();
                        const toChangeName = change.split('=')[1].substring(change.split('=')[1].indexOf(refName) + refName.length, change.split('=')[1].indexOf(refName).length).replace(')', '').replace(';', '').trim();
                        const varName = change.split('=')[0];
                        tag.textContent = tag.textContent.replace(change, varName + `=_ptr(()=>${toChangeName},(v)=>${toChangeName}=v)`);
                    }
                } 
                // console.log(tag.textContent);
                eval(tag.textContent);    
            }
        }
    });
});

