"use client"
import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaSlidersH, FaChartBar, FaUserCircle, FaCog, FaEdit, FaTrash, FaDollarSign, FaUsers, FaCheck } from 'react-icons/fa';
import { call_fetch_students_for_admin } from '../../../lib/auth/fetch_students_for_admin';
import { call_fetch_experts_for_admin } from '../../../lib/auth/fetch_experts_for_admin';
import { call_update_student_block_status } from '../../../lib/auth/update_student_block_status';
import { call_update_expert_block_status } from '../../../lib/auth/update_expert_block_status';

import { call_update_slider_image } from '../../../lib/auth/update_slider_image';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { call_fetch_admin_logged_id_info } from '../../../lib/auth/fetch_admin_logged_id_info';
import { call_fetch_slider_images } from '../(utils)/call_fetch_slider_images/call_fetch_slider_images';

export default function AdminDashboard() {
  const [selectedSidebar, setSelectedSidebar] = useState('Dashboard');
  const [studentSearch, setStudentSearch] = useState('');
  const [expertSearch, setExpertSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Use state for students, experts, and slider images data
  const [students, setStudents] = useState<Array<{ name: string; img: string; email: string; journeys: number; status: string }>>([]);
  const [experts, setExperts] = useState<Array<{ name: string; img: string; email: string; meetings: number; status: string }>>([]);
  const [sliderImages, setSliderImages] = useState<Array<{ img: string; img_name: string ; _id: string}>>([]);
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const [totalExperts, setTotalExperts] = useState<number | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [details, setDetails] = useState({
      email: '',
      full_name: '',
      img: ''
    });
  // Place summaryCards after totalStudents and totalExperts are defined
  const summaryCards = [
    { icon: <FaUserGraduate size={24} />, label: 'Total Students', value: dataLoading ? '' : totalStudents ?? '' },
    { icon: <FaChalkboardTeacher size={24} />, label: 'Total Experts', value: dataLoading ? '' : totalExperts ?? '' },
    { icon: <FaDollarSign size={24} />, label: 'Revenue', value: '$50,000' },
    { icon: <FaUsers size={24} />, label: 'Total clients', value: dataLoading ? '' : (totalStudents !== null && totalExperts !== null ? totalStudents + totalExperts : '') },
  ];

  const sidebarItems = [
    { icon: <FaChartBar />, label: 'Dashboard' },
    { icon: <FaUserGraduate />, label: 'Students' },
    { icon: <FaChalkboardTeacher />, label: 'Experts' },
    { icon: <FaSlidersH />, label: 'Slider Content' },
  ];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await call_fetch_admin_logged_id_info()
            console.log(response)
            setDetails(response.data[0]);
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }
     ,[])
  useEffect(() => {
    const func = async () => {
      setDataLoading(true);
      const students_data = await call_fetch_students_for_admin();
      setStudents(students_data.data);
      setTotalStudents(students_data.data?.length || 0);

      const experts_data = await call_fetch_experts_for_admin();
      setExperts(experts_data.data);
      setTotalExperts(experts_data.data?.length || 0);



      const slider_images = await call_fetch_slider_images();
      
      setSliderImages(slider_images.data);
      setDataLoading(false);
    };
    func();
  }, []);

  const filteredStudents = students?.filter(s =>
    (s?.name || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s?.journeys.toString() || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s?.status.toString() || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s?.email || '').toLowerCase().includes(studentSearch.toLowerCase())
  );
  const filteredExperts = experts?.filter(e =>
    (e?.name || '').toLowerCase().includes(expertSearch.toLowerCase()) ||
    (e?.meetings.toString() || '').toLowerCase().includes(expertSearch.toLowerCase()) ||
    (e?.status || '').toLowerCase().includes(expertSearch.toLowerCase()) ||
    (e?.email || '').toLowerCase().includes(expertSearch.toLowerCase())
  );

  // Handler for student status change
  const handleStudentStatusChange = async(index: number, newStatus: string) => {
    setStudents(prev => prev.map((student, i) => i === index ? { ...student, status: newStatus } : student));
    const res = await call_update_student_block_status(students[index].email, newStatus);
    if (res.res === 'successfully updated details') {
      setToastMessage('Student status updated successfully!');
      setTimeout(() => setToastMessage(null), 5000);
    }else{
      setToastMessage('Could not update!');
      setTimeout(() => setToastMessage(null), 5000);
    }
    console.log(res);
  };

  // Handler for expert status change
  const handleExpertStatusChange = async(index: number, newStatus: string) => {
    setExperts(prev => prev.map((expert, i) => i === index ? { ...expert, status: newStatus } : expert));
    const res = await call_update_expert_block_status(experts[index].email, newStatus);
    if (res.res === 'successfully updated details') {
      setToastMessage('Expert status updated successfully!');
      setTimeout(() => setToastMessage(null), 5000);
    }
    else{
      setToastMessage('Could not update!');
      setTimeout(() => setToastMessage(null), 5000);
    }
    console.log(res);
  };

  // Handler for replace image
  const handleReplaceClick = (idx: number) => {
    setReplaceIndex(idx);
    fileInputRef.current?.click();
  };

  const handleSliderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (replaceIndex === null) return;
    const file = e.target.files?.[0];
    if (file) {
      const item = sliderImages[replaceIndex];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const res = await call_update_slider_image(base64String, item.img_name, item._id);
       
        if (res?.message === 'slide updated successfully') {
          setSliderImages(prev => prev.map((img, i) => i === replaceIndex ? { ...img, img: base64String } : img));
          setToastMessage('Slider image updated successfully!');
          setTimeout(() => setToastMessage(null), 5000);
        }
      };
      reader.readAsDataURL(file);
    }
    setReplaceIndex(null);
    e.target.value = '';
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fadeIn">
          {toastMessage}
        </div>
      )}
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
          {details.img!=""?
                <img
                    src={details.img}
                    // alt={profile.name}
                   className="w-10 h-10 rounded-full object-cover border-4 border-white shadow "
                  />
                :<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>}
          <div>
            <div className="font-semibold text-gray-800">{details.full_name}</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </aside>

      {/* Sidebar Drawer for small screens */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-white bg-opacity-30" onClick={() => setSidebarOpen(false)}></div>
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
               {details.img!=""?
                <img
                    src={details.img}
                    // alt={profile.name}
                   className="w-10 h-10 rounded-full object-cover border-4 border-white shadow "
                  />
                :<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>}
          <div>
            <div className="font-semibold text-gray-800">{details.full_name}</div>
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
                    {dataLoading?<LoadingSpinner/>:<table className="min-w-full text-sm">
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
                        {filteredStudents?.map((student, idx) => (
                          <tr key={student.email} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2 flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2">
                              <span className="flex items-center gap-2">
                                <img src={student.img} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                                <span>{student.name}</span>
                              </span>
                              <span
                                className="text-xs text-gray-500 block lg:hidden ml-10 truncate-email"
                                title={student.email}
                              >
                                {student.email && student.email.length > 20 ? student.email.slice(0, 20) + '...' : student.email}
                              </span>
                            </td>
                            <td className="py-2 px-2 hidden lg:table-cell">{student.email}</td>
                            <td className="py-2 px-2 text-center">{student.journeys}</td>
                            <td className="py-2 px-2">
                              <select className="border rounded px-2 py-1 text-xs focus:outline-none" onChange={e => handleStudentStatusChange(idx, e.target.value)} value={student.status}>
                                <option value="Unblocked">🔓</option>
                                <option value="Blocked">🚫</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>}
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
                    {dataLoading?<LoadingSpinner/>:<table className="min-w-full text-sm">
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
                        {filteredExperts?.map((expert, idx) => (
                          <tr key={expert.email} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2 flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2">
                              <span className="flex items-center gap-2">
                                <img src={expert.img} alt={expert.name} className="w-8 h-8 rounded-full object-cover" />
                                <span>{expert.name}</span>
                              </span>
                              <span
                                className="text-xs text-gray-500 block lg:hidden ml-10 truncate-email"
                                title={expert.email}
                              >
                                {expert.email && expert.email.length > 20 ? expert.email.slice(0, 20) + '...' : expert.email}
                              </span>
                            </td>
                            <td className="py-2 px-2 hidden lg:table-cell">{expert.email}</td>
                            <td className="py-2 px-2 text-center">{expert.meetings}</td>
                            <td className="py-2 px-2">
                              <select className="border rounded px-2 py-1 text-xs focus:outline-none" onChange={e => handleExpertStatusChange(idx, e.target.value)} value={expert.status}>
                                <option value="Unblocked">🔓</option>
                                <option value="Blocked">🚫</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>}
                  </div>
                </div>
              </section>
            )}
            {selectedSidebar === 'Slider Content' && (
              <section className="px-4 lg:px-8 pt-4 pb-8">
                <div className="fade-in-up bg-white rounded-xl shadow p-6">
                  <div className="font-semibold text-lg text-gray-800 mb-4">Slider Images</div>
                  <div className="overflow-x-auto">
                    {dataLoading?<LoadingSpinner/>:<table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 border-b">
                          <th className="py-2 px-2 text-left font-medium">Preview</th>
                          <th className="py-2 px-2 text-left font-medium">Image Name</th>
                          <th className="py-2 px-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sliderImages?.map((item, idx) => (
                          <tr key={item._id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2">
                              <img src={item.img.replace('/public', '')} alt={item.img_name} className="w-24 h-12  rounded" />
                            </td>
                            <td className="py-2 px-2">{item.img_name}</td>
                            <td className="py-2 px-2">
                              <button className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600" onClick={() => handleReplaceClick(idx)}>Replace</button>
                            </td>
                          </tr>
                        ))}
                        {/* Hidden file input for image replacement */}
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleSliderImageChange}
                        />
                      </tbody>
                    </table>}
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
                    <div className="text-xl font-bold text-gray-800">
                      <span className={dataLoading ? '' : 'fade-in-number'}>{card.value}</span>
                    </div>
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
