import { Carousel } from 'react-responsive-carousel';
import './carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {FC} from "react";


interface ArticlesProps {
    articleList: ARTICLE[];
}

const CarouselCompo: FC<ArticlesProps> = ({ articleList }) => {

    const onChange = () => {
        // Handle carousel change event
    };

    const onClickItem = () => {
        // Handle click on carousel item
    };

    const onClickThumb = () => {
        // Handle click on carousel thumbnail
    };

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
                    <Button
                        onClick={onClickHandler}
                        title={label}
                        className={'leftArrow arrowAttribute'}
                    >
                        <LeftOutlined />
                    </Button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <Button
                        onClick={onClickHandler}
                        title={label}
                        className={'rightArrow arrowAttribute'}
                    >
                        <RightOutlined />
                    </Button>
                )
            }
        >
            {articleList.map(item => (
                <div key={item.id} className={'h-full'}>
                    <img src={item.avatar} alt={item.title} style={{ height: 480, width: '100%' }} />
                    <div className={'coverTitle'}>
                        {item.intro}
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export { CarouselCompo };