import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import MaskedInput from "react-text-mask";
// import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea"
import Paper from "@material-ui/core/Paper";
import MediaCard from "./../../components/controls/MediaCard";

const useStyles = makeStyles((theme) => ({
  input: { margin: theme.spacing(3) },
}));

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
  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props;

  const noAmopu = (s) => {
    if (s.includes("a")) return "First word leter 'a' not allowed";
    else if (s.includes("m")) return "First word leter 'm' not allowed";
    else if (s.includes("o")) return "First word leter 'o' not allowed";
    else if (s.includes("p")) return "First word leter 'p' not allowed";
    else if (s.includes("u")) return "First word leter 'u' not allowed";
    else return "";
  };

  const val3 = (s) => {
    if (s.includes("a")) return "Third word leter 'a' not allowed";
    else if (s.includes("m")) return "Third word leter 'm' not allowed";
    else if (s.includes("o")) return "Third word leter 'o' not allowed";
    else if (s.includes("p")) return "Third word leter 'p' not allowed";
    else if (!/\d/.test(s)) return "Third word needs to have a number ";
    else return "";
  };

  const validateName = (name) => {
    if (name.length < 15) return "name required";
    else {
      const namesArray = name.trim().split(" ");
      if (namesArray.length !== 4) return "name: 4 words";
      else if (
        namesArray.filter((n) => !(n.length > 2 && n.length < 6)).length > 0
      )
        return "name: 4 words each one with 3 to 5 chars each";
      else {
        const result = noAmopu(namesArray[0]);
        if (result.length > 0) return result;
        else if (!/[asdfghjklopuytem]/.test(namesArray[1]))
          return " second word leters only in 'a,s,d,f,g,h,j,k,l,o,p,u,y,t,e and m' are allowed";
        else {
          const rslt = val3(namesArray[2]);
          if (rslt.length > 0) return rslt;
          else if (!namesArray[3].includes("t"))
            return 'fourth word needs to have a t ';
          else return "";
        }
      }
    }
  };

  const validateAge = (age) => {
    debugger
    console.log('age',age)
    const nAge = parseInt(age);
    if (isNaN(nAge)) return "age required";
    else {
      console.log("nAge", nAge);
      if (nAge < 18 || nAge > 45) {
        return "age between 18 to 45";
      } else {
        if (25 < nAge && nAge < 30) console.log("reloc false", nAge);
        return "";
      }
    }
  };

  const validatePhone = (phone) => {
    console.log(phone, phone.length);
    if (!/^[0-9]*$/.test(phone) || phone.length !== 10) {
      return "phone required";
    } else return "";
  };

  const validateEmail = (email) => {
    return /[\w.+-]{4,20}@[^.\-_+]{5,10}.[^.\-_+]{2,3}/.test(email)
      ? ""
      : "Email is not valid.";
  };

  const validate = (fieldValues = values) => {
    console.log(fieldValues);
    let temp = { ...errors };
    if ("name" in fieldValues) temp.name = validateName(values.name);
    if ("email" in fieldValues) temp.email = validateEmail(values.email);
    if ("phone" in fieldValues) temp.phone = validatePhone(values.phone);
    if ("age" in fieldValues) temp.age = validateAge(values.age);
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

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
  }, [recordForEdit, setValues]);

  const PhoneInput = ({ inputRef, ...props }) => (
    <MaskedInput
      {...props}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      // mask={['+',/\d/,' ','(', /[1-9]/, /\d/, /\d/,')',
      //   ' ', /\d/, /\d/,' ',/\d/,/\d/,' ',/\d/,/\d/,]}
      // placeholderChar={'\u2000'}
    />
  );


  return (
    <div>
      <Paper>
        <Card className={classes.media}>
          <CardActionArea>
            <MediaCard email={values.email} />
          </CardActionArea>
        </Card>
      </Paper>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="phone"
              name="phone"
              value={values.phone}
              onChange={handleInputChange}
              type='phone'
              //  error={errors.phone}
              //  InputProps={{ inputComponent: PhoneInput }}
              // className={classes.input}
            />
            <Controls.Input
              label="Age"
              name="age"
              value={values.age}
              onChange={handleInputChange}
              type='number'
              required='true'
            />
            <Controls.Checkbox
              name="relocation"
              label="Relocation"
              value={values.relocation}
              onChange={handleInputChange}
              disabled="true"
            />
            <div>
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}
