import { Link } from "react-router-dom";
import { useState } from "react";
import thriftCrop from './thriftCrop.png';
import { PersonCircle } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Hash } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import { Map } from "react-bootstrap-icons";
import { GlobeAmericas } from "react-bootstrap-icons";
import useFetch from "./useFetch";


const PayAddress = () => {
    const [Name, setName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [txtaddress, setTxtaddress] = useState('');
    const [locality, setLocality] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const { data: addresses, isPending, error } = useFetch('http://localhost:8001/addresses');

    const handleSubmit = (e) => {
        e.preventDefault();
        const address_1 = { Name, phoneNumber, pincode, txtaddress, locality, city};
        console.log(address_1);
        fetch('http://localhost:8001/addresses/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address_1)
        }).then(() => {
            navigate(-1); //will have to edit this later
        })
    }

  return (
    <div className="address-list border p-5 mb-5 container-sm">
        <div className="text-center mb-2">
            <h1>Choose Address</h1>
        </div>
        {addresses && addresses.map(address => (
            <div className="border rounded mt-3">
            <div className="d-flex justify-content-between">
                <h4 className="mt-3 ms-3 me-3">
                    Saved Addresses
                </h4>
                <a href="BUYER_addNewAddress.html" className="btn btn-outline-primary mt-3 ms-3 me-3 fw-bold">+ ADD NEW ADDRESS</a>
            </div>
    
            <div className="m-3">
                <h6>
                    Default Addresss
                </h6>
            </div>
            <div className="container mb-3">
                <div className="card border">
                    <div className="card-body text-start py-4">
                        <h5 className="card-title">Sam</h5>
                        <p className="card-text m-0">Nanyang Crescent</p>
                        <p className="card-text m-0">Tamarind Hall</p>
                        <p className="card-text mt-0">Singapore - 636866</p>
                        <p className="card-text">Mobile: 8753 6797</p>
                    </div>
                    <a href="#" className="container text-center border-top border-danger py-3 text-black">
                        Remove
                    </a>
                </div>
            </div>
            </div>
        ))}
        <div className="text-center mb-2 mt-4">
            <h3>Add New Address?</h3>
        </div>

        <form onSubmit={handleSubmit}>
            <div>
                <h2 className="lead display-sm fw-bold">Contact Details</h2>
            </div>
            <div className="justify-content-around">
                <div className ="border border-black p-2">
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <label htmlFor="name" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <PersonCircle/>
                                </span>
                                <input type="name" className="form-control" id="name" placeholder="Enter Name" required value={Name} onChange = {(e) => setName(e.target.value)}/>
                            </div>
                            <label htmlFor="phoneNumber" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Telephone/>
                                </span>
                                <input type="number" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" required value={phoneNumber} onChange = {(e) => setphoneNumber(e.target.value)}/>
                            </div>
    
                        </div>
                    </div>
                </div>   
            </div>
    
            <div className="mt-4">
                <h2 className="lead display-sm fw-bold">Address Details</h2>
            </div>
            <div className="justify-content-around">
                <div className ="border border-black p-2">
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <label htmlFor="pincode" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Hash/>
                                </span>
                                <input type="number" className="form-control" id="pincode" placeholder="Enter Pin Code" required value={pincode} onChange = {(e) => setPincode(e.target.value)}/>
                            </div>
                            <label htmlFor="address" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GeoAlt/>
                                </span>
                                <input type="text" className="form-control" id="address" placeholder="Address(House No, Building, Street, Area)" required value={txtaddress} onChange = {(e) => setTxtaddress(e.target.value)}/>
                            </div>
                            <label htmlFor="locality" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Map/>
                                </span>
                                <input type="text" className="form-control" id="locality" placeholder="Locality" required value={locality} onChange = {(e) => setLocality(e.target.value)}/>
                            </div>
                            <label htmlFor="city" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GlobeAmericas/>
                                </span>
                                <input type="text" className="form-control" id="city" placeholder="City" required value={city} onChange = {(e) => setCity(e.target.value)}/>
                            </div>
                            
                        </div>
                    </div>
                </div>   
            </div>
            
            <div className= "mt-5 text-center">
                <button className= "btn btn-outline-primary justify-content-center">
                    Add Address
                </button>
            </div>
        </form>
        
    </div>
  );
}
 
export default PayAddress;