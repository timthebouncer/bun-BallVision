import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import UploadVideo from './pages/UploadVideo.tsx';
import ServiceTerms from './pages/ServiceTerms.tsx';


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

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;