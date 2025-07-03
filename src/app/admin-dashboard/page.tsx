"use client"
import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaSlidersH, FaChartBar, FaUserCircle, FaCog, FaEdit, FaTrash, FaDollarSign, FaUsers, FaCheck } from 'react-icons/fa';

const summaryCards = [
  { icon: <FaUserGraduate size={24} />, label: 'Total Students', value: '500' },
  { icon: <FaChalkboardTeacher size={24} />, label: 'Total Experts', value: '15' },
  { icon: <FaDollarSign size={24} />, label: 'Revenue', value: '$50,000' },
  { icon: <FaUsers size={24} />, label: 'Total clients', value: '120' },
];



const sidebarItems = [
  { icon: <FaChartBar />, label: 'Dashboard' },
  { icon: <FaUserGraduate />, label: 'Students' },
  { icon: <FaChalkboardTeacher />, label: 'Experts' },
  { icon: <FaSlidersH />, label: 'Slider Content' },
];

export default function AdminDashboard() {
  const [selectedSidebar, setSelectedSidebar] = useState('Dashboard');
  const [studentSearch, setStudentSearch] = useState('');
  const [expertSearch, setExpertSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Example data
  const students = [
    { name: 'Leslie Alexander', img: 'https://randomuser.me/api/portraits/women/68.jpg', email: 'leslie@acme.com', journeys: 3, status: 'Unblock' },
    { name: 'Ronald Richards', img: 'https://randomuser.me/api/portraits/men/65.jpg', email: 'ronald@summit.com', journeys: 1, status: 'Block' },
  ];
  const experts = [
    { name: 'Brooklyn Simmons', img: 'https://randomuser.me/api/portraits/men/32.jpg', email: 'brooklyn@brightstar.com', meetings: 12, status: 'Unblock' },
    { name: 'Cameron Williamson', img: 'https://randomuser.me/api/portraits/men/33.jpg', email: 'cameron@zenith.com', meetings: 7, status: 'Block' },
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );
  const filteredExperts = experts.filter(e =>
    e.name.toLowerCase().includes(expertSearch.toLowerCase()) ||
    e.email.toLowerCase().includes(expertSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for large screens */}
      <aside className="w-64 bg-white border-r flex-col justify-between min-h-screen hidden lg:flex">
        <div>
          <div className="flex flex-col px-6 py-6">
            <span className="text-2xl font-bold text-blue-700">ISHC</span>
            <span className="text-xs text-gray-500 font-semibold mt-1">International Students Help Center</span>
          </div>
          <nav className="mt-4">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-blue-50 text-gray-700 text-base ${selectedSidebar === item.label ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}
                onClick={() => setSelectedSidebar(item.label)}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div className="px-6 py-4 border-t flex items-center gap-3">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div>
            <div className="font-semibold text-gray-800">Denzel Washington</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </aside>

      {/* Sidebar Drawer for small screens */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative w-64 bg-white border-r flex flex-col justify-between min-h-screen z-50 fade-in-sidebar">
            <div>
              <div className="flex flex-col px-6 py-6 ">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-blue-700 text-2xl focus:outline-none" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                  &times;
                </button>
                <span className="text-2xl font-bold text-blue-700">ISHC</span>
                <span className="text-xs text-gray-500 font-semibold mt-1">International Students Help Center</span>
              </div>
              <nav className="mt-4">
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-blue-50 text-gray-700 text-base ${selectedSidebar === item.label ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}
                    onClick={() => { setSelectedSidebar(item.label); setSidebarOpen(false); }}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>
            <div className="px-6 py-4 border-t flex items-center gap-3">
              <FaUserCircle className="text-3xl text-gray-400" />
              <div>
                <div className="font-semibold text-gray-800">Denzel Washington</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button for mobile */}
            <button className="lg:hidden p-2 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none" onClick={() => setSidebarOpen(true)}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
         
        </header>

        {/* Responsive: Tables above cards on small screens, cards above tables on large screens */}
        <div className="flex flex-col w-full">
          {/* Tables (always rendered, but order changes with screen size) */}
          <div className="order-1 lg:order-2">
            {selectedSidebar === 'Students' && (
              <section className="px-4 lg:px-8 pt-4 pb-8">
                <div className="fade-in-up bg-white rounded-xl shadow p-6">
                  <div className="font-semibold text-lg text-gray-800 mb-4">Registered Students</div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={studentSearch}
                      onChange={e => setStudentSearch(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full max-w-xs"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 border-b">
                          <th className="py-2 px-2 text-left font-medium block lg:table-cell">
                            <span className="lg:hidden">Name & Email</span>
                            <span className="hidden lg:inline">Name</span>
                          </th>
                          <th className="py-2 px-2 text-left font-medium hidden lg:table-cell">Email</th>
                          <th className="py-2 px-2 text-left font-medium">Total Ongoing Journeys</th>
                          <th className="py-2 px-2 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student, idx) => (
                          <tr key={student.email} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2 flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2">
                              <span className="flex items-center gap-2">
                                <img src={student.img} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                                <span>{student.name}</span>
                              </span>
                              <span className="text-xs text-gray-500 block lg:hidden ml-10">{student.email}</span>
                            </td>
                            <td className="py-2 px-2 hidden lg:table-cell">{student.email}</td>
                            <td className="py-2 px-2 text-center">{student.journeys}</td>
                            <td className="py-2 px-2">
                              <select className="border rounded px-2 py-1 text-xs focus:outline-none">
                                <option value="Unblock" selected={student.status === 'Unblock'}>Unblock</option>
                                <option value="Block" selected={student.status === 'Block'}>Block</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
            {selectedSidebar === 'Experts' && (
              <section className="px-4 lg:px-8 pt-4 pb-8">
                <div className="fade-in-up bg-white rounded-xl shadow p-6">
                  <div className="font-semibold text-lg text-gray-800 mb-4">Registered Experts</div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search experts..."
                      value={expertSearch}
                      onChange={e => setExpertSearch(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full max-w-xs"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 border-b">
                          <th className="py-2 px-2 text-left font-medium block lg:table-cell">
                            <span className="lg:hidden">Name & Email</span>
                            <span className="hidden lg:inline">Name</span>
                          </th>
                          <th className="py-2 px-2 text-left font-medium hidden lg:table-cell">Email</th>
                          <th className="py-2 px-2 text-left font-medium">Total Meetings Attended</th>
                          <th className="py-2 px-2 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExperts.map((expert, idx) => (
                          <tr key={expert.email} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2 flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2">
                              <span className="flex items-center gap-2">
                                <img src={expert.img} alt={expert.name} className="w-8 h-8 rounded-full object-cover" />
                                <span>{expert.name}</span>
                              </span>
                              <span className="text-xs text-gray-500 block lg:hidden ml-10">{expert.email}</span>
                            </td>
                            <td className="py-2 px-2 hidden lg:table-cell">{expert.email}</td>
                            <td className="py-2 px-2 text-center">{expert.meetings}</td>
                            <td className="py-2 px-2">
                              <select className="border rounded px-2 py-1 text-xs focus:outline-none">
                                <option value="Unblock" selected={expert.status === 'Unblock'}>Unblock</option>
                                <option value="Block" selected={expert.status === 'Block'}>Block</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
            {selectedSidebar === 'Slider Content' && (
              <section className="px-4 lg:px-8 pt-4 pb-8">
                <div className="fade-in-up bg-white rounded-xl shadow p-6">
                  <div className="font-semibold text-lg text-gray-800 mb-4">Slider Images</div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 border-b">
                          <th className="py-2 px-2 text-left font-medium">Preview</th>
                          <th className="py-2 px-2 text-left font-medium">Image Name</th>
                          <th className="py-2 px-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[{ name: 'slider1.jpg', url: '/public/students.jpg' }, { name: 'slider2.jpg', url: '/public/students_2.jpg' }, { name: 'slider3.jpg', url: '/public/students_3.jpg' }].map((img, idx) => (
                          <tr key={img.name} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2">
                              <img src={img.url.replace('/public', '')} alt={img.name} className="w-24 h-12 object-cover rounded" />
                            </td>
                            <td className="py-2 px-2">{img.name}</td>
                            <td className="py-2 px-2">
                              <button className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600">Replace</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
            {selectedSidebar === 'Dashboard' && (
              <section className="flex flex-1 items-center justify-center px-4 pt-10 md:pt-28 pb-8">
                <div className="fade-in-up flex flex-col items-center ">
                  <div className="mb-4">
                    <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-white">ISHC</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mt-2 text-center" style={{ animationDelay: '0.3s' }}>
                    International Students Help Center
                  </div>
                </div>
              </section>
            )}
          </div>
          {/* Cards (always rendered, but order changes with screen size) */}
          <div className="order-2 lg:order-1">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-8 py-6">
              {summaryCards.map(card => (
                <div key={card.label} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{card.label}</div>
                    <div className="text-xl font-bold text-gray-800">{card.value}</div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
