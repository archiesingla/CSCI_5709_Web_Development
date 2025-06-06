import React from "react";
import cat from "../assets/Images/cat.jpg";

function Home(){
    return(
        <>
            <section id="hero">
                <div className="container">
                    <div className="row hero-row">
                    <div className="col-md-6 col-12 col-sm-12 col-lg-6 hero-left">
                        <h1 className="hero-header">
                            Welcome to ProdManager
                        </h1>
                        <p className="hero-p">
                        Effortlessly manage your products with our all-in-one tool. Create, view, edit and delete products - fast, simple and reliable.
                        </p>
                        <button className="btn btn-lg btn-light">
                            Explore Products
                        </button>
                    </div>

                    <div className="col-md-6 col-12 col-sm-12 col-lg-6">
                        <img src={cat} alt="cat image" />
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default Home;