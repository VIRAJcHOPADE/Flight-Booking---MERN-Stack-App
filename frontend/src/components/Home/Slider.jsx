import React, {useState} from 'react'
import './Slider.scss'
import BtnSlider from './BtnSlider'
import { useNavigate } from 'react-router'

export default function Slider({dataSlider}) {
const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }


    return (
        <div className="container-slider">
            {dataSlider?.map((obj, index) => {
                return (
                    <div
                    key={index}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src='https://www.shutterstock.com/image-vector/travel-sale-banner-yellow-tag-260nw-1750129319.jpg'
                        // style={{cursor:"pointer"}}
                        // onClick={()=>{
                        //     navigate(`/products/${obj?.brand}`)
                        // }}
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

        </div>
    )
}