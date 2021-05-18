import { makeStyles } from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";


export function arrayBufferToBase64(buffer) {
    if (!buffer){
        return;
    }
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    const base64Flag = 'data:image/png;base64,';
    const imageStr = window.btoa(binary);
    const image = base64Flag + imageStr;
    return image;
};

export function saveUser(user){
    localStorage.setItem('user', JSON.stringify(user))
}


