import express from "express";
import path from "path";
import engine from "ejs-mate";
import { trail } from "./models/index.js";
import connectionString from "./utils/connectionString.js";
import tagTypes from "./seeds/seedData/tagTypes.js";
import fileDirName from "./utils/file-dir-name.js";
import AppError from "./utils/AppError.js";
import { joiForm } from "./utils/middleware/index.js";
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
        next(new AppError("Homepage not loading", 503));
    }
});
app.get("/trails/all", async (req, res, next) => {
    const allTrails = await trail.find();
    if (allTrails.length === 0) {
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
    const { id: trailId } = req.params;
    try {
        const singleTrail = await trail.findById(trailId), pageName = singleTrail?.name;
        res.render("trails/single", {
            singleTrail,
            pageName,
        });
    }
    catch {
        next(new AppError("Trail not found", 404));
    }
});
app.get("/trails/owners/:id", async (req, res, next) => {
    const { id: trailOwnerName } = req.params;
    try {
        const trailsByOwnerName = await trail.find({
            owner: trailOwnerName,
        }), pageName = trailOwnerName;
        res.render("trails/byOwnerName", {
            trailsByOwnerName,
            trailOwnerName,
            pageName,
        });
    }
    catch {
        next(new AppError(`Owner ${trailOwnerName} does not exist`, 404));
    }
});
app.get("/trails/tags/:id", async (req, res, next) => {
    const { id: tag } = req.params, taggedTrails = await trail.find({
        tags: tag,
    });
    if (taggedTrails.length === 0) {
        next(new AppError(`Tag '${tag}' not found`, 404));
    }
    else {
        const pageName = `Tags | ${tag}`;
        console.log(taggedTrails);
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
        next(new AppError("Trail failed to post. Please try again", 503));
    }
});
app.get("/trails/:id/edit", async (req, res, next) => {
    const { id: trailId } = req.params;
    try {
        const singleTrail = await trail.findById(trailId), pageName = singleTrail?.name, existingTags = singleTrail?.tags?.map((tag) => tag), tagTypeDupe = tagTypes.map((tag) => {
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
        next(new AppError("Cannot edit invalid page", 404));
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
        next(new AppError("Required data was not inserted. Please try again", 400));
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
        next(new AppError("Error. Cannot delete a trail that does not exist", 404));
    }
});
app.get("/adminLogin/:id", (req, res, next) => {
    const { id: password } = req.params;
    if (password != "toeBeans") {
        next(new AppError("Incorrect password", 403));
    }
    else
        res.send("Login worked!!");
});
app.all("*", (req, res, next) => {
    next(new AppError("Page not found", 404));
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
