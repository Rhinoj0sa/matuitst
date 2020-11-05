import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as userService from "../../services/userService";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';


// const genderItems = [
//     { id: 'male', title: 'Male' },
//     { id: 'female', title: 'Female' },
//     { id: 'other', title: 'Other' },
// ]

const initialFValues = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
    // departmentId: '',
    // hireDate: new Date(),
    relocation: false,
}

export default function UsersForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <div>
         <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
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
                        error={errors.phone}
                    />
                    <Controls.Input
                        label="Age"
                        name="age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    {/* <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    /> */}
                    {/* <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={[
                            { id: '1', title: 'Development' },
                            { id: '2', title: 'Marketing' },
                            { id: '3', title: 'Accounting' },
                            { id: '4', title: 'HR' },
                        ]}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    /> */}
                    <Controls.Checkbox
                        name="relocation"
                        label="Relocation"
                        value={values.relocation}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
        </div>
    )
}
