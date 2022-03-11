import React from "react";

const Footer = () => (
    <div className="footer">
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="full">
                            <div class="logo_footer">

                            </div>
                            <div class="information_f">
                                <p><strong>ADDRESS:</strong> Ben Arous</p>
                                <p><strong>TELEPHONE:</strong> 22 476099</p>
                                <p><strong>EMAIL:</strong> mohamed.haouali1@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="widget_menu">
                                            <h3>Menu</h3>
                                            <ul>
                                                <li><a href="/">Home</a></li>
                                                <li><a href="/#">About</a></li>
                                                <li><a href="/history">History</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="widget_menu">
                                            <h3>Account</h3>
                                            <ul>

                                                <li><a href="/login">Login</a></li>
                                                <li><a href="/register">Register</a></li>
                                                <li><a href="/cart">Cart</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="widget_menu">
                                    <h3>Newsletter</h3>
                                    <div class="information_f">
                                        <p>Subscribe by our newsletter and get update protidin.</p>
                                    </div>
                                    <div class="form_sub">
                                        <form>
                                            <fieldset>
                                                <div class="field">
                                                    <input type="email" placeholder="Enter Your Mail" name="email" />
                                                    <input type="submit" value="Subscribe" />
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


        <div class="cpy_">
            <p class="mx-auto">© 2022 All Rights Reserved By <a href="https://html.design/">Mohamed Haouali</a><br></br>



            </p>
        </div>
    </div>
);

export default Footer;