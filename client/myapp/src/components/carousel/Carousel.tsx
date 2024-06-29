import { Carousel } from 'react-responsive-carousel';
import './carousel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as React from "react";
import {Button} from "antd";
import {LeftCircleOutlined, LeftOutlined, RightCircleOutlined, RightOutlined} from "@ant-design/icons"; // requires a loader

const CarouselCompo=()=>{

    const onChange=()=>{}
    const onClickItem=()=>{}
    const onClickThumb=()=>{}


    return (
        <Carousel
            autoPlay={true}
            swipeable={true}
            infiniteLoop={true}
            interval={3000}
            transitionTime={1000}
            swipeScrollTolerance={5}
            showThumbs={false}
            showArrows={true}
            showStatus={false}
            emulateTouch={true}
            dynamicHeight={true}
            stopOnHover={true}
            showIndicators={false}
            onChange={onChange}
            onClickItem={onClickItem}
            onClickThumb={onClickThumb}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <Button type="button" onClick={onClickHandler} title={label} className={'leftArrow arrowAttribute'}>
                        <LeftOutlined />
                    </Button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <Button type="button" onClick={onClickHandler} title={label} className={'rightArrow arrowAttribute'}>
                        <RightOutlined />
                    </Button>
                )
            }
        >
            <div className={'h-full'}>
                <img src="https://shorturl.at/Zyuqc" />
                <div className={'coverTitle'}>
                    籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊
                </div>
            </div>
            <div className={'h-full'}>
                <img src="https://shorturl.at/Zyuqc" />
                <div className={'coverTitle'}>
                    籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊
                </div>
            </div>
            <div className={'h-full'}>
                <img src="https://shorturl.at/Zyuqc" />
                <div className={'coverTitle'}>
                    籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊
                </div>
            </div>
            <div className={'h-full'}>
                <img src="https://shorturl.at/Zyuqc" />
                <div className={'coverTitle'}>
                    籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊
                </div>
            </div>
            <div className={'h-full'}>
                <img src="https://shorturl.at/Zyuqc" />
                <div className={'coverTitle'}>
                    籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊
                </div>
            </div>
            <div className={'h-full'}>
                <img src="https://shorturl.at/Zyuqc" />
                <div className={'coverTitle'}>
                    籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊
                </div>
            </div>
        </Carousel>
    );
}

export {CarouselCompo}