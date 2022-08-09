import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");
  const [inputText, setInputText] = useState("");

  function getData() {
    axios
      .get("https://62e39062b54fc209b88b78b7.mockapi.io/crud-reactkjs")
      .then((res) => {
        console.log(res.data); //pehle ye res ke object mai data tha tab maine res.data kiya jo bhi data rahega o data ke array mai aaya jayega [].
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://62e39062b54fc209b88b78b7.mockapi.io/crud-reactkjs/${id}`)
      .then(() => {
        getData();
      });
  }

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  getData();
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read--Operation</h2>
        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Type here.."
            onChange={inputHandler}
          />
        </div>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {/* loop use karenge uske liye table heading fixed rahega sirf table data dynamically update hoga. you can see below*/}
        {data.filter((el) => {
            if (el === "") {
              return el
            } else {
              return el.name.toLowerCase().includes(inputText) || el.email.toLowerCase().includes(inputText);
            }
          }).map((eachData) => {
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{eachData.id}</th>
                    <td>{eachData.name}</td>
                    <td>{eachData.email}</td>
                    <td>
                      <Link to="/update">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            setToLocalStorage(
                              eachData.id,
                              eachData.name,
                              eachData.email
                            )
                          }
                        >
                          Edit{" "}
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(eachData.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Read;
