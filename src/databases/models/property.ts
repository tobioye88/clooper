import { model, Schema } from "mongoose";

// name, address, type => flat, description, image_url, total_rooms => 3 bdrm, occupancy_type => single, rent_amount => $1200, rent_frequency => monthly, is_published => true|false
const propertySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image_url: {
    type: String,
    required: [true, "Image url is required"],
  },
  total_rooms: {
    type: Number,
    required: [true, "Total rooms is required"],
    default: 0,
  },
  occupancy_type: {
    type: String,
    required: [true, "Occupancy type is required"],
    default: 0,
  },
  rent_amount: {
    type: Number,
    required: [true, "Rent amount is required"],
  },
  rent_frequency: {
    type: String,
    required: [true, "Rent frequency is required"],
  },
  is_published: {
    type: Boolean,
    required: [true, "Published flag must be of boolean"],
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

propertySchema.pre('validate', function(next) {
  this.is_published = Boolean(this.name &&
          this.address &&
          this.type &&
          this.description &&
          this.image_url &&
          this.total_rooms &&
          this.occupancy_type &&
          this.rent_amount &&
          this.rent_frequency);
  next();
})
const Property = model("Property", propertySchema);


export default Property;
