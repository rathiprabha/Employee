import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // To manage form state
import axios from 'axios'; // For making API calls
import Navbar from './module/layout/Navbar';

interface Student {
  Rollno: string;
  Name: string;
}

const MarkEntryForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [students, setStudents] = useState<Student[]>([]);
  const [className, setClassName] = useState<string>('');
  const [showTable, setShowTable] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<string>('');

  useEffect(() => {
    const year = new Date().getFullYear();
    const nextYear = year + 1;
    setCurrentYear(`${year}-${nextYear}`);
  }, []);

  const handleClassChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value;
    setClassName(selectedClass);
    
    if (selectedClass) {
      try {
        const response = await axios.get(`/Auth/get_student/${selectedClass}`);
        const data = response.data.student;
        setStudents(data);
        setShowTable(true);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    } else {
      setShowTable(false);
      setStudents([]);
    }
  };

  const onSubmit = (data: any) => {
    // Handle form submission logic here
    console.log(data);
  };

  const calculateSubtotal = (index: number) => {
    const eng1 = parseInt((document.getElementById(`1eng${index}`) as HTMLInputElement)?.value) || 0;
    const eng2 = parseInt((document.getElementById(`2eng${index}`) as HTMLInputElement)?.value) || 0;
    const physics = parseInt((document.getElementById(`physics${index}`) as HTMLInputElement)?.value) || 0;
    const chemistry = parseInt((document.getElementById(`chemistry${index}`) as HTMLInputElement)?.value) || 0;
    const biology = parseInt((document.getElementById(`biology${index}`) as HTMLInputElement)?.value) || 0;
    const maths = parseInt((document.getElementById(`maths${index}`) as HTMLInputElement)?.value) || 0;

    const subtotal = eng1 + eng2 + physics + chemistry + biology + maths;
    setValue(`sub_total[${index}]`, subtotal);
    return subtotal;
  };

  const calculateTotals = () => {
    let total = 0;
    const subtotals = students.map((_, index) => {
      const subtotal = calculateSubtotal(index);
      total += subtotal;
      return subtotal;
    });

    const average = total / students.length;
    setValue('total', total);
    setValue('average', average.toFixed(2));
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <select className="form-control" name="class" onChange={handleClassChange}>
                    <option value="">Please Select Class</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-control" {...register("testname")} required>
                    <option value="">Please Select Test Name</option>
                    <option value="I Midterm">I Midterm</option>
                    <option value="I Terminal">I Terminal</option>
                    <option value="II Midterm">II Midterm</option>
                    <option value="II Terminal">II Terminal</option>
                    <option value="III Midterm">III Midterm</option>
                    <option value="III Terminal">III Terminal</option>
                  </select>
                </div>
                <div className="col text-center">
                  <h6>{currentYear}</h6>
                  <input type="hidden" {...register("batch")} value={currentYear} />
                </div>
              </div>
            </div>
            <div className="card-body">
              {showTable && (
                <>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>RollNo</th>
                        <th>Name</th>
                        <th>English 1</th>
                        <th>English 2</th>
                        <th>Physics</th>
                        <th>Chemistry</th>
                        <th>Biology</th>
                        <th>Maths</th>
                        <th>SubTotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.Rollno}>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={student.Rollno}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={student.Name}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              id={`1eng${index}`}
                              {...register(`eng1[${index}]`)}
                              onChange={() => calculateTotals()}
                              placeholder="English I"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              id={`2eng${index}`}
                              {...register(`eng2[${index}]`)}
                              onChange={() => calculateTotals()}
                              placeholder="English II"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              id={`physics${index}`}
                              {...register(`physics[${index}]`)}
                              onChange={() => calculateTotals()}
                              placeholder="Physics"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              id={`chemistry${index}`}
                              {...register(`chemistry[${index}]`)}
                              onChange={() => calculateTotals()}
                              placeholder="Chemistry"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              id={`biology${index}`}
                              {...register(`biology[${index}]`)}
                              onChange={() => calculateTotals()}
                              placeholder="Biology"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              id={`maths${index}`}
                              {...register(`maths[${index}]`)}
                              onChange={() => calculateTotals()}
                              placeholder="Maths"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              id={`sub_total${index}`}
                              {...register(`sub_total[${index}]`)}
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={8}>Total</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            {...register('total')}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={8}>Average (%)</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            {...register('average')}
                            readOnly
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
              <button type="submit" className="btn" style={{ backgroundColor: '#2596be', color: 'white' }}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkEntryForm;
