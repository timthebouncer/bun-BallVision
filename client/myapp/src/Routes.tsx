import {Route, Routes as ReactRoutes} from "react-router-dom";
import {lazy, Suspense} from 'react';
import {Layout} from "./layout/layout.tsx";
import EditArticles from "./pages/generateContent/editArticles/EditArticles.tsx";

const Loading=()=>{
        return <div>Loading...</div>
}

const HomePage = lazy(()=> import('./pages/HomePage'))
const Login = lazy(()=> import('./pages/login/LoginPage'))
const VideoPage = lazy(()=> import('./pages/video/VideoPage'))
const Articles = lazy(()=> import('./pages/articleList/Articles'))
const SingleArticle = lazy(()=> import('./components/articleDetail/index'))
const ServiceTerms = lazy(()=> import('./pages/ServiceTerms'))
const GenerateContents = lazy(()=> import('./pages/generateContent/generateContents'))
const GenerateArticles = lazy(()=> import('./pages/generateContent/generateArticles/GenerateArticles'))
const UploadVideo = lazy(()=> import('./pages/generateContent/UploadVideo'))

const Routes=()=>{


    return (
        <ReactRoutes>
            <Route
                path="/"
                element={
                <Suspense fallback={<Loading />}>
                        <HomePage />
                </Suspense>
            }
            />
            <Route
                path="/login"
                element={
                <Suspense fallback={<Loading />}>
                    <Layout>
                        <Login />
                    </Layout>
                </Suspense>
            }
            />
            <Route
                path={"/video"}
                element={
                <Suspense fallback={<Loading />}>
                    <Layout>
                        <VideoPage />
                    </Layout>
                </Suspense>
            }
            />
            <Route
                path={"/articleDetail"}
                element={
                        <Suspense fallback={<Loading />}>
                                <Articles articleList={[]} />
                        </Suspense>}

            />
            <Route path="/articles/:articleId"
                   element={
                           <Suspense fallback={<Loading />}>
                                <SingleArticle />
                           </Suspense>
                   }
            />
            <Route
                path={"/serviceTerms"}
                element={
                        <Suspense fallback={<Loading />}>
                            <Layout>
                                <ServiceTerms />
                            </Layout>
                        </Suspense>
                }
            />
            <Route path="/generateContent"
                   element={
                    <Suspense fallback={<Loading />}>
                        <Layout>
                            <GenerateContents />
                        </Layout>
                    </Suspense>
                    }
            />
            <Route path="/generateArticles"
                   element={
                    <Suspense fallback={<Loading />}>
                        <Layout>
                            <GenerateArticles />
                        </Layout>
                    </Suspense>
                    }
            />
            <Route path="/editArticles"
                   element={
                    <Suspense fallback={<Loading />}>
                        <Layout>
                            <EditArticles />
                        </Layout>
                    </Suspense>
                    }
            />
            <Route
                path={"/upload"}
                element={
                        <Suspense fallback={<Loading />}>
                                <UploadVideo />
                        </Suspense>
                }
            />
        </ReactRoutes>


    )

}

export {Routes}