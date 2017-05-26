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

    jump(url, server) {

        var form = document.createElement('form') ;
        form.id = 'proxy_form' ;
        form.name = 'proxy_form' ;

        document.body.appendChild(form) ;

        var input1 = document.createElement('input') ;
        input1.type = 'text' ;
        input1.name = 'u' ;
        input1.value = url ;

        var input2 = document.createElement('input') ;
        input2.type = 'text' ;
        input2.name = 'encodeURL' ;
        input2.value = 'on' ;

        var input3 = document.createElement('input') ;
        input3.type = 'text' ;
        input3.name = 'allowCookies' ;
        input3.value = 'on' ;

        form.appendChild(input1) ;
        form.appendChild(input2) ;
        form.appendChild(input3) ;
        form.method = "POST" ;
        form.action = server ;
        form.submit() ;

        document.body.removeChild(form) ;
    }

    componentDidMount() {
      
    }

    verify(str) {

        console.log('verify =' + str) ;
        query('/api/verify', {verify_str: str}).then(function(ret) {
            if (ret.code == 0) {
                this.jump(ret.url, ret.server) ;
            }else {
                location.reload() ;
            }

            console.log(ret) ;
        }.bind(this))
    }

    render() {
        return (
            <div>
            <img src='verify_img' /> 
            <FormControl inputRef={ref => this.verify_input = ref} type ="text" />
            <Button onClick={() => this.verify(this.verify_input.value.trim())}>提交</Button>
            </div>
            )
    }
}