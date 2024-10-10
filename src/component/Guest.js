// Guest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const Guest = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data.filter(post => post.visible)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: 'center', marginTop: '50px', marginBottom: '20px', color: '#4A90E2' }}>GUEST</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Guest;
