const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    const all_list = await Listing.find({});
    res.render("listings/index.ejs",{all_list});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showlisting = async (req,res)=>{
     let {id} = req.params;
     const list = await Listing.findById(id).populate({
        path : "reviews",
        populate : {
            path :"author"
        }
    }).populate("owner");
     if(!list){
      req.flash("error","Listing you requested for does not exist");
      return res.redirect("/listings");
     }
     res.render("listings/show.ejs",{list});
}

module.exports.createlisting = async(req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
            query: req.body.location,
            limit: 1
        })
        .send()

    let url = req.file.path;
    let filename = req.file.filename;
    let {title,description,image,price,location,country} = req.body;
    let newlist = new Listing ({title,description,image,price,location,country});
    newlist.owner = req.user._id;
    newlist.image = {url,filename};

    newlist.geometry = response.body.features[0].geometry;
    await newlist.save();

    // console.log(saveListing);
    req.flash("success","New Listing created");
    res.redirect("/listings");  
}

module.exports.editlisting = async(req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id);
     if(!list){
      req.flash("error","Listing you requested for does not exist");
      return res.redirect("/listings");
     }
     let originalUrl = list.image.url;
     let Image = originalUrl.replace("/uplaod","/upload/c_fill,h_200,w_200")
    res.render("listings/edit.ejs",{list,Image});
}

module.exports.updatelisting = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body, { new: true });

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }

    req.flash("success","Listing Updated..!!");
    res.redirect(`/listings/${id}`);
}

module.exports.deletelisting = async (req,res)=>{
    let {id} = req.params
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","Listing Deleted")
    res.redirect("/listings");
}