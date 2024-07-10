import {Button, Input} from "antd";
import {useState} from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate  } from "react-router-dom";

const Login=()=>{

    let navigate = useNavigate();
    const [password, setPassword] = useState('')

    const submit= async ()=>{

        const {data, status} = await axiosInstance.get('/userCheck', {params: {password}})
        if(data && status){
            localStorage.setItem('password', password)
            return navigate("/generateContent");
        } else {
            return navigate('/')
        }
    }

    return (
        <div>
            <Input
                placeholder="請輸入信箱或電話"
                style={{ height: 50 }}
                className="bg-white"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                onClick={submit}
            >
                送出
            </Button>
        </div>
    )

}

export {Login}