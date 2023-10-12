import styled from 'styled-components'

export const Ban = styled.div`
  background-color: ${props => props.bgColor};
`

export const BgContainer = styled.div`
  background-color: ${props => props.bgColor};
`
export const BodyContent = styled.div`
  display: flex;
  gap: 8px;
`
export const BannerBg = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 70vw;
  height: 200px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const BannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
export const BannerCloseBtn = styled.button`
  border: none;
  background-color: transparent;
`
export const BannerPara = styled.p`
  font-family: Roboto;
`
export const BannerGetBtn = styled.button`
  border: 1px solid gray;
  color: black;
  background-color: transparent;
  border-radius: 8px;
  padding: 8px;
`
export const HomeSticky = styled.div`
  position: sticky;
`
export const HomeVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: scroll;
`
