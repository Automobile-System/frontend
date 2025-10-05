// "use client"

// import React from "react"
// import { Navigation } from "@/components/layout/Navigation"
// import { HeroSection } from "@/components/layout/HeroSection"
// import { ContactBar } from "@/components/layout/ContactBar" 
// import { ServicesOverview } from "@/components/layout/ServicesSection"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Car,
//   Wrench,
//   Battery,
//   Shield,
//   Award,
//   Users,
//   MapPin,
//   Building2,
//   Zap,
//   Heart,
//   CheckCircle,
//   ArrowRight,
//   Globe2
// } from "lucide-react"

// const LandingPage = () => {

//   return (
//     <div className="min-h-screen bg-white font-inter">
//       {/* Navigation Header */}
//       <Navigation />

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Contact Bar */}
//       <ContactBar />

//       {/* About Us Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div>
//                 <Badge className="bg-red-100 text-red-600 border-red-200 mb-4 font-inter">
//                   <Award className="mr-1 h-4 w-4" />
//                   Our Story
//                 </Badge>
//                 <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4 font-roboto">ABOUT US</h2>
//                 <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 font-roboto leading-tight">
//                   Over <span className="text-red-600">28 Years</span> of Excellence in the automotive service industry
//                 </h3>
//                 <p className="text-gray-600 mb-8 leading-relaxed font-inter text-lg">
//                   Auto MiRAJ being Sri Lanka's largest and the best auto service network; has the most diverse service portfolio. 
//                   Auto MiRAJ is your one stop station for all of your maintenance, repairs, and services. 
//                   <strong className="text-red-600"> Auto MiRAJ Family drives to success based on three main pillars which are, Promptness, Respect & Oneness.</strong>
//                 </p>
//               </div>

//               {/* Values */}
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-6 group">
//                   <div className="w-44 h-28 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
//                     <Zap className="mr-2 h-5 w-5" />
//                     PROMPTNESS
//                   </div>
//                   <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=150&h=100&fit=crop" alt="Promptness" className="w-36 h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
//                 </div>
                
//                 <div className="flex items-center space-x-6 group">
//                   <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=150&h=100&fit=crop" alt="Respect" className="w-36 h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
//                   <div className="w-44 h-28 bg-gradient-to-r from-black to-gray-800 text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
//                     <Heart className="mr-2 h-5 w-5" />
//                     RESPECT
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-6 group">
//                   <div className="w-44 h-28 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
//                     <Users className="mr-2 h-5 w-5" />
//                     ONENESS
//                   </div>
//                   <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=150&h=100&fit=crop" alt="Oneness" className="w-36 h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
//                 </div>
//               </div>
//             </div>

//             {/* Right Content */}
//             <div className="space-y-8">
//               <div>
//                 <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4 font-inter">
//                   <Globe2 className="mr-1 h-4 w-4" />
//                   Our Reach
//                 </Badge>
//                 <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4 font-roboto">OUR NETWORK</h2>
//                 <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 font-roboto leading-tight">
//                   Over <span className="text-red-600">40 State of the Art</span> Facilities to serve across the country
//                 </h3>
//                 <p className="text-gray-600 mb-8 font-inter text-lg leading-relaxed">
//                   Our island wide network covers a vast range of services empowered by modern and latest technologies.
//                 </p>
//               </div>

//               {/* Service Brands */}
//               <div className="space-y-4">
//                 {[
//                   { name: "AUTO MiRAJ PREMIER", desc: "Located in Colombo to offer your vehicle a VIP Service.", bg: "bg-black" },
//                   { name: "AUTO MiRAJ GRAND", desc: "From car wash to body shop & workshop, all under one roof.", bg: "bg-gray-800" },
//                   { name: "RAMDI", desc: "European/other Manufacturer Repairs & Maintenance.", bg: "bg-red-600" },
//                   { name: "AUTO MiRAJ EXPRESS", desc: "Quick detailing services with latest steam wash facilities.", bg: "bg-black" },
//                   { name: "AUTO MiRAJ 4X4 EXPERIENCE", desc: "Extreme off-roading experience in Auto MiRAJ's sports rigs.", bg: "bg-red-600" },
//                   { name: "VROOM", desc: "Your trusted partner in all automotive repair materials.", bg: "bg-gray-800" }
//                 ].map((brand, index) => (
//                   <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
//                     <div className={`${brand.bg} text-white px-4 py-3 font-bold rounded font-roboto text-sm flex items-center group-hover:scale-105 transition-transform`}>
//                       <Building2 className="mr-2 h-4 w-4" />
//                       {brand.name}
//                     </div>
//                     <span className="text-gray-600 font-inter group-hover:text-gray-800 transition-colors">{brand.desc}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 mt-8">
//                 <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-roboto font-medium transition-all duration-300 hover:scale-105 group">
//                   About us
//                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//                 <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white px-8 py-3 font-roboto font-medium transition-all duration-300">
//                   <MapPin className="mr-2 h-4 w-4" />
//                   Branch Network
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Roadside Assistance Section */}
//       <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-black text-white relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>
//         </div>
        
