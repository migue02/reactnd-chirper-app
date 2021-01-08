import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends Component {
  state = {
    text: ''
  }

  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: ''
    }))
  }

  render() {
    const { id, replies } = this.props

    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}></Tweet>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, tweets, users }, props) {
  const { id } = props.match.params

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    // authedUser,
    // tweet: tweet
    //   ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    //   : null
  }
}

export default connect(mapStateToProps)(TweetPage)