const mutations = {
    SET_USER: (state, user)=>{
        state.user = user;
    },
    // SET_TOKEN: (state, token)=>{
    //     state.token = token;
    // },
    // ADD_ROUTER: (state, addRouter) =>{
    //     state.addRouter = addRouter;
    // },
    SET_COLLAPSE: (state, isCollapse) =>{
        state.isCollapse = !isCollapse;
    },

    SET_PHONE: (state, phone) =>{
        state.phone = !phone;
    },
    SET_USERID: (state, userid) =>{
        state.userid = !userid;
    },
    SET_WYJRPWDTYPE: (state, wyjrpwdtype) =>{
        state.isCollapse = !wyjrpwdtype;
    },
    SET_ACCOUNTTYPE: (state, accountype) =>{
        state.isCollapse = !accountype;
    },
    SET_ACCOUNTCOUNT: (state, accouncount) =>{
        state.accouncount = !accouncount;
    },

}
export default mutations;

