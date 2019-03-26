const getters = {
    user: state => state.user,
    // token: state => state.token,
    // router: state => state.addRouter,
    isCollapse: state => state.isCollapse,

    phone: state => state.phone,
    userid: state => state.userid,
    wyjrpwdtype: state => state.wyjrpwdtype,//是否设置交易密码
    accountype: state => state.accountype,//开户状态 0未开户 1已开户 2禁止开户
    accouncount: state => state.accouncount,//开户次数
}
export default getters;
