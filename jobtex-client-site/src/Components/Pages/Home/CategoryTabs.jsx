import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobItem from "../JobItem";
import "../../../../public/custom.css"
const CategoryTabs = () => {
  const [tabs, setTabs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [web, setWeb] = useState([]);
  const [tabsJob, setTabsJob] = useState([]);
  

  const TabsUrl = "https://jobtex-server-site.vercel.app/tabs";
  useEffect(() => {
    axios.get(TabsUrl).then((res) => {
      setTabs(res.data);
    });
  }, [TabsUrl]);

  const url = "https://jobtex-server-site.vercel.app/jobs";
  useEffect(() => {
    axios.get(url,{
      withCredentials: true
    }).then((res) => {
      setJobs(res.data);
    });
  }, [url]);

  const jobsWeb = jobs.filter((job) => job.category === 'Web Development');
  useEffect(()=> {
    setWeb(jobsWeb)
  },[jobsWeb])

  const handleTabCategory = (category) => {
    // console.log(category);

    const jobsTab = jobs.filter((job) => job.category === category);
    setTabsJob(jobsTab);
  };

  return (
    <div className="text-center my-16">
      <h2 className="text-4xl font-semibold mb-2">Categories Jobs</h2>
      <p className="mb-10 text-[#64666c] text-[18px] font-normal ">Find the right career opportunity for you</p>
      <Tabs>
        <TabList>
          {tabs.map((tab) => (
            <Tab onClick={() => handleTabCategory(tab.category)} key={tab._id}>
              {tab.category}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {web.map((item) => (
              <JobItem key={item._id} item={item}></JobItem>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tabsJob.map((item) => (
              <JobItem key={item._id} item={item}></JobItem>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tabsJob.map((item) => (
              <JobItem key={item._id} item={item}></JobItem>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
