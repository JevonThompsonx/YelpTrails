import mongoose from "mongoose";
const { Schema } = mongoose;
import { trail, trailSchema, joi, joiTrailSchema } from "./trails.js";
import { user, joiUserSchema } from "./user.js";
import { comment, joiCommentSchema } from "./comment.js";
import { location, joiLocationSchema } from "./location.js";
import photo from "./photos.js";
export { trail, user, comment, location, photo, trailSchema, joi, joiTrailSchema, joiUserSchema, joiLocationSchema, joiCommentSchema };
