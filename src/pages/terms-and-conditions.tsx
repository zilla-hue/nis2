'use client'; // Add this at the top of the file

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this import

export default function TermsAndConditions() {
  const navigate = useNavigate(); // Add this line

  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Update the back button */}
      <Button variant="ghost" className="mb-4" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Terms and Conditions
          </CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using this website, you accept and agree to
                  be bound by the terms and provision of this agreement.
                  Additionally, when using this website&apos;s particular
                  services, you shall be subject to any posted guidelines or
                  rules applicable to such services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  2. Description of Service
                </h2>
                <p>
                  The website provides users with access to a rich collection of
                  resources, including various communications tools, forums,
                  shopping services, personalized content, and branded
                  programming through its network of properties which may be
                  accessed through any various medium or device now known or
                  hereafter developed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  3. Registration Obligations
                </h2>
                <p>
                  In consideration of your use of the website, you agree to: (a)
                  provide true, accurate, current and complete information about
                  yourself as prompted by the registration form, and (b)
                  maintain and promptly update the registration data to keep it
                  true, accurate, current and complete.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  4. Privacy Policy
                </h2>
                <p>
                  Your privacy is very important to us. Accordingly, we have
                  developed this Policy in order for you to understand how we
                  collect, use, communicate and disclose and make use of
                  personal information. Please refer to our Privacy Policy for
                  more information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  5. User Account, Password, and Security
                </h2>
                <p>
                  You are responsible for maintaining the confidentiality of the
                  password and account, and are fully responsible for all
                  activities that occur under your password or account. You
                  agree to (a) immediately notify us of any unauthorized use of
                  your password or account or any other breach of security, and
                  (b) ensure that you exit from your account at the end of each
                  session.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Conduct</h2>
                <p>You agree to not use the Service to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    Upload, post, email, transmit or otherwise make available
                    any content that is unlawful, harmful, threatening, abusive,
                    harassing, tortious, defamatory, vulgar, obscene, libelous,
                    invasive of another&apos;s privacy, hateful, or racially,
                    ethnically or otherwise objectionable;
                  </li>
                  <li>
                    Impersonate any person or entity, or falsely state or
                    otherwise misrepresent your affiliation with a person or
                    entity;
                  </li>
                  <li>
                    Upload, post, email, transmit or otherwise make available
                    any content that you do not have a right to make available
                    under any law or under contractual or fiduciary
                    relationships;
                  </li>
                  <li>
                    Upload, post, email, transmit or otherwise make available
                    any content that infringes any patent, trademark, trade
                    secret, copyright or other proprietary rights of any party;
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  7. Modifications to Service
                </h2>
                <p>
                  We reserve the right at any time and from time to time to
                  modify or discontinue, temporarily or permanently, the Service
                  (or any part thereof) with or without notice. You agree that
                  we shall not be liable to you or to any third party for any
                  modification, suspension or discontinuance of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. Termination</h2>
                <p>
                  You agree that we may, under certain circumstances and without
                  prior notice, immediately terminate your account, any
                  associated email address, and access to the Service. Cause for
                  such termination shall include, but not be limited to, (a)
                  breaches or violations of the Terms or other incorporated
                  agreements or guidelines, (b) requests by law enforcement or
                  other government agencies, (c) a request by you, (d)
                  discontinuance or material modification to the Service, or (e)
                  unexpected technical or security issues or problems.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">9. Links</h2>
                <p>
                  The Service may provide, or third parties may provide, links
                  to other World Wide Web sites or resources. You acknowledge
                  and agree that we are not responsible for the availability of
                  such external sites or resources, and do not endorse and are
                  not responsible or liable for any content, advertising,
                  products or other materials on or available from such sites or
                  resources.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  10. Disclaimer of Warranties
                </h2>
                <p>You expressly understand and agree that:</p>
                <p className="mt-2">
                  Your use of the service is at your sole risk. The service is
                  provided on an &quot;as is&quot; and &quot;as available&quot;
                  basis. We expressly disclaim all warranties of any kind,
                  whether express or implied, including, but not limited to the
                  implied warranties of merchantability, fitness for a
                  particular purpose and non-infringement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  11. Limitation of Liability
                </h2>
                <p>
                  You expressly understand and agree that we shall not be liable
                  for any direct, indirect, incidental, special, consequential
                  or exemplary damages, including but not limited to, damages
                  for loss of profits, goodwill, use, data or other intangible
                  losses (even if we have been advised of the possibility of
                  such damages), resulting from: (i) the use or the inability to
                  use the service; (ii) the cost of procurement of substitute
                  goods and services resulting from any goods, data, information
                  or services purchased or obtained or messages received or
                  transactions entered into through or from the service; (iii)
                  unauthorized access to or alteration of your transmissions or
                  data; (iv) statements or conduct of any third party on the
                  service; or (v) any other matter relating to the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  12. Governing Law and Jurisdiction
                </h2>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of [Your Country/State], without regard to its
                  conflict of law provisions. Our failure to enforce any right
                  or provision of these Terms will not be considered a waiver of
                  those rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  13. Changes to Terms
                </h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material we
                  will try to provide at least 30 days notice prior to any new
                  terms taking effect. What constitutes a material change will
                  be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">14. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  at [Your Contact Information].
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
