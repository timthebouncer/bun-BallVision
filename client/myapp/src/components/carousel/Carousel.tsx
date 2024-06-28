
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
            onChange={onChange}
            onClickItem={onClickItem}
            onClickThumb={onClickThumb}
            renderArrowPrev={()=><div style={{
                top: '0',
                color: '#fff',
                fontSize: '26px',
                bottom: '0',
                marginTop: '0',
                padding: '5px',
                left: 0
            }}>wwww</div>}
        >
            <div>
                <img src="https://shorturl.at/Zyuqc" />
            </div>
            <div>
                <img src="https://shorturl.at/Zyuqc" />
            </div>
            <div>
                <img src="https://shorturl.at/Zyuqc" />
            </div>
            <div>
                <img src="https://shorturl.at/Zyuqc" />
            </div>
            <div>
                <img src="https://shorturl.at/Zyuqc" />
            </div>
            <div>
                <img src="https://shorturl.at/Zyuqc" />
            </div>
        </Carousel>
    );
}

export {CarouselCompo}