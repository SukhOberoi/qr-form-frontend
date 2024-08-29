import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const RecruitmentPanel = () => {
  const location = useLocation();
  const { isAuthenticated } = location.state || false;

  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRecruitmentId, setActiveRecruitmentId] = useState(null);
  const [statistics, setStatistics] = useState({
    totalApplicants: 0,
    domainCounts: {}
  });

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await fetch("https://form-response-server-production.up.railway.app/recruitments");
        const data = await response.json();
        setRecruitments(data);
        calculateStatistics(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recruitments:", error);
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  const calculateStatistics = (recruitments) => {
    const domainCounts = {};
    recruitments.forEach(recruitment => {
      if (recruitment.domains) {
        recruitment.domains.forEach(domain => {
          domainCounts[domain] = (domainCounts[domain] || 0) + 1;
        });
      }
    });

    setStatistics({
      totalApplicants: recruitments.length,
      domainCounts
    });
  };

  const handleToggle = (recruitmentId) => {
    setActiveRecruitmentId(activeRecruitmentId === recruitmentId ? null : recruitmentId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-[32rem]">
        {!isAuthenticated && (
          <>
            <h1 className="mb-4 text-xl font-bold">
              You are not authenticated. Please enter password.
            </h1>
            <button className="w-full px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Back to Login
            </button>
          </>
        )}
        {isAuthenticated && (
            <div>
              <Link to="/admin" state={{ isAuthenticated: isAuthenticated }}><button className="px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Back</button></Link>
            {/* Statistics Section */}
            <div className="p-4 mb-6 bg-gray-200 rounded-md shadow-sm">
              <h2 className="mb-2 text-xl font-bold">Statistics</h2>
              {loading ? (
                <div className="flex justify-center">
                  <ThreeDots color="#000" height={50} width={50} />
                </div>
              ) : (
                <div>
                  <div className="mb-2">
                    <strong>Total Applicants:</strong> {statistics.totalApplicants}
                  </div>
                  <div>
                    <strong>Applicants by Domain:</strong>
                    <ul className="pl-5 list-disc">
                      {Object.entries(statistics.domainCounts).map(([domain, count]) => (
                        <li key={domain} className="py-1">{domain}: {count}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Recruitment List */}
            <h1 className="p-2 mb-1 text-3xl font-bold text-center">Recruitment Panel</h1>
            {loading ? (
              <div className="flex justify-center">
                <ThreeDots color="#000" height={80} width={80} />
              </div>
            ) : (
              recruitments.map((recruitment, index) => (
                <div key={recruitment.id} className="mb-4">
                  <button
                    onClick={() => handleToggle(recruitment.id)}
                    className="w-full px-4 py-2 text-left text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {index + 1}) <span className="font-semibold">{recruitment.name}</span> - {recruitment.email}
                  </button>
                  {activeRecruitmentId === recruitment.id && (
                    <div className="p-4 mt-2 rounded-md bg-gray-50">
                      <div className="mb-2">
                        <strong>Department:</strong> {recruitment.department}
                      </div>
                      <div className="mb-2">
                        <strong>Year:</strong> {recruitment.year}
                      </div>
                      <div className="mb-2">
                        <strong>Phone:</strong> {recruitment.phone}
                      </div>
                      <div className="mb-2">
                        <strong>Registration No:</strong> {recruitment.registrationNo}
                      </div>
                      <div>
                        <strong>Domains:</strong>
                        <ul className="pl-5 list-disc">
                          {recruitment.domains.map((domain, i) => (
                            <li key={i} className="py-1">{domain}</li>
                          ))}
                        </ul>
                      </div>
                      <a href={`https://wa.me/+91${recruitment.phone}`} target="_blank"><button className="w-1/2 px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">WhatsApp</button></a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentPanel;
