"use client"
import { useForm } from "@formspree/react";
import { useState, ChangeEvent, useEffect } from "react";

interface FormData {
    name: string;
    email: string;
    message: string;
  }

const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
      });
      const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM as string);
      const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
    
      useEffect(() => {
        if (state.succeeded) {
          setFormData({
            name: "",
            email: "",
            message: "",
          });
    
          setSubmissionSuccess(true);
    
          setTimeout(() => {
            setSubmissionSuccess(false);
          }, 5000);
        }
      }, [state.succeeded]);
    
      const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

  return (
    <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 max-w-[600px] w-[90vw] mx-auto"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-purple-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 rounded bg-purple-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-purple-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded bg-purple-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-purple-700">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={8}
              value={formData.message}
              onChange={handleChange}
              className="p-2 rounded bg-purple-200"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-4 bg-purple-700 text-white text-center self-end rounded-md hover:bg-purple-900"
          >
            Send Message
          </button>
          {submissionSuccess && (
            <div className="bg-green-200 p-3 rounded-md mb-4">
              Your message has been sent! We will be in touch with you shortly!
            </div>
          )}
        </form>
  )
}

export default Form