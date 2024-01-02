import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Refund Policy',
}

const RefundPolicy = () => {
  return (
    <section className="flex flex-col align-center justify-center p-12 w-[90vw] max-w-[800px] mx-auto grow mt-12">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Refund Policy
      </h1>

      <p className="mb-4">
        At <strong>Your Sneaker Store</strong>, we want you to be satisfied with your purchase. Please review our Refund Policy below for details on refunding items.
      </p>

      <ul className="list-disc ml-6 space-y-4">
        <li>
          <strong>Eligibility for Refunds:</strong>
          <p>
            To be eligible for a refund, the item must be unused, in
            its original condition, and in the original packaging. Refunds are eligible with 30 days of the original purchase date.
          </p>
        </li>
        <li>
          <strong>Items Ineligible for Refunds:</strong>
          <p>
            Customized or personalized items, items marked as final sale, and
            worn or damaged items not due to manufacturing defects.
          </p>
        </li>
        <li>
          <strong>How to Request a Refund:</strong>
          <p>
            Contact our customer service team at{" "}
            <a href="mailto:support@iftheshoefits.com" className="text-blue-500">
              support@iftheshoefits.com
            </a>{" "}
            or{" "}
            <span className="text-blue-500">
              (555)-555-5555
            </span>{" "}
            to initiate the refund process. Provide your
            order number, the reason for the refund, and any
            relevant details.
          </p>
        </li>
        <li>
          <strong>Refund Process:</strong>
          <p>
            Once your refund request is received and approved, refunds will
            be processed to the original method of payment within 3-5
            business days.
          </p>
        </li>
        <li>
          <strong>Refund Amount:</strong>
          <p>
            The refund amount will be the purchase price of the item minus any applicable fees or charges.
          </p>
        </li>
        <li>
          <strong>Cancelled Orders:</strong>
          <p>
            Orders can be cancelled within [number] hours of placement. Once an
            order has been processed for shipping, it cannot be cancelled.
          </p>
        </li>
        <li>
          <strong>Contact Information:</strong>
          <p>
            For any questions or concerns regarding refunds,
            please contact our customer service team at{" "}
            <a href="mailto:support@iftheshoefits.com" className="text-blue-500">
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

export default RefundPolicy;
