import {
    Facebook,
    InstagramIcon,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Printer,
    Twitter,
    YoutubeIcon,
  } from "lucide-react";
  import Link from "next/link";
  import React from "react";
  
  const Footer = () => {
    return (
      <div>
        <footer className="bg-[#1f1f39] text-center lg:text-left">
          <div className="mx-6 py-10 text-center md:text-left md:px-[180px] text-white">
            <div className="grid-1 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-4 flex items-center justify-center md:justify-start">
                  <div className="flex-col justify-center items-center space-y-2">
                    <img
                      src="/assets/framewhitelogo.png"
                      className="w-[350px] ml-[-30px]"
                      alt=""
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                        <Link href="https://www.facebook.com/profile.php?id=61557504611856&mibextid=ZbWKwL">
                          <Facebook size={21} className="text-black" />
                        </Link>
                      </div>
                      <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                        <Link href="https://www.instagram.com/growhub_assam?igsh=MXZheXJienpmNDYweQ==">
                          <InstagramIcon size={21} className="text-black" />
                        </Link>
                      </div>
                      {/* <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                        <Twitter size={21} className="text-black" />
                      </div> */}
                      <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                        <Link
                          href={
                            "https://www.linkedin.com/company/growhub-pvt-ltd/"
                          }
                        >
                          <Linkedin size={21} className="text-black" />
                        </Link>
                      </div>
                      {/* <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                        <YoutubeIcon size={21} className="text-black" />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                  Support
                </h6>
                <p className="mb-4">
                  <a href="/about">About Us</a>
                </p>
                <p className="mb-4">
                  <a href="#!">Shipping</a>
                </p>
                <p className="mb-4">
                  <a href="#!">Size Charts</a>
                </p>
              </div>
              <div>
                <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                  Legal
                </h6>
                <p className="mb-4">
                  <a href="#!">Cookies Policy</a>
                </p>
                <p className="mb-4">
                  <a href="/privacy-policy">Privacy & Policy</a>
                </p>
                <p className="mb-4">
                  <a href="/contact">Contact Us</a>
                </p>
                <p className="mb-4">
                  <a href="/terms-conditions">Terms & Conditions</a>
                </p>
              </div>
              <div>
                <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                  Contact
                </h6>
                <div className="mb-4 flex items-center justify-center">
                  <div className="text-white gap-3 flex items-start">
                    <MapPin className="shrink-0 hidden md:block" />
                    <div className="font-thin space-y-1">
                      <p className="font-bold">Office Address</p>
                      <p className="text-sm">
                        Silpukhuri, 3rd Floor, Sbi Building, Guwahati-1, 781003
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-center md:justify-start gap-3">
                  <Mail />
                  <p className="font-thin text-sm">growhub@gmail.com</p>
                </div>
                <p className="mb-4 flex items-center justify-center md:justify-start">
                  <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                    <Phone />
                  </span>
                  +91 75760 43293
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                    <Printer />
                  </span>
                  +91 75760 43293
                </p>
              </div>
            </div>
          </div>
  
          <div className="bg-black/5 p-6 text-center text-white font-thin">
            <span>
              © {new Date().getFullYear()} Copyright | All right reserved{" "}
            </span>
            <a className="font-semibold" href="https://growhub.shop">
              GrowHub
            </a>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;
  