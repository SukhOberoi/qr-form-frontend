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
    whatsapp: "",
    hackerrankId: "",
  });
  const [isSameAsPhone, setIsSameAsPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phone" && isSameAsPhone) {
      setFormData({ ...formData, phone: value, whatsapp: value });
    }
  };

  const handleCheckboxChange = (e) => {
    setIsSameAsPhone(e.target.checked);

    if (e.target.checked) {
      setFormData({ ...formData, whatsapp: formData.phone });
    } else {
      setFormData({ ...formData, whatsapp: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setQrCode("");

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
      if (
        !phoneNoRegex.test(formData.phone) ||
        !phoneNoRegex.test(formData.whatsapp)
      ) {
        throw new Error("Number has to be 10 digits.");
      }

      const response = await fetch(
        "https://form-response-server-production.up.railway.app/submit-form",
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
      setQrCode(result.qrCode);
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
          Sign up for {event}
        </h1>
        {!qrCode ? (
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
                htmlFor="hackerrankId"
                className="block text-sm font-medium text-gray-700"
              >
                HackerRank ID
              </label>
              <input
                type="text"
                id="hackerrankId"
                name="hackerrankId"
                value={formData.hackerrankId}
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
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700"
              >
                WhatsApp Number
              </label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                disabled={isSameAsPhone}
                className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSameAsPhone ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sameAsPhone"
                checked={isSameAsPhone}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="sameAsPhone"
                className="ml-2 text-sm text-gray-700"
              >
                Same as Phone Number
              </label>
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
            <p className="text-green-500">{message}</p>
            {qrCode && (
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code"
                className="mx-auto mt-4"
              />
            )}
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
        {message && !qrCode && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
