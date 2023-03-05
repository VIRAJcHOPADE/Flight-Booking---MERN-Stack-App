import React from 'react'
import './crosol.scss'


var bannerCarousel = (".banner-carousel");

bannerCarousel.flickity({
	imagesLoaded: true,
	wrapAround: true,
	autoPlay: true,
	pauseAutoPlayOnHover: true,
	pageDots: true
});

export const Crosol = () => {
  return (
    <div>
        				<div class="slide-content-inner">
<div class="banner-carousel">
	<div class="banner-carousel-slide">
		<div class="slide-container">
			<div class="is-item slide-half with-content">
				<div class="slide-content-inner">
					<h2><span>Slide 1</span></h2>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quidem delectus laborum itaque alias, officiis laborum laborum illum voluptates est et voluptas?</p>
				</div>
			</div>
      <div class="is-item slide-half with-img">
				<div class="slide-half-img">
					<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/602471/jake-ingle-168726%20copy.jpg" alt=""/>
				</div>
			</div>
		</div>
	</div>

	<div class="banner-carousel-slide">
		<div class="slide-container">
			<div class="is-item slide-half with-content">
				<div class="slide-content-inner">
					<h2><span>Slide 2</span></h2>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quidem delectus laborum itaque alias, officiis laborum laborum illum voluptates est et voluptas?</p>
				</div>
			</div>
      <div class="is-item slide-half with-img">
				<div class="slide-half-img">
					<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/602471/lee-campbell-512447%20copy.jpg" alt=""/>
				</div>
			</div>
		</div>
	</div>
  
  <div class="banner-carousel-slide">
		<div class="slide-container">
			<div class="is-item slide-half with-content">
				<div class="slide-content-inner">
					<h2><span>Slide 3</span></h2>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quidem delectus laborum itaque alias, officiis laborum laborum illum voluptates est et voluptas?</p>
					<p>Sed quidem delectus laborum itaque laborum alias, officiis illum voluptates est et voluptas?</p>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quidem delectus laborum itaque alias, officiis illum voluptates est et voluptas?</p>
				</div>
			</div>
      <div class="is-item slide-half with-img">
				<div class="slide-half-img">
					<img src="https://unsplash.it/666/932?image=1074" alt=""/>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
    
    </div>
  )
}
