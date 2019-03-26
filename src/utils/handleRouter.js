import Cookies from 'js-cookie';
import store from '@src/store';
export default function handleRouter (routers, isLogin) {
    return new Promise (resolve => {
        let addRoutes = [];
        routers.forEach((item,index)=>{
            let obj = {
                // img1: require('@res/img/'+item.children[0].url.split('/')[1]+'.png'),
                img1: item.img,
                img: item.img,
                imgHover: item.imgHover,
                name: item.label,
                status: false,
                id: item.id,
                list: []
            }
            item.children.forEach((listInfo,index)=>{
                let childrenList = {
                   hash:listInfo.url,
                   nameTwo: listInfo.label,
                   id: listInfo.id
                }
                obj.list.push(childrenList);
            })
            addRoutes.push(obj);
        })
        store.dispatch('ADDROUTER', { addRouter: addRoutes });
        resolve();
    });
};
export function leftRouter() {
    let listInfo = store.getters.addRouter;
    return listInfo;
}