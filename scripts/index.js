import express from "express";
import path from "path";
import engine from "ejs-mate";
import { trail } from "./models/index.js";
import connectionString from "./utils/connectionString.js";
import fileDirName from "./utils/file-dir-name.js";
import AppError from "./utils/AppError.js";
import { joiForm } from "./utils/middleware/index.js";
import tagTypes from "./models/modelData/tagTypes.js";
const { __dirname } = fileDirName(import.meta), app = express(), port = process.env.PORT || 8080;
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "../")));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
await connectionString();
app.get("/", (req, res, next) => {
    try {
        res.render("home", {
            pageName: "Home",
        });
    }
    catch {
        next(new AppError(503, "Homepage not loading"));
    }
});
app.get("/trails/all", async (req, res, next) => {
    const allTrails = await trail.find().lean();
    if (allTrails.length === 0) {
        try {
            res.redirect("/trails/all");
        }
        catch {
            next(new AppError(503, "Trails not found. Server possibly down"));
        }
    }
    else {
        const pageName = "Trails | All trails";
        res.render("trails/all", {
            pageName,
            allTrails,
        });
    }
});
app.get("/trails/:id", async (req, res, next) => {
    const { id: trailId } = req.params;
    try {
        const singleTrail = await trail.findById(trailId).lean(), pageName = singleTrail?.name;
        res.render("trails/single", {
            singleTrail,
            pageName,
        });
    }
    catch {
        next(new AppError(404, "Trail not found"));
    }
});
app.get("/trails/owners/:id", async (req, res, next) => {
    const { id: trailOwnerName } = req.params;
    try {
        const trailsByOwnerName = await trail.find({
            owner: trailOwnerName,
        }).lean(), pageName = trailOwnerName;
        res.render("trails/byOwnerName", {
            trailsByOwnerName,
            trailOwnerName,
            pageName,
        });
    }
    catch {
        next(new AppError(404, `Owner ${trailOwnerName} does not exist`));
    }
});
app.get("/trails/tags/:id", async (req, res, next) => {
    const { id: tag } = req.params, taggedTrails = await trail.find({
        tags: tag,
    }).lean();
    if (taggedTrails.length === 0) {
        next(new AppError(404, `Tag '${tag}' not found`));
    }
    else {
        const pageName = `Tags | ${tag}`;
        res.render("trails/tag", {
            tag,
            taggedTrails,
            pageName,
        });
    }
});
app.get("/newTrail", (req, res, next) => {
    try {
        res.render("trails/new", {
            pageName: "New Trail",
            tagTypes,
        });
    }
    catch {
        next(new AppError(502, "New trail form not found. Please allow some time to fix"));
    }
});
app.post("/newTrail", joiForm, async (req, res, next) => {
    try {
        const { name, owner, city, price, state } = req.body, selectedTags = [];
        for (let potentialTag in req.body) {
            if (req.body[`${potentialTag}`] === "on") {
                selectedTags.push(potentialTag);
            }
            else {
            }
        }
        const newTrail = new trail({
            name: name,
            owner: owner,
            price: price,
            location: {
                city: city,
                state: state,
            },
            tags: [...selectedTags],
        });
        await newTrail.save();
    }
    catch {
        next(new AppError(503, "Trail failed to post. Please try again"));
    }
});
app.get("/trails/:id/edit", async (req, res, next) => {
    const { id: trailId } = req.params;
    try {
        const singleTrail = await trail.findById(trailId).lean(), pageName = singleTrail?.name, existingTags = singleTrail?.tags?.map((tag) => tag), tagTypeDupe = tagTypes.map((tag) => {
            if (existingTags?.includes(tag) || existingTags === undefined) {
            }
            else {
                return tag;
            }
        });
        res.render("trails/edit", {
            singleTrail,
            pageName,
            tagTypeDupe,
            existingTags,
        });
    }
    catch {
        next(new AppError(404, "Cannot edit invalid page"));
    }
});
app.post("/trails/:id/edit", joiForm, async (req, res, next) => {
    const { id: trailId } = req.params, { name, price, city, state } = req.body;
    try {
        const selectedTags = [];
        for (let potentialTag in req.body) {
            if (req.body[`${potentialTag}`] === "on") {
                selectedTags.push(potentialTag);
            }
            else {
            }
        }
        await trail.findByIdAndUpdate(trailId, {
            name: name,
            price: price,
            tags: [...selectedTags],
            location: {
                city: city,
                state: state,
            },
        });
        res.redirect(`/trails/${trailId}`);
    }
    catch {
        next(new AppError(400, "Required data was not inserted. Please try again"));
    }
});
app.get("/trails/:id/delete", async (req, res, next) => {
    const { id: trailId } = req.params;
    try {
        await trail.findByIdAndDelete({
            _id: trailId,
        });
        res.redirect("/trails/all");
    }
    catch {
        next(new AppError(404, "Error. Cannot delete a trail that does not exist"));
    }
});
app.get("/adminLogin/:id", (req, res, next) => {
    const { id: password } = req.params;
    if (password != "toeBeans") {
        next(new AppError(403, "Incorrect password"));
    }
    else
        res.send("Login worked!!");
});
app.all("*", (req, res, next) => {
    next(new AppError(404, "Page not found"));
});
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    let pageName = `${status} error`, link, linkText, errorMessage, imageSource;
    if (status === 404) {
        link = "/";
        errorMessage =
            "The page does not exists or was removed. I suggest you go back to the homepage";
        linkText = "Homepage";
        imageSource = "/images/undraw_location_search.svg";
    }
    else if (status === 403) {
        link = "/";
        errorMessage = "Admin action requested by non-admin. Please stop it";
        linkText = "Homepage";
        imageSource = "/images/undraw_fixing_bugs.svg";
    }
    else if (status === 400) {
        link = "/contact";
        errorMessage = "User Error";
        linkText = "Contact";
        imageSource = "/images/undraw_fixing_bugs.svg";
    }
    else {
        link = "/contact";
        errorMessage =
            "A server error occured. Please report any unexpected misshaps";
        linkText = "Contact";
        imageSource = "/images/undraw_server_down.svg";
    }
    res.render("error", {
        status,
        message,
        pageName,
        link,
        errorMessage,
        linkText,
        imageSource,
    });
    next(err);
});
