import React, { Component, lazy } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ProductImageCorousel extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        this.state = {
            loading: true
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    handleImageLoad() {
        this.setState({ loading: false });
    }


    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const { loading } = this.state;
        const settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            // autoplay: true,
            // autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <>
                <Slider ref={c => (this.slider = c)} {...settings}>
                    {
                        this.props?.images?.map((img, i) => (
                            <div className="relative flex justify-center items-center">
                                <img key={i} draggable="false" className='w-full h-40 object-cover' src={img} alt="" onLoad={this.handleImageLoad} onPlay={lazy} />

                                {
                                    loading && <div className="flex justify-center items-center w-full h-full bg-gray-100 text-black absolute top-0 text-center">

                                    </div>
                                }
                            </div>
                        ))
                    }
                </Slider>


                <div className="hidden group-hover:block">
                    <div className="absolute top-[40%] w-full flex items-center justify-between px-3">

                        <button
                            className="bg-gray-100 hover:bg-primary hover:text-white text-gray-900 h-8 w-8 flex items-center justify-center rounded-full object-cover overflow-hidden"
                            onClick={this.previous}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            className="bg-gray-100 hover:bg-primary hover:text-white text-gray-900 h-8 w-8 flex items-center justify-center rounded-full object-cover overflow-hidden"
                            onClick={this.next}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                    </div>
                </div>
            </>
        );
    }
}