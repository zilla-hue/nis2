'use client'; // Add this at the top of the file

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button'; // Add this import
import { ArrowLeft } from 'lucide-react'; // Add this import
import { useNavigate } from 'react-router-dom'; // Add this import

export default function PrivacyPolicy() {
  const navigate = useNavigate(); // Add this line

  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Add the back button */}
      <Button variant="ghost" className="mb-4" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  Welcome to our Privacy Policy. Your privacy is critically
                  important to us. This Privacy Policy document contains types
                  of information that is collected and recorded by our website
                  and how we use it.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  2. Information We Collect
                </h2>
                <p>
                  We collect several different types of information for various
                  purposes to provide and improve our Service to you.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="personal-data">
                    <AccordionTrigger>Personal Data</AccordionTrigger>
                    <AccordionContent>
                      While using our Service, we may ask you to provide us with
                      certain personally identifiable information that can be
                      used to contact or identify you. Personally identifiable
                      information may include, but is not limited to:
                      <ul className="list-disc list-inside ml-4 mt-2">
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Phone number</li>
                        <li>Address, State, Province, ZIP/Postal code, City</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="usage-data">
                    <AccordionTrigger>Usage Data</AccordionTrigger>
                    <AccordionContent>
                      We may also collect information on how the Service is
                      accessed and used (&quot;Usage Data&quot;). This Usage
                      Data may include information such as your computer&apos;s
                      Internet Protocol address (e.g. IP address), browser type,
                      browser version, the pages of our Service that you visit,
                      the time and date of your visit, the time spent on those
                      pages, unique device identifiers and other diagnostic
                      data.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  3. How We Use Your Information
                </h2>
                <p>We use the collected data for various purposes:</p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>
                    To allow you to participate in interactive features of our
                    Service when you choose to do so
                  </li>
                  <li>To provide customer support</li>
                  <li>
                    To gather analysis or valuable information so that we can
                    improve our Service
                  </li>
                  <li>To monitor the usage of our Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
                <p>
                  The security of your data is important to us but remember that
                  no method of transmission over the Internet or method of
                  electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your Personal Data,
                  we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  5. Third-Party Services
                </h2>
                <p>
                  We may employ third party companies and individuals to
                  facilitate our Service (&quot;Service Providers&quot;),
                  provide the Service on our behalf, perform Service-related
                  services or assist us in analyzing how our Service is used.
                  These third parties have access to your Personal Data only to
                  perform these tasks on our behalf and are obligated not to
                  disclose or use it for any other purpose.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  6. Children&apos;s Privacy
                </h2>
                <p>
                  Our Service does not address anyone under the age of 18
                  (&quot;Children&quot;). We do not knowingly collect personally
                  identifiable information from anyone under the age of 18. If
                  you are a parent or guardian and you are aware that your Child
                  has provided us with Personal Data, please contact us. If we
                  become aware that we have collected Personal Data from
                  children without verification of parental consent, we take
                  steps to remove that information from our servers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  7. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page. We will let you know via email and/or a prominent
                  notice on our Service, prior to the change becoming effective
                  and update the &quot;effective date&quot; at the top of this
                  Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  8. Your Data Protection Rights
                </h2>
                <p>
                  Depending on your location and applicable laws, you may have
                  certain rights regarding your personal data:
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="access">
                    <AccordionTrigger>The right to access</AccordionTrigger>
                    <AccordionContent>
                      You have the right to request copies of your personal data
                      from us.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rectification">
                    <AccordionTrigger>
                      The right to rectification
                    </AccordionTrigger>
                    <AccordionContent>
                      You have the right to request that we correct any
                      information you believe is inaccurate. You also have the
                      right to request that we complete information you believe
                      is incomplete.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="erasure">
                    <AccordionTrigger>The right to erasure</AccordionTrigger>
                    <AccordionContent>
                      You have the right to request that we erase your personal
                      data, under certain conditions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="restrict-processing">
                    <AccordionTrigger>
                      The right to restrict processing
                    </AccordionTrigger>
                    <AccordionContent>
                      You have the right to request that we restrict the
                      processing of your personal data, under certain
                      conditions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="object-processing">
                    <AccordionTrigger>
                      The right to object to processing
                    </AccordionTrigger>
                    <AccordionContent>
                      You have the right to object to our processing of your
                      personal data, under certain conditions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="data-portability">
                    <AccordionTrigger>
                      The right to data portability
                    </AccordionTrigger>
                    <AccordionContent>
                      You have the right to request that we transfer the data
                      that we have collected to another organization, or
                      directly to you, under certain conditions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>By email: privacy@example.com</li>
                  <li>
                    By visiting this page on our website:
                    www.example.com/contact
                  </li>
                  <li>By phone number: +1 234 567 8900</li>
                  <li>
                    By mail: 123 Privacy Street, Anytown, ST 12345, Country
                  </li>
                </ul>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
