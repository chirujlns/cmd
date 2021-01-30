import React from "react";
import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/_home.scss";
import { Button } from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import Qs from 'qs';
import {Alert, AlertTitle} from '@material-ui/lab';
// import SpeedIcon from '@material-ui/icons/Speed';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import FastForwardIcon from '@material-ui/icons/FastForward';
import CakeIcon from '@material-ui/icons/Cake';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import TimerIcon from '@material-ui/icons/Timer';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const Dashboard = (props)=> {

    const location = useLocation();
    let username;
    let obj;
    let elements=[];
    const[isShow, setIsShow] = useState(false);
    const[avg_speed, setAvg_speed] =useState([] as any);
    const[start_time, setStart_time] =useState([] as any);
    const[total_calories, setTotal_calories] = useState([] as any);
    const[total_distance, setTotal_distance] = useState([] as any);
    const[total_elapesd_time, setTotal_elapesd_time] = useState([] as any);
    const [activities, setActivities] = useState([] as any);


    if (location.state){
        console.log(props)
        username = location.state.username;
        console.log('user is', username);
    }

    const getActivity = () => {
        let bodyFormData = new FormData();
        bodyFormData.set('username', username);
        // axios.get("https://coachingmate-backend2020.herokuapp.com/auth/getAllByUsername?username=${username}", {
        //     headers: {
        //                 "Access-Control-Allow-Origin": "*",
        //                 "Accept": 'application/json',
        //                 "Content-Type": "application/json",
        //                 "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        //             },
        //     params: {
        //         username: Qs.stringify(username),
        //     }
        //   })
        axios({
            method: "POST",
            url: "https://coachingmate-backend2020.herokuapp.com/activity/getAllByUsername",

            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            },
            data: bodyFormData,
            // data:{
            //     username: Qs.stringify(username),
            // },
        })
        .then(function(res){
            // console.log(res.headers)
            console.log('This is ', username)
            console.log("Activities", res)
            obj = res.data;
            Object.keys(obj).map(key => {
                console.log(obj[key])
                // setActivities(activities => [...activities, obj[key]]);
                setAvg_speed(avg_speed => [...avg_speed,' { Activity '+ key, ': ', (obj[key].avg_speed)+' }']);
                setStart_time(start_time => [...start_time, ' { Activity ' + key ,': ', (obj[key].start_time)+' }']);
                setTotal_calories(total_calories => [...total_calories, ' { Activity ' + key ,': ', (obj[key].total_calories)+' }']);
                setTotal_distance(total_distance => [...total_distance, ' { Activity ' + key ,': ', (obj[key].total_distance)+' }']);
                setTotal_elapesd_time(total_elapesd_time => [...total_elapesd_time, ' { Activity ' + key ,': ', (obj[key].total_elapesd_time)+' }']);

                console.log('hello', avg_speed);
                console.log('hello', elements);
                let i = obj[key];
                Object.keys(i).map(items =>{
                    setActivities(activities => [...activities, ' { Activity '+ key, items+': '+i[items]+' }']);
                })

            });
            // the alert
            if(res.data.length == 0){setIsShow(true)}

        })
           .catch(error=>{
            console.log("error", error)});
        
    }

    const goHome = () =>{
        if (username){
            props.history.push({
                pathname:'/Home',
                state: {username: username}
            })
        }
    }


    return (
        (username==null) ? (
            <a href="/">
                <h2>Please log in first! :)</h2>
            </a>) : (
        <DrawerRouterContainer>
            <div className="dash"
            style={{ backgroundColor: "#C7EDCC"}}>
                <h2>
                    <DirectionsRunIcon fontSize="large" className="m-2"/>
                    <b>Hello {username}, you can view your activity data here!</b>
                </h2>

                <Button 
                    variant="success"
                    className="mb-3 mx-3 button-home"
                    onClick={getActivity}
                    >
                        View all activity data
                </Button>

                <Button 
                    variant="light"
                    className="mb-3 mx-3 button-home"
                    onClick={goHome}
                    >
                    Return to home page
                </Button>

                {isShow ?  (
                    <Alert severity="warning">
                            Oops! Seems you haven't uploaded any activity yet! 
                    </Alert>):
                    (<div className="mx-4 my-2">
                        <><AccessAlarmsIcon className="d-inline pb-2" fontSize="large" /><h3 className="d-inline"> Start time:</h3></>
                        <p>{start_time}</p>
                        <><FastForwardIcon className="d-inline pb-2" fontSize="large" /><h3 className="d-inline"> Average speed:</h3></>
                        <p>{avg_speed}</p>
                        <><CakeIcon className="d-inline pb-2" fontSize="large" /><h3 className="d-inline"> Total Calories:</h3></>
                        <p>{total_calories}</p>
                        <><CallSplitIcon className="d-inline pb-2" fontSize="large" /><h3 className="d-inline"> Total Distance:</h3></>
                        <p>{total_distance}</p>
                        <><TimerIcon className="d-inline pb-2" fontSize="large" /><h3 className="d-inline"> Total elapsed time:</h3></>
                        <p>{total_elapesd_time}</p>
                        <><FitnessCenterIcon className="d-inline pb-2" fontSize="large" /><h3 className="d-inline"> Your Activity Data:</h3></>
                        <p>{activities.toString()}</p>
                    </div>) 
                }
            </div>
        </DrawerRouterContainer>)
    );
}

export default withRouter(Dashboard)