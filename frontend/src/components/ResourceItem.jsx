
function ResourceItem( {resourceURL, resourceImage, resourceTitle} ) {
  return (
    <div className="resourceItem">
        <a className="resourceText" href={resourceURL} target="_blank"> { resourceTitle }</a>
        <img src={resourceImage} style={{height: "200px", width: "200px", padding: "10px" }}/>
    </div>
  )
}

export default ResourceItem