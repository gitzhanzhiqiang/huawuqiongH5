/* eslint-disable no-invalid-this */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';
import Deferred from './deferred';
import loginout from '@src/utils/loginout';
const ajax = axios.create({
  timeout: 5000,
});

// ajax.defaults.withCredentials = true;

export class Descriptor {
  constructor(desc) {
    this._url = _.isFunction(desc.url) ? desc.url : function () { return desc.url; };
    this._paramsValidator = _.chain(desc.params)
      .omit(v => !_.isFunction(v.validate))
      .mapObject(v => v.validate)
      .value();
    this._defaultParams = _.mapObject(desc.params, v => v.defaultValue);
    this._headers = desc.headers || {};
    this._optionParams = desc.optionParams;
    this._responseType = desc.responseType || 'json';
    this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
    // console.log("this._contentType 2222");
    // console.log(this._contentType);
    // console.log("this.responseType");
    // console.log(this._responseType);
    // console.log("this._optionParams");
    // console.log(this._optionParams);
  }

  makeParams(paramsFns) {
    return _.chain(paramsFns)
      .reduce((acc, v) => {
        const p = _.isFunction(v) ? v.call(acc) : v;
        return _.extend({}, acc, _.omit(p, value => _.isUndefined(value)));
      }, this._defaultParams)
      .mapObject((v, k, a) => _.isFunction(v) ? v.call(a) : v, this)
      .value();
  }

  makeRequest(method, params) {
    var newParams = JSON.parse(JSON.stringify(params));
    if(params.optionParams&&params.optionParams.pageIndex&&params.optionParams.pageSize){ //添加是否有参数pageIndex  pageSize
      newParams.optionParams.pageIndex = (newParams.optionParams.pageIndex-1)*newParams.optionParams.pageSize;
    }
    // window.alert(JSON.stringify(params))
    const data = _.omit.apply(_, [newParams].concat(this._optionParams))
      , headers = _.extend({
        'Content-Type': params.ContentType || this._contentType,
        //'source':'PC',//P2P项目专用
        'token':localStorage.getItem("token"),//P2P项目专用
        //'User-Agent':navigator.userAgent.toLowerCase(),
      }, this._headers);
      // console.log("this._contentType 3333");
      // console.log(this._contentType);
    return {
      data: data.optionParams,
      method,
      headers,
      cancelToken: null,
      url: this._url(params),
      responseType: this._responseType,
    };
  }
}

export default (descriptor) => {
  const desc = new Descriptor(descriptor);

  return function () {
    const paramsFns = [].slice.call(arguments, 0)
      , exec = function (method, preFilter) {
        const params = desc.makeParams(paramsFns);
        let ajaxOption = desc.makeRequest(method, params);

        if (this._token) {
          this._token.cancel('Cancel ajax request.');
          this._token = null;
        }
        this._token = axios.CancelToken.source();

        if (preFilter) {
          ajaxOption = preFilter(ajaxOption);
        }
        ajaxOption.cancelToken = this._token.token;

        const deferred = Deferred();
        ajax(ajaxOption)
          .then(v => {
            this._token = null;
            if (v.data.code === 200) {
            } else if (v.data.code === 102) {
                // loginout登录会话超时
                // loginout();
            } else {
            }
            
            deferred.resolve(v.data, params);
          })
          .then(null, err => {
            console.log(err);
            if (!axios.isCancel(err)) {
              this._token = null;
              
              deferred.reject(err, params);
            }
          });

        return deferred.promise;
      };

    return {
      fetch(preFilter) {
        return exec.call(this, 'GET', preFilter);
      },
      post(preFilter) {
        return exec.call(this, 'POST', preFilter);
      },
      put(preFilter) {
        return exec.call(this, 'PUT', preFilter);
      },
      del(preFilter) {
        return exec.call(this, 'DELETE', preFilter);
      },
    };
  };
};
