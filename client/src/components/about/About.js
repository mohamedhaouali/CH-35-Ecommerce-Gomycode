import "./about.css";



const About = () => {
    return (
        <div className="about">
            <div className="container">
                <div className="aboutWrapper">
                    <h1>About Us</h1>

                    <div>
                        <img src="/images/med.jpg" alt="" />
                    </div>{"\n"}


                    <p>
                        Computer engineer, I aim to get a key position in a company in order{"\n"}
                        to be able to develop my knowledge and the experience acquired during my professional course
                    </p>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="widget no-box">
                            <h5 class="widget-title">Follow up<span></span></h5>
                            <a href="https://www.linkedin.com/in/mohamed-haouali-24236334/"> <i class="fa fa-linkedin"> </i> </a>
                            <a href="https://github.com/mohamedhaouali"> <i class="fa fa-github"> </i> </a>

                        </div>
                    </div>

                    <i class="bi bi-linkedin"></i>
                </div>
            </div>

        </div >
    );
};

export default About;
