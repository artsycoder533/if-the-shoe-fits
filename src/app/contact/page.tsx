import { Metadata } from "next";
import Form from "@/components/Form";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return (
    <section className="flex flex-col justify-center">
      <div className="flex flex-col align-center justify-center w-[90vw] max-w-[1400px] mx-auto grow mt-16 py-12">
        <h2 className="font-bold text-4xl md:text-6xl mb-8 text-center text-purple-700">
          Contact Us
        </h2>
        <Form />
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.36493303555!2d-93.24478972245656!3d44.854865071070584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f62f6c393c612d%3A0xb3c6f1806e78286b!2sMall%20of%20America%C2%AE!5e0!3m2!1sen!2sus!4v1703119568328!5m2!1sen!2sus"
          height="300"
          width="100%"
          className="border: none"
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
