import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import './App.css'
import { useEffect, useState } from 'react'

const sampleTodos = [
  { title: "Buy groceries", done: false },
  { title: "Do laundry", done: false },
  { title: "Clean the house", done: true },
  { title: "Go for a run", done: true }
];

function App() {

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage["todos"]);
    setTodos(storedTodos || sampleTodos);
  }, []);

  useEffect(() => {
    localStorage["todos"] = JSON.stringify(todos);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [...todos];
    const firstDoneIndex = newTodos.findIndex(x => x.done);
    const targetIndex = firstDoneIndex < 0 ? newTodos.length : firstDoneIndex;
    newTodos.splice(targetIndex, 0, { title, done: false });
    setTodos(newTodos);
    setTitle("");
  }

  const handleChange = (e, index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = e.target.checked;
    updatedTodos.sort((a, b) => a.done - b.done); // alfabetik için ternary ile eşitlikte localeCompare kullan.
    setTodos(updatedTodos);
  }

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }

  return (
    <>
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col sm={11} md={8} lg={6}>
            <h1>To-Do List</h1>
            <Form onSubmit={handleSubmit}>
              <InputGroup size='lg' className="mb-3">
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a new task" required />
                <Button type='submit' variant="outline-dark"><i className="fa-solid fa-plus"></i></Button>
              </InputGroup>
            </Form>
            <div className='p-0'>
              {todos.map((x, i) => (
                <div key={i} className='todo d-flex justify-content-between align-items-center p-2 rounded-3 mb-2'>
                  <div>
                    <input type="checkbox" className='form-check-input bg-dark me-2' checked={x.done} onChange={(e) => handleChange(e, i)} id={"todo-" + i} />{" "}
                    <label htmlFor={"todo-" + i}>{x.title}</label>
                  </div>
                  <Button variant='outline-dark' onClick={() => handleDelete(i)}><i className="fa-solid fa-xmark"></i></Button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
