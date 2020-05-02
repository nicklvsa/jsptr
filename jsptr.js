const ptr$ = (from, to) => {
    return {
        get v() {
            return from();
        },
        set v(i) {
            return to(i);
        }
    };
};

const refName = "ptr$(";
const indName = "$";
document.body.querySelectorAll('script').forEach((tag) => {
    tag.getAttributeNames().forEach((name) => {
        if (name == 'use_refs') {
            const script = tag.textContent;
            if (script.includes(refName)) {
                for (let line of script.split('\n')) {
                    if (line.includes(refName) && !line.startsWith('//') && !line.startsWith('/*')) {
                        const change = tag.textContent.substring(tag.textContent.indexOf(line), tag.textContent.indexOf(line) + line.length).trim();
                        const toChangeName = change.split('=')[1].substring(change.split('=')[1].indexOf(refName) + refName.length, change.split('=')[1].indexOf(refName).length).replace(')', '').replace(';', '').trim();
                        const varName = change.split('=')[0];
                        tag.textContent = tag.textContent.replace(change, varName + `=${refName}()=>${toChangeName},(v)=>${toChangeName}=v)`);
                    }
                    /*if (line.includes(indName) && !line.includes(refName)) {
                        const change = line.split('$')[0].trim();
                        tag.textContent = tag.textContent.replace(change+'$', change + `.v`);
                    }*/
                } 
                // console.log(tag.textContent);
                eval(tag.textContent);    
            }
        }
    });
});

