import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';


function App() {

    const [foodName, setFoodName] = useState("")
    const [days, setDays] = useState(0)
    const [newKg, setNewKg] = useState("")
    const [foodList, setFoodList] = useState([])


    useEffect(() => {
        Axios.get("http://localhost:3001/read")
            .then((response) => {
                setFoodList(response.data)
            })
    }, [])

    const addtolist = () => {
        // console.log(foodName + days)
        Axios.post("http://localhost:3001/insert", {
            foodName: foodName,
            days: days,
        });
    }

    const updateList = (id) => {
        Axios.put("http://localhost:3001/update", {
            id: id,
            newKg: newKg,
        });
    }

    const deleteList = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`);
    }

    return (
        <div className="App">
            <h1>Grocery Stock Details</h1>
            <label>Items</label>
            <input type="text"
                onChange={(event) => {
                    setFoodName(event.target.value)
                }}
            />
            <label>Quantity</label>
            <input type="Number"
                onChange={(event) => {
                    setDays(event.target.value)
                }}
            />
            <br />
            <button onClick={addtolist} >Add to List</button>

            {foodList.map((val, index) => {
                return (
                    <div key={index} className="food">
                        <h1>Item name : {val.foodName}</h1>
                        <h4>Quantity : {val.kgs} kgs</h4>
                        <input type="text" placeholder="New Kg"
                            onChange={(event) => {
                                setNewKg(event.target.value)
                            }}
                        />
                        <br />
                        <button onClick={() => updateList(val._id)} >Update</button>
                        <button onClick={() => deleteList(val._id)} >Delete</button>
                    </div>
                )
            })}
        </div>
    )
}


export default App;