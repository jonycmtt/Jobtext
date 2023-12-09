const Banner = () => {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-full h-full relative flex justify-center">
          <img
          className=""
            src="https://i.ibb.co/GCP0xLY/thumb4-16114b5c9ffc977dd1ae-removebg-preview.png"
           
          />
          <div className="flex items-center gap-4 absolute top-1/2 md:top-[25%] left-0 bg-[#F6EEE9] px-6 py-3 rounded-full">
            <img
              className="w-12 h-12 border-2 border-black rounded-full"
              src="https://i.ibb.co/RHH3FZy/alexander-hipp-i-EEBWg-Y-6l-A-unsplash.jpg"
              alt=""
            />
            <div>
              <p className="sm:text-xl font-bold">480+</p>
              <span className="font-semibold">Happy Candidates</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-6xl font-bold">
            Find The Job That Fits Your Life
          </h1>
          <p className="py-6">
            Resume-Library is a true performance-based job board. Enjoy custom
            hiring products and access to up to 10,000 new resume registrations
            daily, with no subscriptions or user licences.
          </p>
          {/* <button className="btn btn-primary" >Get Started</button> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
