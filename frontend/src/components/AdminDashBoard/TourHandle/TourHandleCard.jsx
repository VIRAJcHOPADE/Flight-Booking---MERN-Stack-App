import React from 'react'
import './TourHandle.scss'
export const TourHandleCard = () => {
  return (
    <div>
      <div class="row-Tour">
  <div class="example-1 card-Tour-handle">
    <div class="Head-tour-tour">
      <div><span>All Tours</span></div>
      <div><button class="custom-btn-Tour-handle btn-3-Tour-button btn-create-tour"><span>Create +</span></button></div>
    </div>
    <div class="wrapper-Tour-handle">

		 <div class="image-Tour">
			 <img class="book-image-Tour" src="https://bit.ly/2GkldBe"/>
		 </div>
      
        <div class="Tour-info-handle">
                <p class="title-Tour"> Pakage Name: Thiland:-)</p>
                <p class="title-Tour"> Price: 69.69 $ </p>

          {/* <h1 class="title"><a href="#" class="cardTitle">Boxing icon has the will for a couple more fights</a></h1> */}
                <p class="title-Tour"> Destination: Secreat</p>
                <p class="title-Tour"> Event1: Massage :-)</p>
                <p class="title-Tour"> Event2: Massage:-):-)</p>
                <p class="title-Tour"> Event3: Massage:-):-):-)</p>
                <p class="title-Tour"> Event3: Massage:-):-):-)</p>
        </div>

        <div class="Tour-button-handle">
			<button class="custom-btn-Tour-handle btn-3-Tour-button"><span>Update</span></button>
		 </div>
    </div>
  </div>
</div>
    </div>
  )
}
