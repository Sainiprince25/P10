import React from 'react';

export function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-emerald-100/80">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900">1. Introduction</h2>
            <p>This Privacy Policy describes how P.S Service Provider ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services.</p>

            <h2 className="text-xl font-bold text-gray-900">2. Information We Collect</h2>
            <p>When you submit an enquiry through our website, we collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Mobile number</li>
              <li>Email address (if provided)</li>
              <li>Service requirements</li>
              <li>Property type and location</li>
              <li>Preferred date and time</li>
              <li>Additional details about your pest control needs</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to your service enquiries</li>
              <li>Provide quotations for pest control services</li>
              <li>Schedule and manage service appointments</li>
              <li>Communicate with you regarding your service</li>
              <li>Send service confirmations and updates</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900">4. Data Retention</h2>
            <p>Customer enquiry data is retained for a maximum of <strong>6 months</strong> from the date of submission. After this period, data is automatically deleted or anonymized in accordance with our data retention policy.</p>

            <h2 className="text-xl font-bold text-gray-900">5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information including secure data storage, access controls, and encrypted communications.</p>

            <h2 className="text-xl font-bold text-gray-900">6. Third-Party Sharing</h2>
            <p>We do not sell, trade, or share your personal information with third parties except as necessary to provide our services (e.g., communication via WhatsApp).</p>

            <h2 className="text-xl font-bold text-gray-900">7. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data. Contact us to exercise these rights.</p>

            <h2 className="text-xl font-bold text-gray-900">8. Contact</h2>
            <p>For privacy-related queries, contact us at our phone number or through WhatsApp.</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
              <p className="text-amber-800 text-xs"><strong>Note:</strong> This is sample privacy policy content. Final legal content must be reviewed and approved by the client before production use.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Terms & Conditions</h1>
          <p className="text-emerald-100/80">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900">1. Services</h2>
            <p>P.S Service Provider offers professional pest control services for residential and commercial properties in Delhi, Gurugram, Noida, and Faridabad. Service details, scope, and pricing are provided through individual quotations.</p>

            <h2 className="text-xl font-bold text-gray-900">2. Service Guarantee</h2>
            <p>We provide a 1-month service guarantee/warranty on our pest control treatments. If the same pest problem recurs within one month of treatment, we will provide follow-up service at no additional cost, subject to our service terms.</p>

            <h2 className="text-xl font-bold text-gray-900">3. Quotations</h2>
            <p>Quotations are provided based on inspection and assessment of the property. Final pricing may vary based on actual site conditions, property size, and severity of pest infestation.</p>

            <h2 className="text-xl font-bold text-gray-900">4. Customer Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate information about the pest problem and property</li>
              <li>Follow pre-treatment preparation instructions</li>
              <li>Ensure access to all areas requiring treatment</li>
              <li>Follow post-treatment safety guidelines</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900">5. Safety</h2>
            <p>We use government-approved products and follow safety protocols. Customers must follow all safety instructions provided by our technicians during and after treatment.</p>

            <h2 className="text-xl font-bold text-gray-900">6. Limitation of Liability</h2>
            <p>Our liability is limited to the re-treatment of the affected area within the guarantee period. We are not liable for damages resulting from customer non-compliance with safety instructions.</p>

            <h2 className="text-xl font-bold text-gray-900">7. Cancellation & Rescheduling</h2>
            <p>Services can be rescheduled with prior notice. Cancellation policies will be communicated at the time of booking.</p>

            <h2 className="text-xl font-bold text-gray-900">8. Contact</h2>
            <p>For any questions regarding these terms, please contact us through our website or phone.</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
              <p className="text-amber-800 text-xs"><strong>Note:</strong> This is sample terms & conditions content. Final legal content must be reviewed and approved by the client before production use.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
