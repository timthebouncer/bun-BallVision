import { Carousel } from 'react-responsive-carousel';
import './carousel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as React from "react";
import {Button} from "antd";
import {LeftCircleOutlined, LeftOutlined, RightCircleOutlined, RightOutlined} from "@ant-design/icons"; // requires a loader

const CarouselCompo=({articleList})=>{

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
            {/*<div className={'h-full'}>*/}
            {/*    asdasd*/}
            {/*</div>*/}
            {/*<div className={'h-full'}>*/}
            {/*    ww*/}
            {/*</div>*/}
            {/*<div className={'h-full'}>*/}
            {/*    dd*/}
            {/*</div>*/}
            {
                articleList.map(item=>{
                    return (
                        <div key={item.id} className={'h-full'}>
                            <img src={item.avatar} style={{height:480, width: '100%'}} />
                            <div className={'coverTitle'}>
                                {item.intro}
                            </div>
                        </div>
                    )
                })
            }
        </Carousel>
    );
}

export {CarouselCompo}