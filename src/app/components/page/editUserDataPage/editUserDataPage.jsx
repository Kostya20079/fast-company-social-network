import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import { validator } from "../../../utils/validator";

const EditUserDataPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setLoading] = useState(false); // state for loading status
  const [data, setData] = useState({
    name: "",
    email: "",
    sex: "male",
    profession: "",
    qualities: [],
  });
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const qualitiesTransform = (data) => {
    // transforming data for SelectField
    return data.map((qual) => ({
      value: qual._id,
      label: qual.name,
    }));
  };
  const getProfessionById = (id) => {
    // checking and sending chose profession
    for (const prof in professions) {
      if (professions[prof]._id === id) {
        return professions[prof];
      }
    }
  };
  const getQualities = (elements) => {
    // checking and sending chose qualities
    const qualitiesArray = [];
    for (const elem in elements) {
      for (const qual in qualities) {
        if (elements[elem].value === qualities[qual]._id) {
          qualitiesArray.push(qualities[qual]);
        }
      }
    }
    return qualitiesArray;
  };
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = validate();
    if (!isValid) return; // if here is not any problems in form
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        // sending data to local storage
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then(() => navigate(-1)); // return to user's page
  };
  const validatorConfig = {
    //validation config
    name: {
      isRequired: { message: "Please enter a name" },
    },
    email: {
      isRequired: { message: "Please enter a valid email" },
      isEmail: { message: "Email entered incorrectly" },
    },
    profession: {
      isRequired: { message: "Please enter profession" },
    },
  };

  useEffect(() => {
    // getting data from local storage
    setLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) => {
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: qualitiesTransform(qualities),
        profession: profession._id,
      }));
    });
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  useEffect(() => {
    if (data._id) setLoading(false);
  }, [data]);
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  let isValid = Object.keys(errors).length === 0;
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="User's name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="User's email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="User's profession"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                options={professions}
                error={errors.profession}
              />
              <RadioField
                label="Choose gender"
                name="sex"
                value={data.sex}
                onChange={handleChange}
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
              />
              <MultiSelectField
                label="User's qualities"
                name="qualities"
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Save changes
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center" }}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserDataPage;
