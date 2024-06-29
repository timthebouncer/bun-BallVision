import {Route, Routes as ReactRoutes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Articles from "./pages/articleList/Articles.js";
import UploadVideo from "./pages/UploadVideo.tsx";
import ServiceTerms from "./pages/ServiceTerms.tsx";
import {SingleArticle} from "./components/articles";
import {VideoPage} from "./pages/video/VideoPage.tsx";
import {GenerateArticles} from "./pages/generateArticles/GenerateArticles";

const Routes=()=>{

    return (
        <ReactRoutes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path={"/video"}
                element={<VideoPage />}

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
            <Route
                path={"/generateArticles"}
                element={<GenerateArticles />}
            />
        </ReactRoutes>


    )

}

export {Routes}