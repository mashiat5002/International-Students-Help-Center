'use client';


import Footer from '@/app/components/layout/Footer';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';

const features = [
  {
    title: 'Seamless Video Consultations',
    description: 'Join high-quality video meetings with experts for real-time guidance and support, no matter where you are.',
    image: '/video-room.png',
    iconBg: 'bg-purple-100',
    icon: '🤖',
  },
  {
    title: 'Collaborative Document Review',
    description: 'Share and review important documents live during your video meetings to ensure clarity and effective collaboration.',
    image: '/documents-to-be-reviewed-during-vdo-meeting.png',
    iconBg: 'bg-blue-100',
    icon: '🦾',
  },
  {
    title: 'Integrated Live Chat',
    description: 'Communicate instantly with experts and peers using the built-in chat feature, even while the video call is ongoing.',
    image: '/live-chat.png',
    iconBg: 'bg-green-100',
    icon: '💡',
  },
  {
    title: 'Clear Meeting Agendas',
    description: 'Stay focused with meeting topics and agendas displayed prominently, so everyone is on the same page.',
    image: '/meeting-topics-displayed-on-top.png',
    iconBg: 'bg-yellow-100',
    icon: '🔗',
  },
];

const sectionVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export default function Video_conference() {


  return (
    <div className="min-h-screen mt-20 bg-white flex flex-col justify-between overflow-y-hidden">
      <Navbar />
      <div>
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <h2 className="text-lg font-semibold text-gray-400 mb-2 tracking-wider">Learn About The Core Features Of</h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Video Conference Consultations Assistance in International Students Help Center</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Discover how our Video Conference features can help you learn, organize, and succeed. Each tool is designed to make your academic journey easier and more effective.</p>
        </div>
        {/* Features */}
        <div className="space-y-20 max-w-5xl mx-auto px-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center md:justify-between gap-10 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <motion.div
                className="md:w-1/2 w-full flex justify-center"
                initial={idx % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md aspect-video bg-gray-100 flex items-center justify-center">
                  <img src={feature.image} alt={feature.title} className="object-contain w-full h-full" />
                </div>
              </motion.div>
              {/* Text */}
              <motion.div
                className="md:w-1/2 w-full"
                initial={idx % 2 === 0 ? 'hiddenRight' : 'hiddenLeft'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${feature.iconBg} text-2xl mr-3`}>{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-gray-500 mb-2">{feature.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700">ISHC: The International Students Help Center represents a comprehensive solution to the challenges faced by international students.</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">By combining AI technology, expert consultation, and comprehensive resource management, we've created a platform that not only simplifies the study abroad process but also enhances the overall educational experience.</p>
        </div>
        {/* Stay in Control Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <motion.div
              className="md:w-1/2 w-full"
              initial="hiddenLeft"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h3 className="text-xl font-bold mb-4">Stay in Control of Your Academic Journey</h3>
              <ul className="list-disc pl-5 text-gray-500 space-y-2">
                <li>Request expert help anytime</li>
                <li>Book and track meetings easily</li>
                <li>Organize and join seminars</li>
                <li>Monitor your requests and progress</li>
              </ul>
            </motion.div>
            <motion.div
              className="md:w-1/2 w-full flex justify-center"
              initial="hiddenRight"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <div className=" rounded-2xl overflow-hidden  w-full max-w-md aspect-video  flex items-center justify-center">
                  <img src={"/video-room.png"} alt={"Expert Dashboard Preview"} className="object-contain  w-full h-full" />
                </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
