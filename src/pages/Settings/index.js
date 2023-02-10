import { Form, Formik, Field } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/userSlice";
import { useChangeUserInfoMutation } from "../../services/api";
import "./styles/Settings.css";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FooterIcon from "../../components/FooterIcon";

const Settings = () => {
  const { user } = useSelector(getUserData);
  const isPremiumUser = user?.roles?.includes("premiumUser");
  const [changeUserInfo, { data, isLoading, isSuccess, isError, error }] =
    useChangeUserInfoMutation();

  const handleSave = (values) => {
    const { email, first_name, last_name } = values;
    const { email: UserEmail, metadata } = user;

    if (
      email == UserEmail &&
      first_name == metadata?.first_name &&
      last_name == metadata?.last_name
    ) {
      return;
    }
    if (email == UserEmail) {
      changeUserInfo({ first_name, last_name });
    } else {
      changeUserInfo(values);
    }
  };

  const authSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string().min(1).max(12),
    last_name: Yup.string().min(1).max(12),
  });

  useEffect(() => {
    if (isSuccess) {
      const emailUpdateStatus = data?.emailUpdateStatus;
      if (emailUpdateStatus != "OK" && emailUpdateStatus != null) {
        toast.error(emailUpdateStatus, { autoClose: 5000 });
      }
      toast.success("Successfully saved changes.");
    }
    if (isError) {
      toast.error("Something went wrong.");
    }
  }, [isSuccess, isError]);

  if (user.id == null) {
    return null;
  }

  return (
    <>
      <div className="settings-container">
        <div className="card">
          <div style={{ marginTop: "1rem" }}>
            <div className="profile-container">
              {user.isEmailVerified == false && (
                <div className="email-verification-div">
                  <span>Your email is not verified.</span>
                  <Link className="link blue" to={"/auth/verify-email"}>
                    Verify It
                  </Link>
                </div>
              )}
              <Formik
                initialValues={{
                  email: user.email,
                  first_name: user?.metadata?.first_name,
                  last_name: user?.metadata?.last_name,
                }}
                validationSchema={authSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSave(values);
                }}
              >
                <Form>
                  <div className="flex-column">
                    <label>Name</label>
                    <span className="light-dark">
                      Human friendly label for you
                    </span>
                  </div>
                  <div className="name-container">
                    <Field
                      className="account-settings-input"
                      name="first_name"
                      placeholder="First Name"
                    />
                    <Field
                      className="account-settings-input"
                      name="last_name"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="flex-column">
                    <label>Email</label>
                    <span className="light-dark">
                      The address you would like to use for support
                    </span>
                  </div>
                  <Field
                    className="account-settings-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <button type="submit" className="save-btn">
                    {isLoading ? <span> Saving</span> : <span>Save</span>}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
