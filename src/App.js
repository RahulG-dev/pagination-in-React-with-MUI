import { Card, CardContent, Container, Pagination, Stack, Typography } from '@mui/material';
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
function App() {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10;

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response =>{
      setPost(response.data)
      setLoading(false)
    })
    .catch(error =>{
      setError(error)
      setLoading(false)
    })

  },[])

  if(loading) return <p>Loading ...</p>;
  if(error) return <p>Error fetching posts : {error.message}</p>;

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts  = posts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (event, value) =>{
    setCurrentPage(value)
  }


  return (
    <Container maxWidth="md" className="App">
      <Typography variant="h4" align="center" gutterBottom>
        MUI Pagination with Cards
      </Typography>
      
      <Stack spacing={4} alignItems='center'>
        <Stack spacing={2} width="100%">
          {currentPosts.map(post => (
            <Card key={post.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{ marginTop: '16px' }}
        />
      </Stack>
    </Container>

  );
}

export default App;
