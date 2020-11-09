import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import MaskedInput from "react-text-mask";
// import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import MediaCard from "./../../components/controls/MediaCard";
import * as userService from "../../services/userService";
import TextField from '@material-ui/core/TextField';
// const useStyles = makeStyles((theme) => ({
//   input: { margin: theme.spacing(3) },
// }));

const initialFValues = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  age: "",
  relocation: true,
};

export default function UsersForm(props) {


  //  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props;
  
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    let relocationObject = {}
    if ("name" in fieldValues) temp.name = userService.validateName(fieldValues.name);
    if ("email" in fieldValues) temp.email = userService.validateEmail(fieldValues.email);
    if ("phone" in fieldValues) temp.phone = userService.validatePhone(fieldValues.phone);
    if ("age" in fieldValues) {
      debugger
      temp.age = userService.validateAge(fieldValues.age)
      if (temp.age.length === 0) relocationObject = ((25 < parseInt(fieldValues.age) < 30)) ? { relocation: false } : {}
    };
    setErrors({
      ...temp,
    });
    setReloc({...relocationObject})
    console.log('relocationObject',relocationObject)

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  }


  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    setReloc,
    reloc,
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
        ...recordForEdit,...reloc,
      });
  }, [recordForEdit]); //recordForEdit, setValues, setErrors

  const PhoneInput = ({ inputRef, ...props }) => (
    <MaskedInput
      {...props}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')',
        ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/,]}
      placeholderChar={'\u2000'}
    />
  );

  return (
    <div>
      <Paper elevation={0}>
        <Card >
          <MediaCard email={values.email} />
        </Card>
      </Paper>
      <Paper>
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
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleInputChange}
              type="phone"
              error={errors.phone}
              // InputProps={{ inputComponent: PhoneInput }}
            // className={classes.input}
            />
              {/* <TextField
                label="Phone"
                name="phone"
                // className={classes.input}
                value={values.phone}
                onChange={handleInputChange}
                InputProps={{ inputComponent: PhoneInput }}
              /> */}
              <Controls.Input
                label="Age"
                name="age"
                value={values.age}
                onChange={handleInputChange}
                error={errors.age}
              />
              <Controls.Checkbox
                name="relocation"
                label="Relocation"
                value={values.relocation}
                onChange={handleInputChange}
              // disabled={true}
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
      </Paper>
    </div>
  );
}
