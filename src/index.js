import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDutuO-kn_vZhs1CwThiNSishCD0_WUfnQ'


// Create a new component. This component should produce
// some HTML
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null
     };

     this.videoSearch('4k');
   }

videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo:videos[0]
      });
      // ^^^ condensed version of this.setState({ videos: videos})
    });
  }

  render() {
    return (
    <div>
      <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
      onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
      videos={this.state.videos} />
    </div>
    );
  }
}

// Take this component's generated HTML and put it
//on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
