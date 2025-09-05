
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ submissions }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Submissions</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Study Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School/University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field of Study</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Media</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Governorate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">About You</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">General Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drive Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strengths</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weaknesses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Per Day</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.educationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.studyYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.schoolUniversity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.fieldOfStudy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.socialMediaLinks}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.whatsappNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.governorate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.aboutYou}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.teamExperience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.generalExperience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.driveLink}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.strengths}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.weaknesses}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.followDuration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.volunteerReason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.hoursPerDay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
