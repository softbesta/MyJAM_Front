import { useNavigate, NavLink } from "react-router-dom"
import styled from "styled-components"
import Logo from '../assets/jamLogo.png'
import * as Auth from '../apis/auth'
import { useAppContext } from "../context"
import { useEffect } from "react"

const Header = () => {
  const { setUser, searchKey, setSearchKey } = useAppContext()
  const currentLogin = Auth.getCurrentUser()
  useEffect(() => {
    console.log({currentLogin})
    if (!currentLogin) setUser(undefined)
    setUser(currentLogin)
  }, [])

  const navigate = useNavigate()
  const handleClick = () => {
    console.log({searchKey})
  }
  const handleLogin = () => {
    navigate('/login')
  }
  const handleLogout = () => {
    Auth.logout()
    setUser(undefined)
    navigate('/')
  }
  const handleSignup = () => {
    navigate('/signup')
  }
  return (
    <div className="border-b-2 border-solid border-b-[#cdcdcd]">
      <Container>
      <NavLink to={'/'}><LogoImage src={Logo} alt='JAM Logo' /></NavLink>
      <SearchBar>
        <SearchInput
          type='text'
          value={searchKey} 
          onChange={e => {
            setSearchKey(e.target.value)
          }}
          placeholder='Search Musics'
        />
        <SearchButton onClick={handleClick} src="https://www.transparentpng.com/thumb/search-button/XwzcnM-search-icon-square-find-button-hd-image.png" alt="Search" />
      </SearchBar>
      <ButtonContainer>
        {currentLogin ?
          <AuthButton onClick={handleLogout}>Logout</AuthButton>
          :
          <>
            <AuthButton onClick={handleLogin}>Login</AuthButton>
            <AuthButton onClick={handleSignup}>Signup</AuthButton>
          </>
        }
      </ButtonContainer>
      </Container>
    </div>
  )
}
export default Header

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  
`
const LogoImage = styled.img`
  height: 50px;
`
const SearchBar = styled.div`
  display: flex;
  width: 50%;
  border: cdcdcd;
  border: 1px solid #cdcdcd;
  border-radius: 10px;
  padding: 4px 8px;
`
const SearchInput = styled.input`
  width: 100%;
  min-width: 100px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: transparent;
`
const SearchButton = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 8px;
`
const ButtonContainer = styled.div`
  display: flex;
`
const AuthButton = styled.div`
  background-color: initial;
  border: none;
  font-size: 20px;
  margin: 0.5rem;
  cursor: pointer;
`