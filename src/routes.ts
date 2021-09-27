import { Application } from "express";
import Event from "./utils/event";
import { EventAction } from "./utils/event-action";
import User from "./databases/models/user";
import Property from "./databases/models/property";

export const routes = (app: Application) => {
  app.get("/", (req, res) => res.send("Express + TypeScript Server"));

  app.get("/test", (req, res) => {
    res.send("works");
  });

  // create user
  app.post("/users", async (req, res) => {
    try {
      const { first_name, last_name, email, phone } = req.body;
      //   const user = { first_name, last_name, email, phone };
      const user = await User.create({ first_name, last_name, email, phone });
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({ message: "Something went wrong", error: e });
    }
  });

  // read users
  app.get("/users", async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: "Something went wrong", error: e });
    }
  });

//   delete user
//   app.delete("/users/:id", (req, res) => {});

  // create properties
  app.post("/properties", async (req, res) => {
    // on user create
    try {
      const {
        name,
        address,
        type,
        description,
        image_url,
        total_rooms,
        occupancy_type,
        rent_amount,
        rent_frequency,
        userId,
      } = req.body;

      const user = await User.findById(userId).orFail();

      if (!user) throw { message: "Unknown user" };

      const property = await Property.create({
        name,
        address,
        type,
        description,
        image_url,
        total_rooms,
        occupancy_type,
        rent_amount,
        rent_frequency,
        user: user.id,
      });
      //   property.user = user;
      const fullProp = await Property.findById(property.id).populate("user").orFail();

      Event.emit(EventAction.PROPERTY_CREATED, fullProp);
      res.json({ message: "successful", fullProp });
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'failed', e});
    }
  });

  // read properties
  app.get("/properties", async (req, res) => {
      try {
          const properties = await Property.find();
          res.json({ message: "successful", properties });
      } catch (error) {
          console.log(error);
          return res.status(400).json(error);
      }
  });

  // delete properties
  app.delete("/properties/:id", async (req, res) => {
    try {
      const propertyId = req.params.id;
      const properties = await Property.findById(propertyId).orFail();
      res.json({ message: "successful", properties });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });
};
