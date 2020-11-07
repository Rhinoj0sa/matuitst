import React, {
  useState,
  useEffect
} from "react";
import {
  Grid
} from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import {
  useForm,
  Form
} from "../../components/useForm";
import * as userService from "../../services/userService";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  TerrainSharp
} from "@material-ui/icons";

// const initialFValues = userService.randomUserFields()

const initialFValues = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "male",
  relocation: false,
};

export default function UsersForm(props) {
  const {
    addOrEdit,
    recordForEdit
  } = props;

  const validateName = (name) => {
    const namesArray = name.trim().split(" ");
    if (name === "") {
      return "This field is required";
    } else if (namesArray.length !== 4) {
      return "Names with four words only!";
    } else if (namesArray[0].length < 3 || namesArray[0] > 5) {
      return "First word needs to have between 3 and 5 letters";
    } else if (!/[^amopu]/.test(namesArray[0])) {
      return " First word leters 'a','m','o','p' and 'u' are not allowed";
    } else if (namesArray[1].length < 3 || namesArray[1] > 5) {
      return "Second word needs to have between 3 and 5 letters";
    } else if (!/[asdfghjklopuytem]/.test(namesArray[1])) {
      return " second word leters only in 'a,s,d,f,g,h,j,k,l,o,p,u,y,t,e and m' are allowed";
    } else if (namesArray[2].length < 3 || namesArray[2] > 5) {
      return "third word needs to have between 3 and 5 letters";
    } else if (!/[^aeou]\d+/.test(namesArray[2])) {
      return "third word needs at least 1 number and not 'a','e','o','u' ";
    } else if (namesArray[3].length < 3 || namesArray[3] > 5) {
      return "fourth word needs to have between 3 and 5 letters";
    } else if (!/t/.test(namesArray[3])) {
      return 'fourth word needs to have a "t"';
    } else return "";

  };



  const validateAge = (age) => {
    const nAge = parseInt(age)
    if (!/^[0-9]*$/.test(age) || age.length < 1) {
      return 'age required'
    } else if (nAge < 18 || nAge > 45) {
      return 'age between 18 to 45'
    } else{
      if (24 < nAge < 31)  //(nAge>25 && nAge<30)
       values.relocation=false
       console.log('reloc false',nAge)
      return ''
    }
  }

  const validatePhone = (phone) => {
    const nAge = parseInt(phone)
    if (!/^[0-9]*$/.test(phone) || phone.length !== 10 || isNaN(nAge)) {
      return 'phone required'
    }
    else return ''
  }

  const validateEmail =(email) =>{
    return /[\w.+-]{4,20}@[^.\-_+]{5,10}.[^.\-_+]{2,3}/.test(email) ?  "" :
    "Email is not valid.";
  }
 
    const validate = (fieldValues = values) => {
      console.log(fieldValues);
      let temp = {...errors,};
      if ("name" in fieldValues)
        temp.name = validateName(values.name);
      if ("email" in fieldValues)
        temp.email = validateEmail(values.email);
      if ("phone" in fieldValues)
        temp.phone =validatePhone(values.phone);
      if ("age" in fieldValues) 
        temp.age = validateAge(values.age);
      setErrors({
         ...temp,
      });
        if (fieldValues == values) 
          return Object.values(temp).every((x) => x == "");
    }

      const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
      } = useForm(initialFValues, true, validate);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      };

      useEffect(() => {
        if (recordForEdit != null)
          setValues({
            ...recordForEdit,
          });
      }, [recordForEdit]);


      // const TextMaskCustom = (props) => {
      //   const { inputRef, ...other } = props;
      
      //   return (
      //     <MaskedInput
      //       {...other}
      //       ref={(ref) => {
      //         inputRef(ref ? ref.inputElement : null);
      //       }}
      //       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      //       placeholderChar={'\u2000'}
      //       showMask
      //     />
      //   );
      // }


      return (
        <div>
          <PageHeader
            title="New Employee"
            subTitle="Form design with validation"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />{" "}
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />{" "}
                <Controls.Input
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />{" "}
              </Grid>{" "}
              <Grid item xs={6}>
              
                <Controls.Input
                 label="phone"
                 name="phone"
                 value={values.phone}
                 onChange={handleInputChange}
                 error={errors.phone}

                />{" "}
                <Controls.Input
                  label="Age"
                  name="age"
                  value={values.age}
                  onChange={handleInputChange}
                />{" "}
                <Controls.Checkbox
                  name="relocation"
                  label="Relocation"
                  value={values.relocation}
                  onChange={handleInputChange}
                />{" "}
                <div>
                  <Controls.Button type="submit" text="Submit" />
                  <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={resetForm}
                  />{" "}
                </div>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Form>{" "}
        </div>
      );
      }