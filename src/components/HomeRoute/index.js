import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import Header from '../Header'
import SideBar from '../SideBar'
import HomeVideos from '../HomeVideos'
import CommonProps from '../../context/CommonProps'

import {
  BgContainer,
  BodyContent,
  BannerBg,
  BannerHeader,
  BannerCloseBtn,
  BannerGetBtn,
  HomeSticky,
  HomeVideoContainer,
} from './StyledComponent'

class HomeRoute extends Component {
  state = {displayBanner: true}

  onCloseBanner = () => {
    this.setState({displayBanner: false})
  }

  displayBanner = () => (
    <BannerBg data-testid="banner">
      <BannerHeader>
        <img
          width="150px"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <BannerCloseBtn onClick={this.onCloseBanner} data-testid="close">
          <IoMdClose />
        </BannerCloseBtn>
      </BannerHeader>
      <div>
        <p>
          Buy Nxt Watch Premium prepaid plan with <br />
          UPI
        </p>
        <BannerGetBtn>GET IT NOW</BannerGetBtn>
      </div>
    </BannerBg>
  )

  render() {
    return (
      <CommonProps.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          const {displayBanner} = this.state

          return (
            <BgContainer bgColor={bgColor}>
              <HomeSticky>
                <Header />
              </HomeSticky>
              <BodyContent>
                <HomeSticky>
                  <SideBar />
                </HomeSticky>
                <HomeVideoContainer>
                  <div>{displayBanner && this.displayBanner()}</div>
                  <HomeVideos />
                </HomeVideoContainer>
              </BodyContent>
            </BgContainer>
          )
        }}
      </CommonProps.Consumer>
    )
  }
}
export default HomeRoute
