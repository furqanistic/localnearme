import Footer from '@/components/Layout/Footer'
import Navigationbar from '@/components/Layout/NavigationBar'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  Database,
  FileText,
  Gavel,
  Link,
  MessageSquare,
  Scale,
  Shield,
  UserCheck,
} from 'lucide-react'
import React, { useState } from 'react'

const TermsOfUse = () => {
  const [expandedSection, setExpandedSection] = useState(null)

  const sections = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      icon: <Check className='w-6 h-6' />,
      content: `By creating an account, accessing, or using Bisslocal, you accept these Terms, as well as our Privacy Policy. You affirm that you are at least 18 years old and legally capable of entering into these Terms.`,
    },
    {
      id: 2,
      title: 'Account Registration and Security',
      icon: <UserCheck className='w-6 h-6' />,
      content: `Registration: To access certain features, you may be required to create an account. You agree to provide accurate and complete information during registration and to keep your account information current.

Account Security: You are responsible for maintaining the confidentiality of your account credentials. Any activity on your account will be your responsibility, and you agree to notify us immediately if you suspect any unauthorized access.

Account Termination: We reserve the right to suspend or terminate your account at our sole discretion if we believe you have violated these Terms.`,
    },
    {
      id: 3,
      title: 'Use of the Services',
      icon: <FileText className='w-6 h-6' />,
      content: `Permitted Use: You agree to use Bisslocal only for lawful purposes and in accordance with these Terms. You may not use our services to conduct any activity that is unlawful, harmful, or disruptive.

User-Generated Content: Users are responsible for all content, including text, images, logos, and promotions they create and distribute through Bisslocal. You agree that:
- All content you post or send complies with applicable laws and is moral and ethical.
- You own or have rights to all intellectual property used, including images and logos.
- You will be solely responsible for any content that violates laws or rights of others.

Disclaimer: We do not monitor or endorse user content, and Bisslocal is not liable for any content created or distributed by users. Any complaints or legal actions stemming from user-generated content will be directed to the user responsible, not Bisslocal.`,
    },
    {
      id: 4,
      title: 'Intellectual Property',
      icon: <Shield className='w-6 h-6' />,
      content: `Ownership: All intellectual property rights on Bisslocal, including but not limited to text, graphics, logos, and software, are owned by us or our licensors.

Limited License: You are granted a limited, revocable, non-transferable, non-exclusive license to access and use Bisslocal for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from our content without our prior written consent.

Trademarks: Bisslocal and associated logos are trademarks of Bisslocal. You agree not to use our trademarks without prior permission.`,
    },
    {
      id: 5,
      title: 'Data Privacy',
      icon: <Database className='w-6 h-6' />,
      content: `Privacy Policy: Your use of Bisslocal is subject to our Privacy Policy, which outlines how we collect, use, and store personal information. By using our services, you consent to the practices described in the Privacy Policy.

Communications: By creating an account, you consent to receiving communications from us, including newsletters, notifications, and other messages. You can opt-out of marketing communications at any time.`,
    },
    {
      id: 6,
      title: 'Limitation of Liability',
      icon: <AlertCircle className='w-6 h-6' />,
      content: `No Warranty: Bisslocal is provided "as is" and "as available," without warranties of any kind, either express or implied. We do not guarantee that the service will be error-free, secure, or uninterrupted.

Limitation of Damages: To the fullest extent permitted by law, Bisslocal shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our services, even if we were advised of the possibility of such damages.`,
    },
    {
      id: 7,
      title: 'Digital Flyer Use',
      icon: <MessageSquare className='w-6 h-6' />,
      content: `We are not to be held responsible or liable for any emails, digital flyer, newsletter, or promotions that you create and send to users. We are also not liable or responsible for any damages that your emails, digital flyers, newsletters, or promotions may cause. 

All of your emails, newsletters, promotions, or digital flyers should be moral, ethical, and in accordance with the laws of where your business is and to the laws in which you are sending to. 

Should we receive any communication with law enforcement regarding an email, digital flyer, newsletter, promotions or from any form of communication about your usage on Bisslocal, we will comply and send all relevant information that we can, and you will be held directly responsible for all legal fees, and punishments that may incur.`,
    },
    {
      id: 8,
      title: 'Third-Party Links',
      icon: <Link className='w-6 h-6' />,
      content: `Bisslocal may contain links to third-party websites or services. We are not responsible for the content or privacy practices of these third-party sites, and you access them at your own risk.`,
    },
    {
      id: 9,
      title: 'Governing Law',
      icon: <Gavel className='w-6 h-6' />,
      content: `These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or related to these Terms shall be resolved exclusively in the courts of [Your Jurisdiction].`,
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
              <Scale className='w-16 h-16 text-blue-500' />
            </div>
            <h1 className='text-4xl font-bold mb-4'>Terms of Use</h1>
            <p className='text-gray-400 max-w-2xl mx-auto'>
              Please read these terms carefully before using our services. By
              using Bisslocal, you agree to be bound by these terms.
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
              <BookOpen className='w-5 h-5 text-blue-500' />
              <span>Last updated: November 5, 2024</span>
            </div>
            <p className='text-sm'>
              For any questions regarding our terms, please contact us at{' '}
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

export default TermsOfUse
