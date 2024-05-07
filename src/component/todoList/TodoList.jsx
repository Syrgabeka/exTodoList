import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const url = "https://1d68bf53cde13854.mokky.dev/itemtodolist";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [edit, setEdit] = useState(null);

  const getTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postTodos = async (e) => {
    e.preventDefault();
    const newData = {
      text: input,
      completed: false, // New todos are not completed by default
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setInput("");
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const patchTodos = async (id, updatedData) => {
    try {
      await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      getTodos();
      if (edit === id) setEdit(null); // Reset edit state after successful update
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id, text) => {
    setEdit(id);
    setEditInput(text);
  };

  const handleToggleComplete = async (id, completed) => {
    const updatedData = {
      completed: !completed,
    };
    patchTodos(id, updatedData);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <div>
        <div>
          <form onSubmit={postTodos}>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишити что-то"
            />
            <Button type="submit">AddTask</Button>
          </form>

          {todos.map((item) => (
            <StyledContainer key={item.id} completed={item.completed}>
              {edit === item.id ? (
                <Input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
              ) : (
                <span>{item.text}</span>
              )}
              <div>
                <Button
                  onClick={() => handleToggleComplete(item.id, item.completed)}
                  value={item.completed ? " Uncomplete" : " Complete"}
                >
                  {item.completed ? "Uncomplete" : " Complete"}
                </Button>
                {edit === item.id ? (
                  <>
                    <Button
                      onClick={() => patchTodos(item.id, { text: editInput })}
                    >
                      Save
                    </Button>
                    <Button onClick={() => handleEdit(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => handleEdit(item.id, item.text)}>
                    Edit
                  </Button>
                )}
                <Button onClick={() => deleteTodo(item.id)}>Delete</Button>
              </div>
            </StyledContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

const StyledContainer = styled.div`
  font-size: 25px;
  margin: 10px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 6fr 2.5fr;
  background-color: #fff;

  ${(props) =>
    props.completed &&
    css`
      text-decoration: line-through;
    `}
`;
