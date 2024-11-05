import Footer from '@/components/Layout/Footer'
import Navigationbar from '@/components/Layout/NavigationBar'
import { motion } from 'framer-motion'
import {
  Bell,
  ChevronDown,
  Cookie,
  Database,
  Globe,
  Info,
  Lock,
  LockIcon,
  Share2,
  Shield,
  User,
} from 'lucide-react'
import React, { useState } from 'react'

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null)

  const sections = [
    {
      id: 1,
      title: 'Introduction',
      icon: <Info className='w-6 h-6' />,
      content: `This Privacy Policy outlines how Bisslocal ("we," "us," or "our") collects, uses, shares, and protects your personal information when you use our web application (the "Website"). By accessing or using the Website, you consent to the terms outlined in this Privacy Policy. Our priority is to protect your privacy and handle your personal information responsibly.`,
    },
    {
      id: 2,
      title: 'Information We Collect',
      icon: <Database className='w-6 h-6' />,
      content: `We may collect the following types of information:

Personal Information: This includes information you voluntarily provide, such as your name, email address, account credentials, and any information related to your use of our services, e.g., creating an account, subscribing to emails, or contacting us.

Usage Data: We automatically collect information about how you use the Website, including IP addresses, browser type, device information, pages visited, and date and time of your visits.

Cookies and Tracking Technologies: We use cookies and similar tracking technologies to collect information about your browsing activity on the Website. Cookies are small text files stored on your device that help us remember preferences, track site performance, and provide personalized content, including targeted advertisements.`,
    },
    {
      id: 3,
      title: 'Use of Information',
      icon: <User className='w-6 h-6' />,
      content: `We use the information we collect for:

Providing Services: To create and manage your account, allow you to subscribe or receive communications, and deliver core services (e.g., sending business communications on behalf of users).

Improving User Experience: To enhance our Website, customize your experience, and provide you with relevant content and advertisements based on interactions.

Advertising: We may use collected data to show personalized advertisements based on your interests and browsing behavior through third-party ad networks and partners.

Communication: To send you information about your account, updates, newsletters, and notifications if you have opted in.

Analytics: To understand how users engage with the Website and improve services.`,
    },
    {
      id: 4,
      title: 'Cookies and Consent',
      icon: <Cookie className='w-6 h-6' />,
      content: `Cookie Consent: By using our Website, you consent to the use of cookies as described in this Privacy Policy. You can manage your cookie preferences through your browser settings, though this may impact your ability to use some features of the Website.

Types of Cookies: We use both session cookies (expire when you close your browser) and persistent cookies (remain on your device until deleted).

Third-Party Cookies: We may allow third-party service providers to place cookies on the Website for collecting information about your online activity.`,
    },
    {
      id: 5,
      title: 'Sharing of Information',
      icon: <Share2 className='w-6 h-6' />,
      content: `We may share your personal information with third parties under the following circumstances:

Third-Party Service Providers: We share your information with service providers who perform services on our behalf, such as hosting, email delivery, analytics, and advertising. These providers are obligated to protect your data.

Advertising Partners: We may share non-personally identifiable information with third-party advertising networks and partners to deliver personalized ads.

Legal Compliance: We may disclose your personal information to law enforcement or government authorities if required by law, regulation, or legal process.

Business Transfers: If involved in a merger, acquisition, or asset sale, your personal information may be transferred as part of that transaction.`,
    },
    {
      id: 6,
      title: 'International Data Transfers',
      icon: <Globe className='w-6 h-6' />,
      content: `Your information may be transferred to and processed in countries outside your country of residence. By using the Website, you consent to the transfer of your information to countries with different data protection standards than your own.`,
    },
    {
      id: 7,
      title: 'Data Retention & Security',
      icon: <LockIcon className='w-6 h-6' />,
      content: `Data Retention: We retain your personal information as long as necessary to provide our services or as required by law. We will securely delete or anonymize your information when it is no longer needed.

Security of Information: We implement technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.`,
    },
    {
      id: 8,
      title: 'Your Rights',
      icon: <Bell className='w-6 h-6' />,
      content: `You have the following rights regarding your personal information:

Access and Correction: You can request access to or correction of your personal information by contacting us.

Opt-Out of Marketing: If you no longer wish to receive marketing communications, you can opt-out by following the instructions in the emails or contacting us.

Cookie Preferences: You can control your cookie preferences through browser settings.

Data Deletion: You can request the deletion of your personal information from our systems, subject to certain legal or operational restrictions.`,
    },
  ]

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  return (
    <>
      <Navigationbar />
      <div className='min-h-screen bg-[#141414] text-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-4xl mx-auto'
        >
          <div className='text-center mb-16'>
            <div className='flex justify-center mb-6'>
              <Shield className='w-16 h-16 text-blue-500' />
            </div>
            <h1 className='text-4xl font-bold mb-4'>Privacy Policy</h1>
            <p className='text-gray-400 max-w-2xl mx-auto'>
              We take your privacy seriously. This policy outlines how we
              collect, use, and protect your personal information.
            </p>
          </div>

          <div className='space-y-6'>
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className='bg-gray-900 rounded-lg overflow-hidden'
                initial={false}
                animate={{
                  height: expandedSection === section.id ? 'auto' : '76px',
                }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className='w-full px-6 py-5 flex items-center justify-between hover:bg-gray-800 transition-colors duration-200'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='text-blue-500'>{section.icon}</div>
                    <h3 className='text-lg font-semibold'>{section.title}</h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedSection === section.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className='w-5 h-5 text-gray-400' />
                  </motion.div>
                </button>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: expandedSection === section.id ? 1 : 0,
                    height: expandedSection === section.id ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className='px-6 pb-5'
                >
                  <div className='prose prose-invert max-w-none'>
                    {section.content.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className='mb-4 text-gray-400 leading-relaxed'
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-16 text-center text-gray-400'
          >
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <Lock className='w-5 h-5 text-blue-500' />
              <span>Your data is secure with us</span>
            </div>
            <p className='text-sm'>
              For any questions regarding our privacy policy, please contact us
              at{' '}
              <a
                href='mailto:admin@bisslocal.com'
                className='text-blue-500 hover:text-blue-400 transition-colors duration-200'
              >
                admin@bisslocal.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy
