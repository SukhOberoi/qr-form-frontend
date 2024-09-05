import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const CQPanel = () => {
  const location = useLocation();
  const { isAuthenticated } = location.state || false;

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [teamMembers, setTeamMembers] = useState({});
  const [loadingMembers, setLoadingMembers] = useState({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("https://form-response-server-production.up.railway.app/teams");
        const data = await response.json();

        // Sort RSVP'd teams to the top
        const sortedTeams = data.sort((a, b) => {
          if (a.rsvp === true && b.rsvp !== true) return -1;
          if (a.rsvp === false && b.rsvp !== false) return b.rsvp === true ? 1 : -1;
          if (a.rsvp === undefined && b.rsvp !== undefined) return 1;
          return 0;
        });


        setTeams(sortedTeams);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleToggle = async (teamId) => {
    if (teamId === activeTeamId) {
      setActiveTeamId(null); // Collapse the accordion if the same team is clicked
      return;
    }

    setActiveTeamId(teamId);
    setLoadingMembers((prev) => ({ ...prev, [teamId]: true }));

    try {
      const response = await fetch(`https://form-response-server-production.up.railway.app/team/${teamId}`);
      let data = await response.json();
      data = data.members;
      setTeamMembers((prev) => ({ ...prev, [teamId]: data }));
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoadingMembers((prev) => ({ ...prev, [teamId]: false }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-[32rem]">
        {!isAuthenticated && (
          <>
            <h1 className="mb-4 text-xl font-bold">
              You are not authenticated. Please enter password.
            </h1>
            <Link to="/admin">
              <button className="w-full px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Back to Login
              </button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <div>
            <Link to="/admin" state={{ isAuthenticated: isAuthenticated }}>
              <button className="px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Back
              </button>
            </Link>

            <h1 className="p-2 mb-1 text-3xl font-bold text-center">CQ3.0 Registrations</h1>
            {loading ? (
              <div className="flex justify-center">
                <ThreeDots color="#000" height={80} width={80} />
              </div>
            ) : (
              teams.map((team, index) => (
                <div
                  key={team.id}
                  className={`mb-4 ${
                    team.rsvp === true ? "bg-green-100" : team.rsvp === false ? "bg-red-100" : "bg-gray-200"
                  }`}
                >
                  <button
                    onClick={() => handleToggle(team.id)}
                    className={`w-full px-4 py-2 text-left text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                      team.rsvp === true ? "bg-green-200" : team.rsvp === false ? "bg-red-200" : ""
                    }`}
                  >
                    {index + 1}) <span className="font-semibold">{team.teamName}</span> - {team.teamSize} Members{" "}
                    {team.rsvp === true ? "(RSVP'd Yes)" : team.rsvp === false ? "(RSVP'd No)" : ""}
                  </button>
                  {activeTeamId === team.id && (
                    <div className="p-4 mt-2 rounded-md bg-gray-50">
                      {loadingMembers[team.id] ? (
                        <div className="flex justify-center">
                          <ThreeDots color="#000" height={50} width={50} />
                        </div>
                      ) : (
                        teamMembers[team.id] && (
                          <ul>
                            {teamMembers[team.id].map((member) => (
                              <li key={member.id} className="py-2">
                                <strong>{member.name}</strong> <br />
                                <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                                  {" "}
                                  {member.email}
                                </a>
                                <br />
                                {member.phoneNo}
                                <br />
                                {member.regNo}
                                <br />
                                {member.department}
                                <br />
                                <a href={`https://wa.me/+91${member.phoneNo}`} target="_blank" rel="noopener noreferrer">
                                  <button className="w-1/2 px-4 py-2 my-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    WhatsApp
                                  </button>
                                </a>
                                <br />
                              </li>
                            ))}
                          </ul>
                        )
                      )}
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

export default CQPanel;
