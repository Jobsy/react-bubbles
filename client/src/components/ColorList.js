
import React, { useState } from "react";

import axiosWithAuth from '../axios';


const colorURL = 'http://localhost:5000/api/colors';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth().put(`${colorURL}/${colorToEdit.id}`, {
      color: colorToEdit.color,
      code: {
        hex: colorToEdit.code.hex,
      },
      id: colorToEdit.id
    })
      .then((res) => {
        console.log("ddd: ", res.data)
      })
      .catch(err => {

      });
  };

  const addNewColor = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth().post(`${colorURL}`, {
      color: colorToEdit.color,
      code: {
        hex: colorToEdit.code.hex,
      },
      // id: colorToEdit.id
    })
      .then((res) => {
        console.log("ddd: ", res.data)
      })
      .catch(err => {

      });
  };


  const deleteColor = id => {

    axiosWithAuth().delete(`${colorURL}/${id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color.id)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={addNewColor}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  color: e.target.value
                })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <label>
            ID:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  id: e.target.value
                })
              }
              value={colorToEdit.id}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}


      <form onSubmit={addNewColor}>
        <legend>Add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                color: e.target.value
              })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        {/* <label>
          ID:
            <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                id: e.target.value
              })
            }
            value={colorToEdit.id}
          />
        </label> */}
        <div className="button-row">
          <button type="submit">Add</button>
          {/* <button onClick={() => setEditing(false)}>cancel</button> */}
        </div>
      </form>
    </div>
  );
};

export default ColorList;
