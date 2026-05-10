import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    Age: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submissions, setSubmissions] = useState([]);

  const [sortOrder, setSortOrder] =
    useState("desc");

  // EDIT MODE
  const [editId, setEditId] =
    useState(null);



  // =====================================
  // FETCH DATA
  // =====================================

  const fetchData = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/forms?sort=${sortOrder}`
      );

      setSubmissions(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    fetchData();

  }, [sortOrder]);



  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  // =====================================
  // HANDLE SUBMIT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // EDIT DATA
      if (editId) {

        await axios.put(
          `http://localhost:5000/api/forms/${editId}`,
          formData
        );

        setEditId(null);

      }

      // ADD DATA
      else {

        await axios.post(
          "http://localhost:5000/api/forms",
          formData
        );

      }

      // CLEAR FORM
      setFormData({
        name: "",
        Age: "",
        phone: "",
        subject: "",
        message: "",
      });

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };



  // =====================================
  // DELETE DATA
  // =====================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/forms/${id}`
      );

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };



  // =====================================
  // EDIT DATA
  // =====================================

  const handleEdit = (item) => {

    setFormData({

      name: item.name,

      Age: item.Age,

      phone: item.phone,

      subject: item.subject,

      message: item.message,

    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };



  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-base-200 p-6">

        <div className="max-w-6xl mx-auto">

          {/* ================= FORM ================= */}

          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">

            <h1 className="text-3xl font-bold text-center text-primary mb-2">

              Target Health & Technical Development Society

            </h1>

            <p className="text-center mb-6">

              Learn, Health, Grow

            </p>



            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="Age"
                placeholder="Your Age"
                className="input input-bordered w-full"
                value={formData.Age}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <select
                name="subject"
                className="select select-bordered w-full"
                value={formData.subject}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Subject
                </option>

                <option>
                  Free Test
                </option>

                <option>
                  Health Awareness
                </option>

                <option>
                  Computer Training
                </option>

                <option>
                  Technical Support
                </option>

                <option>
                  Volunteer Registration
                </option>

              </select>

              <textarea
                name="message"
                placeholder="Message"
                className="textarea textarea-bordered md:col-span-2"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button className="btn btn-primary md:col-span-2">

                {editId
                  ? "Update Information"
                  : "Submit Information"}

              </button>

            </form>

          </div>



          {/* ================= TABLE ================= */}

          <div className="bg-white rounded-xl shadow-xl p-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

              <h2 className="text-2xl font-bold">

                Submitted Data

              </h2>

              <select
                className="select select-bordered w-full md:w-72"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
              >

                <option value="desc">
                  Newest First (Descending)
                </option>

                <option value="asc">
                  Oldest First (Ascending)
                </option>

              </select>

            </div>



            <div className="overflow-x-auto">

              <table className="table table-zebra">

                <thead>

                  <tr>

                    <th>SL</th>

                    <th>Name</th>

                    <th>Age</th>

                    <th>Phone</th>

                    <th>Subject</th>

                    <th>Message</th>

                    <th>Action</th>

                  </tr>

                </thead>



                <tbody>

                  {submissions.map((item) => (

                    <tr key={item._id}>

                      <td>
                        {item.serialNumber}
                      </td>

                      <td>
                        {item.name}
                      </td>

                      <td>
                        {item.Age}
                      </td>

                      <td>
                        {item.phone}
                      </td>

                      <td>
                        {item.subject}
                      </td>

                      <td>
                        {item.message}
                      </td>

                      {/* ACTION BUTTONS */}

                      <td className="flex gap-2">

                        {/* EDIT BUTTON */}

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="btn btn-info btn-sm text-white"
                        >

                          Edit

                        </button>



                        {/* DELETE BUTTON */}

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="btn btn-error btn-sm text-white"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default App;