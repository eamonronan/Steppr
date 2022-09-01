import ResourceItem from '../components/ResourceItem';
import NHS_walking from '../images/NHS_walking.png';


function Resources() {
  return (
    <>
      <h2>Helpful Resources for Your Fitness Journey</h2>
      <div className="parent">
        <ResourceItem resourceURL = 'https://www.nhs.uk/live-well/exercise/running-and-aerobic-exercises/walking-for-health/' resourceImage = {NHS_walking} resourceTitle = 'Walking for Health (NHS)'/>
        <ResourceItem/>
        <ResourceItem/>
        <ResourceItem/>
        <ResourceItem/>
        <ResourceItem/>
        <ResourceItem/>
        <ResourceItem/>
        <a href="https://github.com" target="_blank">Link in new tab</a>
      </div>
      
    </>
  )
}

export default Resources