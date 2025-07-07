'use client';


import Footer from '@/app/components/layout/Footer';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';

const features = [
  {
    title: 'Instant AI Q&A',
    description: 'Ask any study-related question and get instant, accurate answers from our AI assistant.',
    image: '/ai-robot.png',
    iconBg: 'bg-purple-100',
    icon: '🤖',
  },
  {
    title: 'AI Robot Assistant',
    description: 'A friendly AI robot is always available to guide you through your learning journey.',
    image: '/ai-asking.png',
    iconBg: 'bg-blue-100',
    icon: '🦾',
  },
  {
    title: 'Smart Suggestions',
    description: 'Receive personalized suggestions and resources tailored to your needs.',
    image: '/ai-suggestions.png',
    iconBg: 'bg-green-100',
    icon: '💡',
  },
  {
    title: 'Application Links',
    description: 'Access all your important application links in one place, managed by AI.',
    image: '/application-links.png',
    iconBg: 'bg-yellow-100',
    icon: '🔗',
  },
  {
    title: 'Track Your Journey',
    description: 'Monitor your progress and milestones with AI-powered journey tracking.',
    image: '/journey-progress.png',
    iconBg: 'bg-pink-100',
    icon: '📈',
  },
];

const sectionVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export default function AIAssistantPage() {


  return (
    <div className="min-h-screen mt-20 bg-white flex flex-col justify-between overflow-y-hidden">
      <Navbar />
      <div>
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <h2 className="text-lg font-semibold text-gray-400 mb-2 tracking-wider">Learn About The Core Features Of</h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Assistance in International Students Help Center</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Discover how our AI features can help you learn, organize, and succeed. Each tool is designed to make your academic journey easier and more effective.</p>
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
              <h3 className="text-xl font-bold mb-4">Stay in Control of Every Order</h3>
              <ul className="list-disc pl-5 text-gray-500 space-y-2">
                <li>Instant AI Q&A</li>
                <li>AI With Contextual Understanding</li>
                <li>Smart Study Programme Suggestions</li>
                <li>Automated Application Links</li>
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
                  <img src={"full-student-dashboard.png"} alt={"Full Student Dashboard"} className="object-contain  w-full h-full" />
                </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
