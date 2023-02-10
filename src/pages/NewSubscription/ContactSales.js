import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/userSlice";
import * as Yup from "yup";
import { useContactSalesMutation } from "../../services/api";
import { toast } from "react-toastify";

const ContactSales = () => {
  const { user } = useSelector(getUserData);
  const [contactSales, { isLoading, isSuccess, isError }] =
    useContactSalesMutation();

  const contactSalesSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    full_name: Yup.string().min(1).max(12).required("Name must be included"),
    message: Yup.string().min(1).max(200).required("Message must be included"),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your message has been sent");
    }
    if (isError) {
      toast.error("Something went wrong.");
    }
  }, [isSuccess, isError]);

  const handleSend = (values) => {
    contactSales(values);
  };

  if (!user?.email) {
    return null;
  }
  return (
    <div style={{ padding: "1rem" }}>
      <Formik
        initialValues={{
          email: user.email,
          message: "",
          full_name: "",
        }}
        validationSchema={contactSalesSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSend(values);
        }}
      >
        <Form>
          <div className="flex-column">
            <label>Name</label>
          </div>
          <div className="name-container">
            <Field
              className="account-settings-input"
              name="full_name"
              placeholder="Full Name"
              style={{ width: "20rem" }}
            />
          </div>
          <div className="flex-column">
            <label>Email</label>
          </div>
          <Field
            className="account-settings-input"
            type="email"
            name="email"
            placeholder="Email"
          />
          <div className="flex-column">
            <label>Your Message</label>
          </div>
          <Field
            className="account-settings-input"
            component="textarea"
            name="message"
            style={{ height: "5rem" }}
          />
          <button type="submit" className="save-btn">
            {isLoading ? <span> Sending</span> : <span>Send</span>}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactSales;
