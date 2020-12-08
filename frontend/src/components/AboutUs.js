import React from 'react';

const AboutUs = () => {
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">Team PuddleJumpers</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">The TECHCareers students who make up Team PuddleJumpers are...</p>
          </div>
          <div className="flex flex-col md:flex-row justify-evenly -m-4">
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                     src="/Aaron.png"/>
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-gray-900">Aaron Barthel</h2>
                  <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                  <p className="mb-4">Aaron is a Full Stack developer based in Edmonton, AB. He spends his time either playing games like
                    Factorio and PlanetSide2 or building stylish web applications for the modern web.</p>
                  <span className="inline-flex">
              <section className="text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </section>
            </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                     src="/kenji.png"/>
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-gray-900">Kenji Au</h2>
                  <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                  <p className="mb-4">Kenji developed an interest in coding after taking a couple of programming courses in university. He decided to make a career change and pursue his passion in software development in 2020. He hopes to utilize his strong background in mathematics and physics to create applications to improve our standard of living.</p>
                  <span className="inline-flex">
              <section className="text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </section>
            </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                     src="/Krisztina.png"/>
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-gray-900">Krisztina Pap</h2>
                  <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                  <p className="mb-4">Krisztina is hard-at-work turning her passion for programming into a career. She has a strong background in training, project management, and tech. When she's not writing code, she enjoys reading fantasy novels, jogging, and playing board games with her family.</p>
                  <span className="inline-flex">
              <section className="text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </section>
            </span>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="flex flex-col md:flex-row justify-evenly mb-4 ml-4 mr-4">
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                     src="/Lindsey.jpg" />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">Lindsey Graham</h2>
                    <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                    <p className="mb-4">Lindsey spent the early years of his professional life in the Oil & Gas sector, doing jobs ranging from Purchasing, to onsite work as an Electrician.
                      In early 2019 due to being unemployed, he picked up a few programming courses on Udemy to learn Python and ended up loving it to the point that he knew he wanted to change careers and take up the path of Software Development.</p>
                    <span className="inline-flex">
              <section className="text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </section>
            </span>
                  </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                     src="/Tosin.JPG" />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">Tosin Olaniyi</h2>
                    <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                    <p className="mb-4">Tosin is a Pharmacist by Profession and Programmer by Passion. Tosin has keen interest in using technology and data science to improve the processes and systems used in the health sector.</p>
                    <span className="inline-flex">
              <section className="text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </section>
              <section className="ml-2 text-gray-500">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" className="w-5 h-5"
                     viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </section>
            </span>
                  </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}

export default AboutUs;
