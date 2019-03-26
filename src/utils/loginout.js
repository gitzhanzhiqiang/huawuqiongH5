import Cookies from 'js-cookie';
import store from '@src/store';

export default loginout => {
    // token
    store.dispatch('SETUSER',{user: ''});
    store.dispatch('SETTOKEN',{token: ''});
    Cookies.remove('user');
    //Cookies.remove('token');
    window.location.reload();
}