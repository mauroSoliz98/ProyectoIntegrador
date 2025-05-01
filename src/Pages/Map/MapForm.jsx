"use client"
import { Select, Input, Typography } from "antd"

const { TextArea } = Input
const { Text } = Typography

export const MapForm = ({ newEvent, handleChange, handleSelectChange }) => {
    const disasterOptions = [
        { value: "Incendio", label: "Incendio" },
        { value: "Inundación", label: "Inundación" },
        { value: "Deslizamiento", label: "Deslizamiento" },
    ]
    const severityOptions = [
        { value: "alto", label: "Alto" },
        { value: "medio", label: "Medio" },
        { value: "bajo", label: "Bajo" },
    ]

    return (
        <div className="mt-5 flex flex-col gap-4 p-2">
            <SelectOptions
                label="Tipo de desastre"
                defaultValue="Incendio"
                options={disasterOptions}
                name="disaster_type"
                value={newEvent.disaster_type}
                onChange={(value) => handleSelectChange(value, "disaster_type")}
            />

            <SelectOptions
                label="Severidad"
                defaultValue="alto"
                options={severityOptions}
                name="severity"
                value={newEvent.severity}
                onChange={(value) => handleSelectChange(value, "severity")}
            />

            <div className="grid gap-2">
                <Text>Dirección: </Text>
                <Input value={newEvent.address} name="address" onChange={handleChange} placeholder="Dirección del incidente" />
            </div>

            <div className="grid gap-2">
                <Text>Descripción: </Text>
                <TextArea
                    value={newEvent.description}
                    name="description"
                    onChange={handleChange}
                    rows={4}
                    placeholder="Descripción del desastre"
                    maxLength={200}
                />
            </div>
        </div>
    )
}

const SelectOptions = ({ label, options, defaultValue, ...props }) => {
    return (
        <div className="flex gap-2 items-center">
            <Text>{label}</Text>
            <Select {...props} defaultValue={defaultValue} style={{ width: 150 }} options={options} />
        </div>
    )
}
