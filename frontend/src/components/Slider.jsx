import React from 'react'
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'


 const Slider = () =>  {
  return (
    <div>
            <div className="row">
            <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slider1} className="d-block w-100" style={{height: '75vh', objectFit: 'cover'}} alt="Image 1"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider2} className="d-block w-100" style={{height: '75vh', objectFit: 'cover'}} alt="Image 2"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider3} className="d-block w-100" style={{height: '75vh', objectFit: 'cover'}} alt="Image 3"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
            
         </div>
    </div>
  )
}
export default Slider;