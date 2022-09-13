
function ResourceItem( {resourceURL, resourceImage, resourceTitle} ) {
  return (
    <div className="resourceItem">
        <a className="resourceText" href={resourceURL} target="_blank"> { resourceTitle }</a>
        <img className= "resourceImage" src={resourceImage}/>
    </div>
  )
}

export default ResourceItem