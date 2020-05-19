import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/post-card.js'

const FETCH_POSTS = gql`
  query {
    posts {
      id body createdAt username likesCount
      likes {
        username
      }
      comments {
        id body username createdAt
      }
    }
  }
`

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS)
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? <h1>Loading posts...</h1> : data.posts && data.posts.map(post => 
          <Grid.Column key={post.id} style={{ marginBottom: 10 }}>
            <PostCard post={post} />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home