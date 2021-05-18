export function arrayBufferToBase64(buffer) {
    if (!buffer){
        return;
    }
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    const base64Flag = 'data:image/png;base64,';
    const imageStr = window.btoa(binary);
    return base64Flag + imageStr;
};

export function saveUser(user){
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeUser(key='user'){
    localStorage.removeItem(key);
}


