import mongoose from "mongoose";
const schema = mongoose.schema;

const userSchema = new Schema();
({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
