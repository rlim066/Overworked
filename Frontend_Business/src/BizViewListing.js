import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";
import BizNavBar from "./BizNavBar";
import AddNewListing from "./AddNewListing";
import logo from './thriftCrop.png';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { auth } from "./Config/Firebase";

const BizViewListing = (props) => {
    const [listing_name, setlistingName] = useState('');
    const [product_brand, setproductBrand] = useState('');
    const [product_description, setproductDescription] = useState('');
    //const [materialOfProduct, setmaterialOfProduct] = useState('');
    //const [ageOfProduct, setageOfProduct] = useState('');
    const [category, setcategoryProduct] = useState('');
    const [product_price, setPriceofProduct] = useState('');
    const [product_size, setSizeofProduct] = useState('');
    const [product_quantity, setQuantityofProduct] = useState('');
    const [product_image, setproductImage] = useState('');
    const [tags, setTags] = useState('');

    const navigate = useNavigate();

    const [username, setUsername] = useState(localStorage.getItem('username'));
    //console.log(username);

    const [listings, setListings] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    //const { data: listings, isPending, error } = useFetch('http://localhost:8000/products/business_username/' + username);
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (username.toString() === "null") { return; }
        axios.get('http://localhost:8000/products/business_username/' + username)
        .then((response) => {
            setListings(response.data);
            setIsPending(false);
        })
        .catch((error) => {
            setListings(null);
            isPending = false;
            setError(error.message);
        })
    }, []);

    /*const handleSubmit = (e) => {
        e.preventDefault();
        const listing = { listing_name, product_brand, product_description, category, product_price, product_size, product_quantity, product_image};
        fetch('http://localhost:8000/listings', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(listing)
        }).then(() => {
            navigate('/viewlisting'); //will have to edit this later
        })
    }*/

    const handleClick = (id) => {
        fetch('http://localhost:8000/products/' + id, {
          method: 'DELETE'
        })
        window.location.reload(false);
    }

    const logout = () => {
        auth.signOut()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authenticated");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

  return (
    
    <div className="BizViewListing">
        
        {username && <div></div> }
        {error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>}

        <BizNavBar/>
        
        <div className="text-center mt-4 mb-2">
            <h1>Your Product Inventory</h1>
        </div>
        <div className="mt-3">
            
            {listings && listings.map(listing => (
                <div className="listing-list" key={listing.id}> 
                    <div className="container mb-3">
                        <div className="card border">
                            <div className="card-body text-start py-4">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                        <img src={listing.product_image} className="img-responsive img-fluid rounded-3" alt="ProductImage"/>
                                    </div>
                    
                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                        <p className="lead fw-bold mb-2">{listing.listing_name}</p>
                                        <p><span className="text-muted">Brand: </span>{listing.product_brand} <span className="text-muted">Size: </span> {listing.product_size} </p>
                                        <div>
                                            <p className="mb-2 fw-normal">Qty: {listing.product_quantity}</p>
                                            
                                        </div> 
                                    </div>
                    
                                    
                    
                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h5 className="mb-0">{listing.product_price}</h5>
                                    </div>
                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
                                    </div>
                                </div>
                            </div>



                            <button onClick={() => {handleClick(listing.id)}} className="btn btn-outline-danger justify-content-center">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

            ))}

        <Link to="/addnewlisting" className="btn btn-outline-primary mt-3 me-3 ms-5 mb-4 fw-bold">+ ADD NEW LISTING</Link>
            
        </div>


        
        
    </div>
  );
}
 
export default BizViewListing;