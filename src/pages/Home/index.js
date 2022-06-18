import React, { useState, useEffect } from 'react'
import { HTTP_GET } from '../../plugins/axios'
import PatientList from './components/List'

const Home = () => {
    const [patientList, setPatientList] = useState([])

    async function getPatientList() {
        try {
            const patients = await HTTP_GET('/patient')
            setPatientList(patients)
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPatientList()
    }, [])

    return (
        <div>
            <PatientList patientList={patientList} />
        </div>
    )
}

export default Home