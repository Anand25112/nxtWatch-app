import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {BsMoon} from 'react-icons/bs'
import {FiSun} from 'react-icons/fi'
import CommonProps from '../../context/CommonProps'
import {
  Container,
  RightContent,
  Button,
  LogoutButton,
  ModalContainer,
  AlignColumn,
  ModalDesc,
  AlignRow,
  CloseButton,
  ConfirmButton,
} from './StyledComponent'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CommonProps.Consumer>
      {value => {
        const {isDarkTheme, onChangeTheme} = value
        const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
        const textColor = isDarkTheme ? '#f9f9f9' : '#181818'
        const websiteLogo = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const onClickChangeTheme = () => {
          onChangeTheme()
        }

        return (
          <Container bgColor={bgColor}>
            <Link to="/">
              <img width="150px" src={websiteLogo} alt="website logo" />
            </Link>

            <RightContent>
              <Button
                textColor={textColor}
                onClick={onClickChangeTheme}
                data-testid="theme"
              >
                {isDarkTheme ? <BsMoon size="25" /> : <FiSun size="25" />}
              </Button>
              <Button>
                <img
                  width="30px"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </Button>
              <Popup
                modal
                trigger={
                  <LogoutButton type="button" data-testid="iconButton">
                    Logout
                  </LogoutButton>
                }
                className="popup-content"
              >
                {close => (
                  <ModalContainer>
                    <AlignColumn>
                      <ModalDesc>Are you sure, you want to logout</ModalDesc>
                      <AlignRow>
                        <CloseButton
                          type="button"
                          data-testid="closeButton"
                          onClick={() => close()}
                        >
                          Cancel
                        </CloseButton>

                        <ConfirmButton type="button" onClick={onClickLogout}>
                          Confirm
                        </ConfirmButton>
                      </AlignRow>
                    </AlignColumn>
                  </ModalContainer>
                )}
              </Popup>
            </RightContent>
          </Container>
        )
      }}
    </CommonProps.Consumer>
  )
}
export default withRouter(Header)
