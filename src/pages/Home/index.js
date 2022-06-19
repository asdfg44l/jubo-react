import React, { useState, useEffect, useMemo } from 'react'
import { HTTP_DELETE, HTTP_GET, HTTP_POST, HTTP_PUT } from '../../plugins/axios'
import PatientList from './components/List'
import OrderDialog from './components/OrderDialog'


//hook
//取得患者列表
function usePatientList() {
    const [patientList, setPatientList] = useState([])

    async function getPatientList() {
        try {
            const patients = await HTTP_GET('/patient')
            setPatientList(patients)
        } catch(e) {
            console.error(e)
        }
    }

    return [patientList, getPatientList]
}

//患者醫囑 CRUD
function usePatientOrder({ patientId }) {
    const [patientOrder, setPatientOrder] = useState([])

    //取得患者醫囑
    async function getPatientOrder() {
        try {
            const patientOrder = await HTTP_GET('/order', { patientId })
            setPatientOrder(patientOrder)
        } catch(e) {
            console.error(e)
        }
    }

    //新增醫囑
    async function addPatientOrder(params) {
        try {
            const { message } = params
            await HTTP_POST('/order', { patientId, message })
            getPatientOrder()
        } catch(e) {
            console.error(e)
        }
    }

    //修改醫囑
    async function editPatientOrder(params) {
        try {
            const { orderId, message } = params
            await HTTP_PUT('/order', { orderId, message })
            getPatientOrder()
        } catch(e) {
            console.error(e)
        }
    }

    //刪除醫囑
    async function deletePatientOrder(params) {
        try {
            await HTTP_DELETE('/order', { orderId: params.orderId })
            getPatientOrder()
        } catch(e) {
            console.error(e)
        }
    }

    return [patientOrder, getPatientOrder, addPatientOrder, editPatientOrder, deletePatientOrder]
}


const Home = () => {
    const [open, setOpen] = useState(false)
    const [patientInfo, setPatientInfo] = useState({})
    const [patientList, getPatientList] = usePatientList()
    const [patientOrder, getPatientOrder, addPatientOrder, editPatientOrder, deletePatientOrder] = usePatientOrder(patientInfo)
    
    
    //event handler
    function handleListClick(patientInfo) {
        //after get order
        setOpen(true)
        setPatientInfo(patientInfo)
    }

    function handleAddOrder(message) {
        const { patientId } = patientInfo
        addPatientOrder({ message, patientId })
    }

    function deleteOrder(orderId) {
        deletePatientOrder({ orderId })
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
            <OrderDialog 
                open={open}
                setOpen={setOpen}
                title={dialogTitle}
                cardList={patientOrder}
                addOrder={handleAddOrder}
                deleteOrder={deleteOrder}
            />
        </div>
    )
}

export default Home