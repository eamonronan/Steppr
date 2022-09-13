import ResourceItem from '../components/ResourceItem';
import NHS_walking from '../images/Walking_resource.jpg';
import Running from '../images/5k_resource.jpg';
import Park_run from '../images/Parkrun_resource.jpg';
import Yoga from '../images/Yoga_resource.jpg';
import Healthy_lifestyle from '../images/HealthyLifestyle_resource.jpg';
import Strength_training from '../images/StrengthTraining_resource.jpg';


function Resources() {
  return (
    <>
      <h2 className="resourceHeading">Helpful Resources for Your Fitness Journey</h2>
      <div className="parent">
        <ResourceItem resourceURL = 'https://www.nhs.uk/live-well/exercise/running-and-aerobic-exercises/walking-for-health/' resourceImage = {NHS_walking} resourceTitle = 'Walking for Health'/>
        <ResourceItem resourceURL = 'https://www.nhs.uk/live-well/exercise/running-and-aerobic-exercises/get-running-with-couch-to-5k/' resourceImage = {Running} resourceTitle="Couch to 5k" />
        <ResourceItem resourceURL = 'https://www.parkrun.org.uk/' resourceImage={Park_run} resourceTitle='Park Run UK'/>
        <ResourceItem resourceURL = 'https://www.yogajournal.com/poses/' resourceImage={Yoga} resourceTitle='Yoga Poses'/>
        <ResourceItem resourceURL = 'https://www.mayoclinic.org/healthy-lifestyle' resourceImage={Healthy_lifestyle} resourceTitle='Healthy Lifestyle'/>
        <ResourceItem resourceURL = 'https://britishweightlifting.org/start-lifting' resourceImage={Strength_training} resourceTitle='Start Lifting'/>
      </div>
      
    </>
  )
}

export default Resources