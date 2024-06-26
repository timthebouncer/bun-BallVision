import {useEffect} from "react";
import * as React from "react";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { fetchTweet, Tweet } from 'react-tweet'
import './base.css'

const SingleArticle=()=>{

    useEffect(()=>{

    },[])



        return <div>
            <div className='test'>
                <Tweet id="1805687110566826297" />
            </div>
            <div className='test'>
                <Tweet id="1805798876139634709" />
            </div>
    </div>
}


export {SingleArticle}