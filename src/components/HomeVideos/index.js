import {Component} from 'react'
import Cookies from 'js-cookie'
import {GoSearch} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import HomeVideoCard from '../HomeVideoCard'
import FailureView from '../FailureView'

import {
  SearchContainer,
  HomeVideoContainer,
  LoaderContainer,
  UlElenemt,
  SearchInput,
} from './StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeVideos extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    searchedVideos: [],
  }

  componentDidMount() {
    this.getSuggestedVideos()
  }

  getData = () => {
    this.getSuggestedVideos()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getSuggestedVideos)
  }

  getSuggestedVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      searchInput.length === 0
        ? 'https://apis.ccbp.in/videos/all'
        : `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        searchedVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderVideosView = () => {
    const {searchedVideos} = this.state

    return (
      <div>
        <UlElenemt>
          {searchedVideos.map(each => (
            <HomeVideoCard id={each.id} details={each} />
          ))}
        </UlElenemt>
      </div>
    )
  }

  renderHomeVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <HomeVideoContainer>
        <SearchContainer>
          <SearchInput type="search" onChange={this.onSearchInput} />
          <button type="button" onClick={this.getData}>
            <GoSearch size="30" />
          </button>
        </SearchContainer>
        <div>{this.renderHomeVideos()}</div>
      </HomeVideoContainer>
    )
  }
}
export default HomeVideos