//         <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div>
//                 <Badge className="bg-white/20 text-white border-white/30 mb-6 font-inter">
//                   <Shield className="mr-1 h-4 w-4" />
//                   Emergency Services
//                 </Badge>
                
//                 <div className="space-y-4 mb-8">
//                   <div className="text-4xl md:text-6xl font-bold transform -skew-x-6 inline-block bg-white text-red-600 px-6 py-3 rounded font-roboto shadow-2xl">
//                     ROADSIDE
//                   </div>
//                   <div className="text-4xl md:text-6xl font-bold transform -skew-x-6 inline-block bg-white text-red-600 px-6 py-3 rounded font-roboto shadow-2xl ml-4">
//                     ASSISTANCE
//                   </div>
//                 </div>
                
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
//                   <div className="text-3xl md:text-4xl font-bold font-roboto text-center">
//                     📞 0755004004
//                   </div>
//                   <p className="text-center text-white/80 mt-2 font-inter">Available 24/7</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {[
//                   { icon: Car, text: "Vehicle Breakdown Service" },
//                   { icon: Shield, text: "Flat Tires (Tire punctures)" },
//                   { icon: Battery, text: "Battery Jump Start" },
//                   { icon: Wrench, text: "Roadside Repair Assistance" },
//                   { icon: Car, text: "Towing Services" }
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
//                     <service.icon className="h-6 w-6 text-red-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
//                     <span className="text-lg font-inter group-hover:text-white transition-colors">{service.text}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="pt-6">
//                 <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-roboto font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
//                   <Shield className="mr-2 h-5 w-5" />
//                   Request Emergency Service
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </div>
//             </div>

//             {/* Right Images */}
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <img src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=300&h=200&fit=crop" alt="Tow Truck Service" className="w-full h-48 object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300" />
//                 <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
//                   <CardContent className="p-0">
//                     <div className="text-2xl font-bold text-center font-roboto">&lt; 30 min</div>
//                     <div className="text-center text-white/80 font-inter">Response Time</div>
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="space-y-6 mt-8">
//                 <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
//                   <CardContent className="p-0">
//                     <div className="text-2xl font-bold text-center font-roboto">24/7</div>
//                     <div className="text-center text-white/80 font-inter">Available</div>
//                   </CardContent>
//                 </Card>
//                 <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop" alt="Mechanic at work" className="w-full h-48 object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <ServicesOverview />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-red-600 mb-4">OUR SERVICES</h2>
//             <p className="text-2xl text-black">
//               Committed to provide <span className="text-red-600">the best care</span> with supervision and trust.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Periodic Maintenance */}
//             <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="h-48 overflow-hidden">
//                 <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop" alt="Periodic Maintenance" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
//               </div>
//               <CardContent className="p-6">
//                 <h3 className="text-2xl font-bold text-red-600 mb-4">Periodic Maintenance</h3>
//                 <div className="space-y-2 text-gray-600">
//                   <div className="text-sm font-medium text-black">Inspection Reports</div>
//                   <div>Wash & <span className="text-red-600">Grooming</span></div>
//                   <div>Waxing</div>
//                   <div>Undercarriage Degreasing</div>
//                   <div>Lube Services</div>
//                   <div>Interior/Exterior <span className="text-red-600">Detailing</span></div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Paints & Repairs */}
//             <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="h-48 overflow-hidden">
//                 <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop" alt="Paints & Repairs" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
//               </div>
//               <CardContent className="p-6">
//                 <h3 className="text-2xl font-bold text-red-600 mb-4">Paints & Repairs</h3>
//                 <div className="space-y-2 text-gray-600">
//                   <div className="text-sm font-medium text-black">Insurance Claims</div>
//                   <div>Nano <span className="text-red-600">Coating</span></div>
//                   <div>Spare Parts Replacement</div>
//                   <div>Mechanical Repair</div>
//                   <div>Full Paints</div>
//                   <div>Hybrid <span className="text-red-600">Services</span></div>
//                   <div className="text-sm font-medium text-black">4X4 Maintenances</div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Terminal Services */}
//             <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="h-48 overflow-hidden">
//                 <img src="https://images.unsplash.com/photo-1572046442516-3d137ea0ec8f?w=400&h=300&fit=crop" alt="Terminal Services" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
//               </div>
//               <CardContent className="p-6">
//                 <h3 className="text-2xl font-bold text-red-600 mb-4">Terminal Services</h3>
//                 <div className="space-y-2 text-gray-600">
//                   <div className="text-sm font-medium text-black">Battery Services</div>
//                   <div>Engine <span className="text-red-600">Tune-up</span></div>
//                   <div>Lube Services</div>
//                   <div>Windscreen Treatments</div>
//                   <div>Tyre Replacements</div>
//                   <div>Wheel <span className="text-red-600">Alignment</span></div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Promotions and News Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//             {/* Promos */}
//             <div>
//               <h2 className="text-4xl font-bold text-black mb-8">Promos</h2>
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&h=80&fit=crop" alt="Airforce Promo" className="w-20 h-20 object-cover rounded-lg" />
//                   <div>
//                     <h4 className="font-bold text-red-600">Membership Offers for Members of Airforce</h4>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&h=80&fit=crop" alt="Defense Promo" className="w-20 h-20 object-cover rounded-lg" />
//                   <div>
//                     <h4 className="font-bold text-red-600">Membership Offers for Members of Defense Forces</h4>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop" alt="GMOA Promo" className="w-20 h-20 object-cover rounded-lg" />
//                   <div>
//                     <h4 className="font-bold text-red-600">Membership Offers for GMOA Members</h4>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Latest News */}
//             <div>
//               <h2 className="text-4xl font-bold text-black mb-8">Latest News</h2>
              
