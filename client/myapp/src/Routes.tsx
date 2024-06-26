import {Route, Routes as ReactRoutes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Articles from "./pages/Articles.tsx";
import UploadVideo from "./pages/UploadVideo.tsx";
import ServiceTerms from "./pages/ServiceTerms.tsx";
import {SingleArticle} from "./components/articles";

const Routes=()=>{

    return (
        <ReactRoutes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path={"/articles"}
                element={<Articles />}

            />
            <Route path="/articles/:articleId"
                   element={<SingleArticle />}
            />
            <Route
                path={"/upload"}
                element={<UploadVideo />}
            />
            <Route
                path={"/serviceTerms"}
                element={<ServiceTerms />}
            />
        </ReactRoutes>


    )

}

export {Routes}