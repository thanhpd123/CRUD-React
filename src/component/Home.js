// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Col, Container, Table, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: "", title: "", content: "", visible: true });
  const [updatePost, setUpdatePost] = useState({ id: "", title: "", content: "", visible: true });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/get-data?type=posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/get-data?type=posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setPosts(posts.filter((post) => post.id !== id));
        } else {
          console.error("Failed to delete post");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!newPost.id || !newPost.title || !newPost.content) {
      alert("ban chua nhap input");
      return;
    }
    if (posts.some(posts => posts.id === newPost.id)) {
      alert("trung id");
      return;
    }
    axios.post("/api/get-data?type=posts", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ id: "", title: "", content: "", visible: true });
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`/api/get-data?type=posts/${updatePost.id}`, updatePost)
      .then((response) => {
        setPosts(posts.map((post) =>
          post.id === updatePost.id ? response.data : post
        ));
        setUpdatePost({ id: "", title: "", content: "", visible: true });
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const toggleVisibility = (id) => {
    const postToToggle = posts.find((post) => post.id === id);
    postToToggle.visible = !postToToggle.visible;

    axios.put(`/api/get-data?type=posts/${id}`, postToToggle)
      .then((response) => {
        setPosts(posts.map((post) =>
          post.id === id ? response.data : post
        ));
      })
      .catch((error) => console.error("Error toggling visibility:", error));
  };

  const handleUpdateRequest = (post) => {
    setUpdatePost({
      id: post.id,
      title: post.title,
      content: post.content,
      visible: post.visible,
    });
  };

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <Container>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A90E2' }}>PERSONAL DIARY</h1>
      <Row>
        <Col sm={4}>
          <Row>
            <Col>
              <Form onSubmit={handleAdd}>
                <h2>Add New Post</h2>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={newPost.id}
                    onChange={(e) => setNewPost({ ...newPost, id: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Visible"
                    name="visible"
                    checked={newPost.visible}
                    onChange={() => setNewPost({ ...newPost, visible: !newPost.visible })}
                  />
                </Form.Group>
                <Button type="submit">Add Post</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleUpdate}>
                <h2>Update Post</h2>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={updatePost.id}
                    onChange={(e) => setUpdatePost({ ...updatePost, id: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={updatePost.title}
                    onChange={(e) => setUpdatePost({ ...updatePost, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={updatePost.content}
                    onChange={(e) => setUpdatePost({ ...updatePost, content: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Visible"
                    name="visible"
                    checked={updatePost.visible}
                    onChange={() => setUpdatePost({ ...updatePost, visible: !updatePost.visible })}
                  />
                </Form.Group>
                <Button type="submit">Update Post</Button>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col sm={8}>
          <Row>
            <Col>
              <h2>
                Post List
                <Link to="/charts" style={{ marginLeft: '300px' }}>
                  Line Charts
                </Link>
              </h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Visible</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td>{post.visible ? "Yes" : "No"}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => toggleVisibility(post.id)}>
                          {post.visible ? "Hide" : "Show"}
                        </Button>
                        <Button variant="dark" onClick={() => handleUpdateRequest(post)}>Update Request</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <Button variant="danger" onClick={handleLogout} style={{ marginTop: '10px' }}>Log Out</Button>
      </Row>

    </Container>
  );
};

export default Home;
