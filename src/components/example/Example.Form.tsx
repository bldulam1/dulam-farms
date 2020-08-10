import { Controller, useForm } from 'react-hook-form'

import MaterialUIInput from '@material-ui/core/Input'
import React from 'react'

interface IFormInput {
    firstName: string
    lastName: string
    iceCreamType: string
}

export default () => {
    const { control, handleSubmit } = useForm<IFormInput>()

    const onSubmit = (data: IFormInput) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                as={MaterialUIInput}
                name="firstName"
                control={control}
                defaultValue=""
                className="materialUIInput"
            />
            <Controller
                as={MaterialUIInput}
                name="lastName"
                control={control}
                defaultValue=""
                className="materialUIInput"
            />
            <input type="submit" />
        </form>
    )
}
