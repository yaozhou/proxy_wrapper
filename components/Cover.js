import React, { Component } from 'react' ;
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'

function query(url, param) {
    var option = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        method : 'POST',
        credentials : 'include',
        body : JSON.stringify(param),
    } ;
    return fetch(url, option).then((res) => res.json()) ;
}

export default class extends Component {
    constructor(props) {
        super(props) ;
        this.state = {
        }
    }

    to_google() {

        var proxy_form = document.createElement('form') ;
        proxy_form.id = 'proxy_form' ;
        proxy_form.name = 'proxy_form' ;

        document.body.appendChild(proxy_form) ;

        var input1 = document.createElement('input1') ;
        input1.type = 'text' ;
        input1.name = 'u' ;
        input1.value = 'https://www.google.com.hk' ;

        var input2 = document.createElement('input2') ;
        input2.type = 'text' ;
        input2.name = 'encodeURL' ;
        input2.value = 'on' ;

        var input3 = document.createElement('input3') ;
        input3.type = 'text' ;
        input3.name = 'allowCookies' ;
        input3.value = 'on' ;

        proxy_form.appendChild(input1) ;
        proxy_form.appendChild(input2) ;
        proxy_form.appendChild(input3) ;
        proxy_form.method = "POST" ;
        proxy_form.action = "http://www.zhangpeng.us/include/process.php?action=update"
        proxy_form.submit() ;

        document.body.removeChild(proxy_form) ;
    }

    componentDidMount() {
      
    }

    verify(str) {
        console.log('verify =' + str) ;
        query('/api/verify', {verify_str: str}).then(function(ret) {
            console.log(ret) ;
        })
    }

    render() {
        return (
            <div>
            <div>test</div>
            <img src='verify_img' /> 
            <FormControl inputRef={ref => this.verify_input = ref} type ="text" />
            <Button onClick={() => this.verify(this.verify_input.value.trim())}>提交</Button>
            </div>
            )
    }
}