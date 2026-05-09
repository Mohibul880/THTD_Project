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

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/forms");
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/forms",
      formData
    );

    setFormData({
      name: "",
      Age: "",
      phone: "",
      subject: "",
      message: "",
    });

    fetchData();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-5xl mx-auto">

          {/* Form Section */}
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
                  Web Development
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
                Submit Information
              </button>

            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Submitted Data
            </h2>

            <div className="overflow-x-auto">

              <table className="table table-zebra">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                  </tr>
                </thead>

                <tbody>
                  {submissions.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.Age}</td>
                      <td>{item.phone}</td>
                      <td>{item.subject}</td>
                      <td>{item.message}</td>
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