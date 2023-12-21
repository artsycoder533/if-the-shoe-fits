import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'If The Shoe Fits | Privacy Policy',
  description: 'A hip sneaker boutique nestled in the heart of the Mall of America.'
}

const PrivacyPolicy = () => {
  return (
    <section className="flex flex-col align-center justify-center p-12 w-[90vw] max-w-[800px] mx-auto grow mt-12">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Privacy Policy
      </h1>

      <p className="mb-4">
        At <strong>If The Shoe Fits</strong>, we are committed to protecting
        your privacy and ensuring the security of your personal information.
        Please review our Privacy Policy below to understand how we collect,
        use, and safeguard your data.
      </p>

      <h2 className="text-xl font-semibold">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information, including but not limited to:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Contact information (such as name, email address, phone number)</li>
        <li>Shipping and billing address</li>
        <li>Payment information</li>
        <li>Order history and preferences</li>
        <li>
          Device information (such as IP address, browser, and operating system)
        </li>
        <li>Usage data (pages visited, interactions, etc.)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We may use your personal information for the following purposes:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Process and fulfill your orders</li>
        <li>
          Communicate with you about your orders, products, and promotions
        </li>
        <li>Personalize your shopping experience</li>
        <li>Improve our website and services</li>
        <li>Prevent and detect fraud or misuse</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Information Sharing</h2>
      <p className="mb-4">
        We may share your information with third parties in the following
        circumstances:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          Service providers for order fulfillment, payment processing, and
          shipping
        </li>
        <li>Marketing and advertising partners</li>
        <li>Legal authorities to comply with the law or protect our rights</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Your Choices</h2>
      <p className="mb-4">You have the right to:</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Access, correct, or delete your personal information</li>
        <li>Opt-out of marketing communications</li>
        <li>Disable cookies through your browser settings</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Security</h2>
      <p className="mb-4">
        We implement security measures to protect your personal information.
        However, no method of transmission over the internet or electronic
        storage is entirely secure.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        Changes to the Privacy Policy
      </h2>
      <p className="mb-4">
        We reserve the right to update or modify our Privacy Policy at any time.
        Please check our website for the most up-to-date information.
      </p>

      <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about our Privacy Policy, please
        contact us at{" "}
        <a href="mailto:privacy@iftheshoefits.com" className="text-blue-500">
          privacy@iftheshoefits.com
        </a>
        .
      </p>

      <p className="mt-4">
        <span className="font-semibold">If The Shoe Fits</span> reserves the
        right to update or modify this policy at any time without prior notice.
        Please check our website for the most up-to-date information.
      </p>
    </section>
  );
};

export default PrivacyPolicy;
