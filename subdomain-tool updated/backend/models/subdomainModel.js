import mongoose from "mongoose";

const  subdomainSchema = mongoose.Schema(
  { id : { type: String, required: true },
    name: { type: String, required: true },
    content :{type: String, required: true },
    owner :{type: String, default: "admin"},
    type :{type: String ,default: "A" },
    created_at: { type: Date, required: true ,default: Date.now },
    modified_at: { type: Date ,default: Date.now },
  },
);

const Subdomain = mongoose.model("Subdomain", subdomainSchema);
export default Subdomain;
