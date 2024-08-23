// src/components/Form.js
import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";

const Form = () => {
  const event = "Campus Quest Epilogue: Code, Compete, Excel";
  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    year: "",
    department: "",
    email: "",
    phone: "",
    domains: [] 
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle checkbox logic
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          domains: [...prevData.domains, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          domains: prevData.domains.filter((domain) => domain !== value),
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const regNoRegex = /^RA\d{13}$/;
      if (!regNoRegex.test(formData.registrationNo)) {
        throw new Error(
          "Registration number is incorrect. Please verify and try again.",
        );
      }
      const srmEmailRegex = /@srmist\.edu\.in$/;
      if (!srmEmailRegex.test(formData.email)) {
        throw new Error("Please enter your SRMIST email ID.");
      }
      const emailFormatRegex = /^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/;
      if (!emailFormatRegex.test(formData.email)) {
        throw new Error("Please re-check the email ID you entered.");
      }
      const phoneNoRegex = /^\d{10}$/;
      if (!phoneNoRegex.test(formData.phone)) {
        throw new Error("Number has to be 10 digits.");
      }

      const response = await fetch(
        "https://form-response-server-production.up.railway.app/submit-form",
        //"http://localhost:5000/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage(result.message);
    } catch (error) {
      console.error("Error:", error);
      if (error.message) setMessage("Error: " + error.message);
      else setMessage("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Coding Ninjas Club SRM Recruitment Form{/* Sign up for {event} */}
        </h1>
        {!message ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="registrationNo"
                className="block text-sm font-medium text-gray-700"
              >
                Registration No.
              </label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Year of Study
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                SRM Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700"
              >
                Domains (Select the domains you would like to apply for)
              </label>
              <div className="mt-2 space-y-2">
                <div>
                  <input
                    type="checkbox"
                    id="ai-ml"
                    name="domain"
                    value="AI/ML"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="ai-ml">AI/ML</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="web-dev"
                    name="domain"
                    value="Web Dev"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="web-dev">Web Dev</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="app-dev"
                    name="domain"
                    value="App Dev"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="app-dev">App Dev</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="creatives"
                    name="domain"
                    value="Creatives"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="creatives">Creatives</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="sponsorships"
                    name="domain"
                    value="Sponsorships"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="sponsorships">Sponsorships</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="corporate"
                    name="domain"
                    value="Corporate"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="corporate">Corporate</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="editorial"
                    name="domain"
                    value="Editorial"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="editorial">Editorial</label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}>{message}</p>
            {message.includes("Error") &&<button className="w-1/3 px-4 py-2 m-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>{
              setMessage("");
              setLoading(false);
              setFormData((prevData) => ({
                ...prevData,
                domains:[],}))
              
            }}>Try Again</button>}
            <p>Follow our Instagram for updates</p>
            <a href="https://www.instagram.com/srm_cn/" target="_blank">
              <div className="flex items-center justify-center text-xl text-pink-500">
                <FaInstagram />
                <p className="pb-1">srm_cn</p>
              </div>
            </a>
          </div>
        )}
        {loading && (
          <div className="flex justify-center mt-4">
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {/* {message && !qrCode && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Form;
