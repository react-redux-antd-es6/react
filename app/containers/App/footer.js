import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'

export default class Footer extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
    }
  }
	                                                                                                                                                                                                                                                                    componentDidMount() {
		                                                                                                                                                                                                                                                                    console.log(111)
  fetchJsonp('http://cache.video.iqiyi.com/jp/avlist/202861101/1/?callback=jsonp', {
    jsonpCallback: 'jsonp',
  }).then(function (response) {
    console.log(response)
    return response.json();
  }).then(function (data) {
    console.log(data);
  }).catch(function (e) {
    console.log('Oops, error');
  });

    // var result = fetchJsonp('http://cache.video.iqiyi.com/jp/avlist/202861101/1/?callback=jsonp9', {
    //   // jsonpCallback: 'jsoncallback',
    //   timeout: 3000
    // })
    // result.then(function(response) {
    //   return response.json()
    // }).then(function(json) {
    //   document.body.innerHTML = JSON.stringify(json);
    // })['catch'](function(ex) {
    //   document.body.innerHTML = 'failed:' + ex;
    // })
}
  render() {
    return (
      <div id="footer" />
    )
  }
}
