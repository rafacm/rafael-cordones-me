import { Component } from 'react'

export default class SpeakerDeckSlides extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.setAttribute('class', "speakerdeck-embed")
    script.setAttribute('src', "//speakerdeck.com/assets/embed.js")
    script.setAttribute('data-id', this.props.slidesId)
    script.setAttribute('data-ratio', this.props.slidesRatio)
    script.async = true;
    document.getElementById('speakerdeck-slides').appendChild(script);
  }
  render() {
    return (
      <div id="speakerdeck-slides"></div>
    )
  }
}
