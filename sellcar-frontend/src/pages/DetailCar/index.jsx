import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import "./DetailCar.css";

const formattedNumber = (v) =>
    new Intl.NumberFormat("vi-VN").format(v) + " VND";
const DetailCar = () => {

    const [formContact, setFormContact] = useState();
    const { id } = useParams("id");
    const [detailCar, setDetailCar] = useState(null);

    function handleChange(e){
        const { name, value } = e.target;
        setFormContact(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await api.post(`/contact/dealer?id=${detailCar?.dealerInfo?.id}`, formContact);
            window.alert("Gửi liên hệ thành công! Người bán sẽ phản hồi bạn trong thời gian sớm nhất.")
        } catch (e) {
            window.alert("Gửi liên hệ thất bại!!!");
            console.error(e);
        }
    }

    async function getDetailCar(){
        try{
            const response = await api.get(`/car/${id}`);
            setDetailCar(response.data);
        } catch (e) {
            console.error(e);
        }
    } 

    useEffect(() => {
        getDetailCar();
    }, [])

    console.log(detailCar);
    
    return (
        <>
            DetailCar
        </>
    );
}

export default DetailCar;