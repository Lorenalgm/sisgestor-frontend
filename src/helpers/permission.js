import Cookies from 'js-cookie';
import decode from 'jwt-decode';

export const isAuthorized = () =>  {
    const token = Cookies.get('token');
    
    if(!token){
        return false;
    }

    return true;
}