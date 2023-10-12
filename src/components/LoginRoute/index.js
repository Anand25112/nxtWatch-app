import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  UserDetails,
  FormElement,
  BgContainer,
  Label,
  Button,
  Input,
  ImgContainer,
  ErrMsg,
} from './StyledComponent'

class LoginRoute extends Component {
  state = {
    userName: '',
    passWord: '',
    showError: false,
    errMsg: '',
    isPassShow: false,
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassWord = event => {
    this.setState({passWord: event.target.value})
  }

  isPassShow = () => {
    this.setState(prev => ({isPassShow: !prev.isPassShow}))
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFail = errMsg => {
    this.setState({showError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {username: userName, password: passWord}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFail(data.error_msg)
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {userName, passWord, showError, errMsg, isPassShow} = this.state
    const inputType = isPassShow ? 'text' : 'password'

    return (
      <BgContainer>
        <FormElement onSubmit={this.onSubmitForm}>
          <ImgContainer>
            <img
              width="200px"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
            />
          </ImgContainer>
          <UserDetails>
            <Label htmlFor="username">USERNAME</Label>
            <Input
              id="username"
              value={userName}
              type="text"
              placeholder="Username"
              onChange={this.onChangeUserName}
            />
          </UserDetails>
          <UserDetails>
            <Label htmlFor="username">PASSWORD</Label>
            <Input
              id="password"
              value={passWord}
              type={inputType}
              placeholder="password"
              onChange={this.onChangePassWord}
            />

            <div>
              <input id="pasShow" type="checkbox" onChange={this.isPassShow} />
              <label htmlFor="pasShow">Show password</label>
            </div>
          </UserDetails>
          <Button type="submit">Login</Button>
        </FormElement>
        {showError && <ErrMsg>{errMsg}</ErrMsg>}
      </BgContainer>
    )
  }
}
export default LoginRoute