//               {/* Featured News */}
//               <div className="mb-8">
//                 <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=200&fit=crop" alt="Toyota Award" className="w-full h-48 object-cover rounded-lg shadow-md mb-4" />
//                 <h3 className="text-xl font-bold text-black mb-2">
//                   Carveo wins the award for 'Toyota TGMO Best Service Chain'
//                 </h3>
//               </div>

//               {/* Other News */}
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <img src="https://images.unsplash.com/photo-1549317336-206569e8475c?w=80&h=80&fit=crop" alt="Insurers Eve" className="w-20 h-20 object-cover rounded-lg" />
//                   <div>
//                     <h4 className="font-bold text-red-600">North Western Insurers' Eve</h4>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80&h=80&fit=crop" alt="Fast Fit Launch" className="w-20 h-20 object-cover rounded-lg" />
//                   <div>
//                     <h4 className="font-bold text-red-600">Launch of Carveo Fast Fit</h4>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop" alt="Car Clinic" className="w-20 h-20 object-cover rounded-lg" />
//                   <div>
//                     <h4 className="font-bold text-red-600">Car Clinic by Carveo Thalawathugoda Branch</h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Partners Section */}
//       <section className="py-12 bg-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="text-white">
//               <h3 className="text-xl font-bold">PREMIUM AUTOCARE SERVICE PROVIDER</h3>
//             </div>
//             <div className="flex items-center space-x-8 overflow-x-auto">
//               <div className="text-white font-bold">LUKOIL</div>
//               <div className="text-red-600 font-bold">3M</div>
//               <div className="text-white font-bold">CASTROL</div>
//               <div className="text-blue-600 font-bold">CAUSEWAY PAINTS</div>
//               <div className="text-white font-bold">DEBEER</div>
//               <div className="text-white font-bold">GYEON</div>
//               <div className="text-red-600 font-bold">Mobil 1</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {/* City Network */}
//             <div>
//               <h3 className="text-xl font-bold text-white mb-6">CITY NETWORK</h3>
//               <div className="grid grid-cols-2 gap-4 text-gray-400">
//                 <div>
//                   <div>Colombo</div>
//                   <div>Kandy</div>
//                   <div>Matara</div>
//                 </div>
//                 <div>
//                   <div>Galle</div>
//                   <div>Badulla</div>
//                   <div>Kalutara</div>
//                 </div>
//                 <div>
//                   <div>Gampaha</div>
//                   <div>Kadana</div>
//                   <div>Panadura</div>
//                 </div>
//               </div>
//             </div>

//             {/* City Office */}
//             <div>
//               <h3 className="text-xl font-bold text-white mb-6">CITY OFFICE</h3>
//               <div className="text-gray-400 space-y-2">
//                 <div>66, Attidiya Road,</div>
//                 <div>Ratmalana,</div>
//                 <div>Sri Lanka 10390</div>
//               </div>
//             </div>

//             {/* Opening Hours */}
//             <div>
//               <h3 className="text-xl font-bold text-white mb-6">OPENING HOURS</h3>
//               <div className="text-gray-400 space-y-2">
//                 <div>Mon - Fri: 7 AM - 6 PM</div>
//                 <div>Sat - Sun: 7 AM - 6 PM</div>
//               </div>
//             </div>

//             {/* Contact */}
//             <div>
//               <div className="text-gray-400">
//                 All Rights Reserved by Carveo (Pvt) Ltd.
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default LandingPage