import { AiFillCheckCircle } from "react-icons/ai";
const Features = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-3  mb-20 text-center">
      <div className="relative">
        <img className="w-full"
          src="https://i.ibb.co/TkNTcNB/thumb-review-6ac97f60f429ebe01523.png"
          alt=""
        />
        <div className="flex gap-2 items-center sm:absolute top-1/2 bg-white p-3 shadow rounded-xl">
          <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 26 27" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.82861 17.9669L10.8172 11.6126L17.1715 9.62402L15.1829 15.9783L8.82861 17.9669Z" stroke="#14A077" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="13" cy="13.7949" r="12" stroke="#14A077" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">190+</h2>
            <span className="text-slate-500">Countries</span>
          </div>
        </div>
        <div className="flex gap-2 items-center sm:absolute top-0 right-1/2 bg-white p-3 shadow rounded-xl">
          <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.52382 15.5352C5.03915 15.5352 1.20898 16.213 1.20898 18.929C1.20898 21.6438 5.01465 22.3473 9.52382 22.3473C14.0085 22.3473 17.8387 21.6683 17.8387 18.9535C17.8387 16.2387 14.033 15.5352 9.52382 15.5352Z" stroke="#14A077" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.52465 11.6616C12.4833 11.6616 14.854 9.28976 14.854 6.33226C14.854 3.3736 12.4833 1.00293 9.52465 1.00293C6.56715 1.00293 4.19531 3.3736 4.19531 6.33226C4.19531 9.28976 6.56715 11.6616 9.52465 11.6616Z" stroke="#14A077" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.4056 7.9082V12.5865" stroke="#3772FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.7912 10.2474H18.0195" stroke="#3772FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">1 million+</h2>
            <span className="text-slate-500">Candidates</span>
          </div>
        </div>

        <div className="flex gap-2 items-center sm:absolute top-1/2 right-0 bg-white p-3 shadow rounded-xl">
          <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none"><path d="M22.6673 10.4618C22.3412 8.11547 21.2527 5.94139 19.5695 4.27451C17.8863 2.60762 15.7017 1.54041 13.3522 1.23725C11.0028 0.934097 8.61881 1.41182 6.56759 2.59684M1.33398 2.46185V7.79518H6.66732" stroke="#14A077" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.33398 13.1289C1.66006 15.4753 2.74856 17.6494 4.4318 19.3162C6.11504 20.9831 8.29964 22.0503 10.6491 22.3535C12.9985 22.6567 15.3825 22.1789 17.4337 20.9939M22.6673 21.1289V15.7956H17.334" stroke="#14A077" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">350k</h2>
            <span className="text-slate-500">Job Search Success</span>
          </div>
        </div>

        <div className="sm:flex gap-2 items-center sm:absolute hidden bottom-0 right-1/2">
          <img src="https://i.ibb.co/FgS7P9D/download-5.jpg" alt="" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl sm:text-5xl font-bold">
          Get the job that is right for you
        </h2>
        <p className="text-slate-500 mt-2">
          Search millions of jobs and get the inside scoop on companies with
          employee reviews, personalized salary tools, and more.
        </p>
        <ul className="mt-6 text-lg font-semibold flex flex-col gap-2 text-slate-500">
          <li className="flex items-center gap-2 ">
            {" "}
            <AiFillCheckCircle className="text-success"></AiFillCheckCircle>Access to millions of job
            seekers
          </li>
          <li className="flex items-center gap-2 ">
            {" "}
            <AiFillCheckCircle className="text-success"></AiFillCheckCircle>Only pay for the candidates
            you want to contact
          </li>
          <li className="flex items-center gap-2 ">
            {" "}
            <AiFillCheckCircle className="text-success"></AiFillCheckCircle>Post unlimited jobs for
            free—all from one place
          </li>
          <li className="flex items-center gap-2 ">
            {" "}
            <AiFillCheckCircle className="text-success"></AiFillCheckCircle>
            <span>Hiring solutions & pricing that works with seasonal</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
