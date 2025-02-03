import React, { useState } from "react";
import axios from "axios";

interface FormData {
  Emp_Firstname: string;
  Emp_Lastname: string;
  Email: string;
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Emp_Firstname: "",
    Emp_Lastname: "",
    Email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/data", formData);
      alert(response.data.message);
      setFormData({ Emp_Firstname: "", Emp_Lastname: "", Email: "" });
    } catch (error: any) {
      console.error("Error inserting data:", error.response?.data || error.message);
      alert("Failed to insert data");
    }
  };

  return (
    <div className='container'>
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-6 mx-auto p-4 border rounded shadow bg-white">
        <h2 className="text-center me-5">Employee Detail</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="Emp_Firstname"
                placeholder="First Name"
                value={formData.Emp_Firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="Emp_Lastname"
                placeholder="Last Name"
                value={formData.Emp_Lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn custom-btn d-flex align-items-center">
              Submit
            </button></div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FormPage;