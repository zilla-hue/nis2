'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import { colors } from '../components/colors';
import FooterSection from '@/components/sections/footer-section';
import HeaderSection from '@/components/sections/header-section';
import { useTheme } from '@/context/theme-context/ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FeedbackForm from '@/components/feedback-form';

const ContactUs: React.FC = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-b from-amber-50 to-white'
      }`}
    >
      <HeaderSection />
      <div className="container mx-auto px-4 py-12 mt-20">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{
            color:
              theme === 'dark'
                ? colors.dark.primary.main
                : colors.light.primary.main,
          }}
        >
          Get in Touch
        </h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          We&apos;d love to hear from you! Whether you have a question,
          feedback, or just want to say hello, don&apos;t hesitate to reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card
            className={`p-8 shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`${
                      theme === 'dark' ? 'bg-gray-700 text-white' : ''
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`${
                      theme === 'dark' ? 'bg-gray-700 text-white' : ''
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <Select onValueChange={setSendTo} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Send To" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info@ndiigbosunderland.org">
                        info@ndiigbosunderland.org
                      </SelectItem>
                      <SelectItem value="finance@ndiigbosunderland.org">
                        finance@ndiigbosunderland.org
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className={`${
                      theme === 'dark' ? 'bg-gray-700 text-white' : ''
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className={`${
                      theme === 'dark' ? 'bg-gray-700 text-white' : ''
                    } focus:ring-2 focus:ring-blue-500`}
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full transition duration-300 ease-in-out transform hover:scale-105"
                  style={{
                    backgroundColor:
                      theme === 'dark'
                        ? colors.dark.accent
                        : colors.light.accent,
                    color:
                      theme === 'dark'
                        ? colors.dark.secondary.main
                        : colors.light.secondary.main,
                  }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card
              className={`p-6 shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold mb-4">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone
                      className="w-6 h-6 mr-4"
                      style={{ color: colors.light.accent }}
                    />
                    <span>
                      <p>+44 7484 000 000</p>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail
                      className="w-6 h-6 mr-4"
                      style={{ color: colors.light.accent }}
                    />
                    <span>info@ndiigbosunderland.org</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin
                      className="w-6 h-6 mr-4"
                      style={{ color: colors.light.accent }}
                    />
                    <div>
                      <p>
                        <strong>Official Address:</strong>
                        16 Peel Street Sunderland SR2 8ED
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`p-6 shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <CardHeader>
                <CardTitle
                  className="text-2xl font-semibold flex items-center"
                  style={{
                    color:
                      theme === 'dark'
                        ? colors.dark.primary.main
                        : colors.light.primary.main,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  Leave a Suggestion or Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`mb-6 text-lg ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Effective feedback, both positive and negative is important to
                  us as it helps us make important decisions about the things we
                  do. If you have suggestions, comments or feedback please let
                  us know by using our online feedback form.
                </p>
                <Button
                  className="w-full transition-colors duration-300 hover:opacity-90"
                  onClick={() => setIsFeedbackOpen(true)}
                  style={{
                    backgroundColor:
                      theme === 'dark'
                        ? colors.dark.primary.main
                        : colors.light.primary.main,
                    color:
                      theme === 'dark'
                        ? colors.dark.neutral.white
                        : colors.light.neutral.white,
                  }}
                >
                  Online Feedback Form
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card
          className={`shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-semibold mb-4">
              <MapPin className="w-6 h-6 mr-2" />
              Find Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2290.1741951128707!2d-1.3833812839614437!3d54.90603998033615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e66b2e1f0b9d5%3A0x5f2c7a4c4e4e4e4e!2s16%20Peel%20St%2C%20Sunderland%20SR2%208ED%2C%20UK!5e0!3m2!1sen!2sus!4v1621234567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
      <FeedbackForm
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
};

export default ContactUs;
