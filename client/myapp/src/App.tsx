import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage.tsx';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" >
            <Route index element={<Home />} />
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