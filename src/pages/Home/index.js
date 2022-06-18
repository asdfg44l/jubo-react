import React, { useState, useEffect, useMemo } from 'react'
import { HTTP_GET } from '../../plugins/axios'
import PatientList from './components/List'
import OrderDialog from './components/OrderDialog'


const Home = () => {
    const [patientList, setPatientList] = useState([])
    const [open, setOpen] = useState(false)
    const [patientInfo, setPatientInfo] = useState({})
    const [patientOrder, setPatientOrder] = useState([])

    async function getPatientList() {
        try {
            const patients = await HTTP_GET('/patient')
            setPatientList(patients)
        } catch(e) {
            console.error(e)
        }
    }

    async function getPatientOrder() {
        try {
            const patientOrder = await HTTP_GET('/order', { patientId: patientInfo.patientId })
            setPatientOrder(patientOrder)
            console.log(patientOrder)
        } catch(e) {
            console.error(e)
        }
    }

    function handleListClick(patientInfo) {
        //after get order
        setOpen(true)
        setPatientInfo(patientInfo)
    }

    useEffect(() => {
        getPatientList()
    }, [])

    useEffect(() => {
        getPatientOrder()
    }, [patientInfo])

    const dialogTitle = useMemo(() => {
        return `${patientInfo.name}的醫囑`
    }, [patientInfo])

    return (
        <div>
            <PatientList patientList={patientList} handleListClick={handleListClick} />
            <OrderDialog open={open} setOpen={setOpen} title={dialogTitle} cardList={patientOrder}/>
        </div>
    )
}

export default Home