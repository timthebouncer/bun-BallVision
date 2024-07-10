import {Route, Routes as ReactRoutes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Articles from "./pages/articleList/Articles.js";
import UploadVideo from "./pages/UploadVideo.tsx";
import ServiceTerms from "./pages/ServiceTerms.tsx";
import {SingleArticle} from "./components/articleDetail";
import {VideoPage} from "./pages/video/VideoPage.tsx";
import {GenerateArticles} from "./pages/generateContent/generateArticles/GenerateArticles";
import {Login} from "./pages/login/loginPage";
import {GenerateContents} from "./pages/generateContent/generateContens";

const Routes=()=>{

    return (
        <ReactRoutes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path={"/video"}
                element={<VideoPage />}

            />
            <Route
                path={"/articleDetail"}
                element={<Articles articleList={[]} />}

            />
            <Route path="/articles/:articleId"
                   element={<SingleArticle />}
            />

            <Route
                path={"/serviceTerms"}
                element={<ServiceTerms />}
            />
            <Route path="/generateContent" element={<GenerateContents />}
            />
            <Route path="/generateArticles" element={<GenerateArticles />}
            />
            <Route
                path={"/upload"}
                element={<UploadVideo />}
            />
        </ReactRoutes>


    )

}

export {Routes}