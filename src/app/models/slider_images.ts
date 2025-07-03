import mongoose, { Schema, Document } from "mongoose";
export interface ISlider_images extends Document {
 
    img: string;
    img_name: string;
   
   
}

const Slider_imagesSchema = new Schema<ISlider_images>({
 
    img: {type:String, default:"https://www.gravatar.com/avatar/?d=mp"},
    img_name: {type:String, default:"image name"},
   
});

const Slider_images = mongoose.models.Slider_images || mongoose.model("Slider_images", Slider_imagesSchema);
export default Slider_images;
