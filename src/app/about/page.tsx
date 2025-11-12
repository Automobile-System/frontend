"use client";
import { Navigation } from "@/components/layout/Navigation";
import Image from "next/image";
import React, { useEffect } from "react";


const AboutUs: React.FC = () => {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLDivElement>(".stat");
    counters.forEach(counter => {
      const target = Number(counter.getAttribute("data-count"));
      let count = 0;
      const step = Math.ceil(target / 100);

      const update = () => {
        count += step;
        if (count > target) count = target;
        counter.textContent = count.toString();
        if (count < target) requestAnimationFrame(update);
      };
      update();
    });
  }, []);

  return (
    <div className="font-poppins text-nitroBlue bg-nitroWhite">
      {/* HEADER */}
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-white bg-[url('https://images.unsplash.com/photo-1606220838316-8c8199ae7f6b')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020079]/80 via-[#020079]/70 to-black/80"></div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide">
            About NITROLINE
          </h1>
          <p className="mt-3 text-lg text-gray-200">
            Your trusted destination for complete vehicle care & performance.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
  <h2 className="text-3xl font-semibold text-nitroBlue mb-4">
    Who We Are
  </h2>
  
  <p className="mb-4 leading-relaxed text-gray-700">
    At <span className="text-nitroYellow font-semibold">NITROLINE</span>, 
    we’re passionate about keeping your vehicle running at its best. 
    With years of experience in automotive service, we provide expert 
    maintenance, diagnostics, and repair solutions using cutting-edge 
    technology and precision tools.
  </p>

  <p className="mb-4 leading-relaxed text-gray-700">
    From oil changes to advanced engine diagnostics, our certified 
    professionals ensure every vehicle is treated with care, safety, 
    and reliability. We’re committed to quality and customer trust.
  </p>

  <p className="mb-4 leading-relaxed text-[#0a2342] font-semibold">
    Over <span className="text-nitroYellow font-bold">28 Years</span> 
    of Excellence in the Automotive Service Industry
  </p>

  <p className="leading-relaxed text-[#0a2342]">
    Our mission is to deliver top-notch automotive care that blends 
    technical expertise with a customer-first approach. Whether you drive 
    a compact car or a heavy-duty vehicle, we handle every project with 
    precision, honesty, and commitment to perfection.
  </p>

  <p className="mt-3 leading-relaxed text-[#0a2342]">
    At <span className="text-nitroYellow font-semibold">NITROLINE</span>, 
    excellence isn’t just a promise — it’s a tradition that drives us forward.
  </p>
</div>


          <div className="md:w-1/2">
            <Image
              src="/img/aboutus.jpg"
              alt="NITROLINE Service Center"
              width={800}
              height={500}
              className="rounded-xl shadow-lg border-4 border-yellow-400"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-nitroBlue text-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 p-8 rounded-xl hover:bg-white/20 transition">
            <h3 className="text-nitroYellow text-xl font-semibold mb-3">
              Our Mission
            </h3>
            <p>
              To deliver top-tier automotive services with honesty, expertise,
              and innovation — ensuring complete customer satisfaction.
            </p>
          </div>
          <div className="bg-white/10 p-8 rounded-xl hover:bg-white/20 transition">
            <h3 className="text-nitroYellow text-xl font-semibold mb-3">
              Our Vision
            </h3>
            <p>
              To become Sri Lanka’s most trusted name in vehicle care by redefining
              automotive service excellence.
            </p>
          </div>
          <div className="bg-white/10 p-8 rounded-xl hover:bg-white/20 transition">
            <h3 className="text-nitroYellow text-xl font-semibold mb-3">
              Our Values
            </h3>
            <p>Integrity, Quality, Efficiency, and Commitment to every customer.</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#020079] text-yellow-400 py-16 text-center">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="stat text-5xl font-bold" data-count="15">0</div>
            <p className="mt-2 text-white/80">Years of Experience</p>
          </div>
          <div>
            <div className="stat text-5xl font-bold" data-count="12">0</div>
            <p className="mt-2 text-white/80">Professional Technicians</p>
          </div>
          <div>
            <div className="stat text-5xl font-bold" data-count="4000">0</div>
            <p className="mt-2 text-white/80">Vehicles Serviced</p>
          </div>
        </div>
      </section>

      {/* Footer (copied from LandingPage) */}
      <footer className="bg-black text-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* City Network */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">CITY NETWORK</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-400 font-inter">
                <div className="space-y-2">
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Colombo</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Kandy</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Matara</div>
                </div>
                <div className="space-y-2">
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Galle</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Badulla</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Kalutara</div>
                </div>
                <div className="space-y-2">
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Gampaha</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Kadana</div>
                  <div className="hover:text-yellow-400 transition-colors cursor-pointer">Panadura</div>
                </div>
              </div>
            </div>

            {/* City Office */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">CITY OFFICE</h3>
              <div className="text-gray-400 space-y-2 font-inter">
                <div>66, Attidiya Road,</div>
                <div>Ratmalana,</div>
                <div>Sri Lanka 10390</div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">OPENING HOURS</h3>
              <div className="text-gray-400 space-y-2 font-inter">
                <div>Mon - Fri: 7 AM - 6 PM</div>
                <div>Sat - Sun: 7 AM - 6 PM</div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">CONTACT US</h3>
              <div className="text-gray-400 font-inter space-y-2">
                <div>📞 011 2 640 640</div>
                <div>📧 info@automiraj.lk</div>
                <div className="pt-4 text-xs">
                  All Rights Reserved by NitroLine (Pvt) Ltd.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
