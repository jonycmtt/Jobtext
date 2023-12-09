
import { useEffect } from "react"
import Banner from "./Banner"
import CategoryTabs from "./CategoryTabs"
import Brands from "../Brands"
import JobsLocation from "../JobsLocation"
import Features from "../Features"

const Home = () => {
  useEffect(() => {
    document.title = 'JobText | A Online find job marketplace'
  },[])
  return (
    <div className="max-w-6xl mx-auto">
      <Banner></Banner>
      <Brands></Brands>
      <CategoryTabs></CategoryTabs>
      <JobsLocation></JobsLocation>
      <Features></Features>
    </div>
  )
}

export default Home
