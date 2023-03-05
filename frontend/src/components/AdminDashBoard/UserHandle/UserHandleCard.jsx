import React from 'react'
import './UserHandle.scss'
export const UserHandleCard = () => {
  return (
    <div>
         <div class="row-user">
  <div class="example-1 card-user-handle">
    <div class="wrapper-user-handle">

		 <div class="image-user">
			 <img class="book-image-user" src="https://bit.ly/2GkldBe"/>
		 </div>
      
        <div class="user-info-handle">
                <p class="title-user"> Name: Viraj Vishnu chopade</p>
                <p class="title-user"> Email: virajchopade527@gmail.com </p>

          {/* <h1 class="title-user"><a href="#" class="cardTitle">Boxing icon has the will for a couple more fights</a></h1> */}
                <p class="title-user"> UserName: virajchopade</p>
        </div>

        <div class="user-button-handle">
			<button class="custom-btn-user-handle btn-3-user-button"><span>Read More</span></button>
		 </div>
    </div>
  </div>
</div>
    </div>
  )
}
