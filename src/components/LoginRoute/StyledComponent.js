import styled from 'styled-components'

export const BgContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
`
export const FormElement = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  padding: 40px;
  border-radius: 10px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
export const Label = styled.label`
  font-size: 15px;
  font-family: Roboto;
  color: #475569;
`
export const Input = styled.input`
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  font-family: Roboto;
  color: #475569;
  padding: 10px;
  background-color: transparent;
`
export const Button = styled.button`
  font-size: 15px;
  font-family: Roboto;
  background-color: #3b82f6;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
`
export const ImgContainer = styled.div`
  text-align: center;
`
export const ErrMsg = styled.p`
  color: red;
`
