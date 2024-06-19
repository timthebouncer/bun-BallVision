import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import UploadVideo from './pages/UploadVideo.tsx';
import ServiceTerms from './pages/ServiceTerms.tsx';
import {ArrowUpOutlined} from "@ant-design/icons";
import * as React from "react";
import {useEffect, useState} from "react";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" >
            <Route index element={<Home />} />
            <Route path="/upload" index element={<UploadVideo />} />
            <Route path="/serviceTerms" index element={<ServiceTerms />} />
        </Route>
        
         
    )
)

function App({routes}) {

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop=()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        // Show button when page is scrolled down
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {
                isVisible && <ArrowUpOutlined onClick={scrollToTop} style={{
                        position: 'fixed',
                        bottom: '50px',
                        right: '20px',
                        width: '46px',
                        height: '46px',
                        fontSize: '20px',
                        backgroundColor: '#1e0835',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} />
            }
            <RouterProvider router={router}/>
        </>
    );
}

export default App;