import React, {Component} from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import "./styles/_home.scss";
import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import {withRouter} from "react-router-dom";
import {Alert, AlertTitle} from '@material-ui/lab';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';

class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            username: "",
            password: "",
            isShow: false,
            // user:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClose = (e) => {
        this.setState({isShow : false})
    }

    handleSubmit(){
        console.log("1234567", this.state.password);
        let bodyFormData = new FormData();
        bodyFormData.set('username',this.state.username);
        bodyFormData.set('password', this.state.password);

        axios({
                method: "post",
                url: "http://localhost:8080/login",
                // url:"https://coachingmate-backend2020.herokuapp.com/login",
                headers: {
                

                    // "User-Agent": "PostmanRuntime/7.26.10",
"Accept": "*/*",
// "Postman-Token": "c95f7279-5166-4982-82c4-22b6cd9fafc7",
// "Host": "localhost:8080",
// "Accept-Encoding": "gzip, deflate, br",
// "Connection":"keep-alive"
                     
                },
                params:{username:this.state.username, password:this.state.password},
                data: bodyFormData,
                // mode: "no-cors",
            }
        )
        .then((res)=>{
            console.log("response",res)
            // this.setState({user: res.data})
            // console.log('user is ',this.state.user)
            // redirect to home page
            this.props.history.push({
                pathname:'/Home',
                state: {user: res.data,
                        username: res.data.username}
            })

        })
        .catch((error)=> {
            this.setState({isShow : true})
            console.log("error", error)
            
        })

    }


    render(){
        return(
            <div>
                <img className="rounded-lg background-pic" src="/1.jpg" alt="bgPic"/>
                    <div
                        className="p-md-4 rounded-lg login-wrapper"
                        style={{
                            backgroundColor: "#C7EDCC",
                        }}
                    >
                    <div className="m-4">
                        <h2> Welcome to CM Dashboard  <EcoRoundedIcon fontSize="large" /></h2>
                        <div className="pt-md-3">
                            <h4 className="d-inline"> <FaceRoundedIcon /> Username:</h4>{' '}
                        <input
                            className="d-inline"
                            name="username"
                            type="username"
                            onChange={this.handleChange}
                            // placeholder="please input your username"
                            value={this.state.username}
                            required
                        />
                        </div>
                        <div className="py-md-3">
                        <h4 className="d-inline"> <HttpsRoundedIcon /> Password:</h4>{' '}
                        <input
                            className="d-inline"
                            name="password"
                            type="password"
                            // placeholder="please input your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        </div>
                        <Button 
                        type="submit"
                        variant="success"
                        className="button-home"
                        onClick={this.handleSubmit}
                        > 
                            Log in 
                        </Button>
                    </div>

                    {this.state.isShow? <Alert severity="warning">
                        Oops! Invalid username or password! Please try again:) </Alert> : null}
                </div>
            </div>
        
        )
    }

}

export default withRouter(Login);