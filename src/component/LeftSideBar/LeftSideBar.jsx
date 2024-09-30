import React from 'react'
import './LeftSideBar.css'
import assets from '../../assets/assets'
import { Link } from 'react-router-dom'
function LeftSideBar() {
  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
           <img src={assets.logo} className='logo' alt="" />
            <div className="menu">
                <img src={assets.menu_icon} alt="" />
                <div className="sub-menu">
                  <Link className='link-btn-profile' state={{textDecoration:'none'}} to={'/profileupdate'}><p>Edit Profile</p></Link>
                  <hr />
                  <p className='logout'>Logout</p>
                </div>
            </div>
        </div>
        <div className='ls-search'>
            <img className='search-img' src={assets.search_icon} alt="" />
            <input type="text" placeholder='Search hear..' />
        </div>
      </div>
      <div className="ls-list">
      {Array(12).fill("").map((item,index)=>(
         <Link style={{listStyle:'none',textDecoration:'none'}} to={'/chatbox'}>
            <div key={index} className='friends'>
            <img src={assets.profile_img} alt="" />
            <div>
                <p>Richard Sanford</p>
                <span>hello,how are you?</span>
            </div>
        </div>
         </Link>
      ))}
      </div>
    </div>
  )
}

export default LeftSideBar
