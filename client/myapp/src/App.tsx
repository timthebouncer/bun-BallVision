import { BrowserRouter } from 'react-router-dom';
import {ArrowUpOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {Routes} from "./Routes.tsx";


function App() {

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
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </>
    );
}

export default App;