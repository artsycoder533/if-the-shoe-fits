import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
}

const ReturnsExchanges = () => {
  return (
    <section className="flex flex-col align-center justify-center p-12 w-[90vw] max-w-[800px] mx-auto grow mt-12">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Returns and Exchanges Policy
      </h1>

      <p className="mb-4">
        At <strong>If The Shoe Fits</strong>, we value our customers and aim to
        provide an excellent shopping experience. Please review our Returns and
        Exchanges Policy below for details on returning or exchanging items.
      </p>

      <ul className="list-disc ml-6 space-y-4">
        <li>
          <strong>Eligibility for Returns and Exchanges:</strong>
          <p>
            To be eligible for a return or exchange, the item must be unused, in
            its original condition, and in the original packaging. Returns and
            exchanges are accepted within [number] days of the original purchase
            date.
          </p>
        </li>
        <li>
          <strong>Items Ineligible for Returns and Exchanges:</strong>
          <p>
            Customized or personalized items, items marked as final sale, and
            worn or damaged items not due to manufacturing defects.
          </p>
        </li>
        <li>
          <strong>How to Initiate a Return or Exchange:</strong>
          <p>
            Contact our customer service team at [customer service email/phone
            number] to initiate the return or exchange process. Provide your
            order number, the reason for the return or exchange, and any
            relevant details.
          </p>
        </li>
        <li>
          <strong>Return Shipping:</strong>
          <p>
            Customers are responsible for the cost of return shipping, unless
            the return is due to an error on our part. We recommend using a
            trackable shipping service and purchasing shipping insurance.
          </p>
        </li>
        <li>
          <strong>Exchanges:</strong>
          <p>
            If you are exchanging an item, we will ship the new item once the
            return is received and approved. Exchanges are subject to product
            availability.
          </p>
        </li>
        <li>
          <strong>Damaged or Defective Items:</strong>
          <p>
            If you receive a damaged or defective item, please contact us
            immediately. Provide photos of the damaged or defective item, and we
            will arrange for a replacement or refund.
          </p>
        </li>
        <li>
          <strong>Store Credit:</strong>
          <p>
            In some cases, store credit may be offered instead of a refund or
            exchange.
          </p>
        </li>
        <li>
          <strong>Cancellation Policy:</strong>
          <p>
            Orders can be cancelled within [number] hours of placement. Once an
            order has been processed for shipping, it cannot be cancelled.
          </p>
        </li>
        <li>
          <strong>Contact Information:</strong>
          <p>
            For any questions or concerns regarding returns and exchanges,
            please contact our customer service team at{" "}
            <a href="mailto:your-email@example.com" className="text-blue-500">
              support@iftheshoefits.com
            </a>{" "}
            or{" "}
            <span className="text-blue-500">
              (555)-555-5555
            </span>
            .
          </p>
        </li>
      </ul>

      <p className="mt-4">
        <span className="font-semibold">If The Shoe Fits</span>{" "}
        reserves the right to update or modify this policy at any time without
        prior notice. Please check our website for the most up-to-date
        information.
      </p>
    </section>
  );
};

export default ReturnsExchanges;
