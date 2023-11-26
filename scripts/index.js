import express from "express";
import path from "path";
import engine from "ejs-mate";
import { trail } from "./models/index.js";
import connectionString from "./connectionString.js";
import tagTypes from "./seeds/seedData/tagTypes.js";
import fileDirName from "./setup/file-dir-name.js";
import AppError from "./error_handling/AppError.js";
const { __dirname, __filename } = fileDirName(import.meta), app = express();
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "../")));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
const port = process.env.PORT || 8080;
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
        next(new AppError("Homepage not loading", 503));
    }
});
app.get("/trails/all", async (req, res, next) => {
    const allTrails = await trail.find();
    if (!allTrails) {
        try {
            res.redirect("/trails/all");
        }
        catch {
            next(new AppError("Trails not found. Server possibly down", 503));
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
    const { id: trailId } = req.params, singleTrail = await trail.findById(trailId);
    if (!singleTrail) {
        return next(new AppError("Trail not found", 404));
    }
    else {
        const pageName = singleTrail?.name;
        res.render("trails/single", {
            singleTrail,
            pageName,
        });
    }
});
app.get("/trails/owners/:id", async (req, res, next) => {
    const { id: trailOwnerName } = req.params, trailsByOwnerName = await trail.find({
        owner: trailOwnerName,
    });
    if (!trailsByOwnerName) {
        next(new AppError("Owner does not exist", 404));
    }
    else {
        const pageName = trailOwnerName;
        res.render("trails/byOwnerName", {
            trailsByOwnerName,
            trailOwnerName,
            pageName,
        });
    }
});
app.get("/trails/tags/:id", async (req, res, next) => {
    const { id: tag } = req.params, taggedTrails = await trail.find({
        tags: tag,
    });
    if (!taggedTrails) {
        next(new AppError("Tag not found", 404));
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
        next(new AppError("New trail form not found. Please allow some time to fix", 502));
    }
});
app.post("/newTrail", async (req, res, next) => {
    try {
        const { newTrailName, newTrailOwner, newTrailCity, newTrailState } = req.body, selectedTags = [];
        for (let potentialTag in req.body) {
            if (req.body[`${potentialTag}`] === "on") {
                selectedTags.push(potentialTag);
            }
            else {
            }
        }
        const newTrail = new trail({
            name: newTrailName,
            owner: newTrailOwner,
            location: {
                city: newTrailCity,
                state: newTrailState,
            },
            tags: [...selectedTags],
        });
        await newTrail.save();
    }
    catch {
        next(new AppError("Trail failed to post. Please try again", 503));
    }
});
app.get("/trails/:id/edit", async (req, res, next) => {
    const { id: trailId } = req.params, singleTrail = await trail.findById(trailId);
    if (!singleTrail) {
        next(new AppError("Cannot edit invalid page", 404));
    }
    else {
        const pageName = singleTrail?.name, existingTags = singleTrail?.tags?.map((tag) => tag), tagTypeDupe = tagTypes.map((tag) => {
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
});
app.post("/trails/:id/edit", async (req, res, next) => {
    const { id: trailId } = req.params, { newTrailName, newTrailPrice, newTrailCity, newTrailState } = req.body;
    if (!newTrailName || !newTrailPrice || !newTrailCity || !newTrailState) {
        next(new AppError("Error! Requires more data. Please try again", 404));
    }
    else {
        const selectedTags = [];
        for (let potentialTag in req.body) {
            if (req.body[`${potentialTag}`] === "on") {
                selectedTags.push(potentialTag);
            }
            else {
            }
        }
        console.log(selectedTags);
        await trail.findByIdAndUpdate(trailId, {
            name: newTrailName,
            price: newTrailPrice,
            tags: [...selectedTags],
            location: {
                city: newTrailCity,
                state: newTrailState,
            },
        });
        res.redirect(`/trails/${trailId}`);
    }
});
app.get("/trails/:id/delete", async (req, res, next) => {
    const { id: trailId } = req.params;
    const deletedTrail = await trail.findById({
        trailId,
    });
    if (!deletedTrail) {
        next(new AppError("Error. Cannot delete a trail that does not exist", 404));
    }
    else {
        await trail.deleteOne({
            _id: trailId,
        });
        res.redirect("/trails/all");
    }
});
app.get("/adminLogin/:id", (req, res, next) => {
    const { id: password } = req.params;
    if (password != "toeBeans") {
        throw new AppError("Incorrect password", 403);
    }
    else
        res.send("Login worked!!");
    next();
});
app.get("*", (req, res, next) => {
    console.log("Got to base error");
    throw new AppError("Page not found", 404);
});
app.use((err, req, res, next) => {
    console.log("Got to final error");
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
        errorMessage =
            "Admin action requested by non-admin. Please stop it";
        linkText = "Homepage";
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
