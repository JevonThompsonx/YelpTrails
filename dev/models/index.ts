import { trail, trailSchema, joi, joiTrailSchema } from "./trails.js";
import { user, joiUserSchema } from "./user.js";
import { comment, joiCommentSchema } from "./comment.js";
import { location, joiLocationSchema } from "./location.js";
import { tag,tagSchema } from "./tags.js";
import photo from "./photos.js";

export {
	trail,
	user,
	comment,
	location,
	photo,
	trailSchema,
	joi,
	joiTrailSchema,
	joiUserSchema,
	joiLocationSchema,
	joiCommentSchema,
	tag,
	tagSchema
};
