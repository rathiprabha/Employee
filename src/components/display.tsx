import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface Data {
  _id: string;
  Emp_Firstname: string;
  Emp_Lastname: string;
  Email: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Data | null>(null);
   const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Data[]>('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((error: AxiosError) => {
        setError(`Failed to fetch data: ${error.message}`);
      });
  };

  const handleEdit = (item: Data) => {
    setEditId(item._id);
    setEditData({ ...item });
  };

  const handleEditChange = (field: keyof Data, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleSave = async () => {
    if (editData) {
      try {
        console.log('Saving data to URL:', `http://localhost:5000/api/data/${editData._id}`);
        const response = await axios.put(`http://localhost:5000/api/data/${editData._id}`, editData);
        fetchData();
        setEditId(null);
        setEditData(null);
        setError(null); // Clear any errors on success
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(`Failed to save data: ${error.message}`);
        } else {
          setError('An unexpected error occurred.');
        }
        console.error('Error during save:', error);
      }
    }
  };
  
  
  
  const handleDelete = (_id: string) => {
    axios
      .delete(`http://localhost:5000/api/data/${_id}`)
      .then(() => {
        fetchData();
        setError(null);
      })
      .catch((error: AxiosError) => {
        setError(`Failed to delete data: ${error.message}`);
      });
  };

  const handleClick = () => {
    navigate('/form');
  };


  return (
    <div className='container'>
      <h2 className="text-center me-5">Employees List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="d-flex justify-content-end">
  <button onClick={handleClick} className="btn custom-btn d-flex align-items-center">
    <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
    Add New
  </button>
</div>

  <div className='table-container mt-3'>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {editId === item._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editData?.Emp_Firstname || ''}
                      onChange={(e) => handleEditChange('Emp_Firstname', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData?.Emp_Lastname || ''}
                      onChange={(e) => handleEditChange('Emp_Lastname', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editData?.Email || ''}
                      onChange={(e) => handleEditChange('Email', e.target.value)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faSave}
                      onClick={handleSave}
                      style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{item.Emp_Firstname}</td>
                  <td>{item.Emp_Lastname}</td>
                  <td>{item.Email}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEdit(item)}
                      style={{
                        color: "#2596be",
                        fontSize: "20px",
                        cursor: "pointer",
                        paddingRight: '10px',
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(item._id)}
                      style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DataTable;
