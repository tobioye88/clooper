import { Application } from "express";
let Validator = require("validatorjs");

export function allMiddleware(app: Application) {
  app.use("/users", function (req, res, next) {
    console.log("Request Type:", req.method);
    try {
      if (req.method === "POST") {
        const rules = {
          first_name: "required",
          last_name: "required",
          email: "required|email",
          phone: "required",
        };
        const customErrorMessages = {
          "required.first_name": "First name is required",
          "required.last_name": "Last name is required",
          "required.email": "Email is required",
          "required.phone": "Phone number is required",
        };
        let validation = new Validator(req.body, rules, customErrorMessages);
        if (!validation.passes()) {
          return res.status(400).json(validation.errors);
        }
      }
      
    } catch (error) {
      return res.status(400).json(error);
    }
    next();
  });
  app.use("/properties", function (req, res, next) {
    try {
      console.log("Request Type:", req.method);
      if (req.method === "POST") {
        const rules = {
          name: "required|string",
          address: "required|string",
          type: "required|string",
          description: "required|string",
          image_url: "required|string",
          total_rooms: "required|integer",
          occupancy_type: "required|string",
          rent_amount: "required|numeric",
          rent_frequency: "required|string",
          userId: "required|string",
        };
        const customErrorMessages = {
          "required.name": "Name is required",
          "string.name": "Name should be a string",
          "required.address": "Address is required",
          "string.address": "Address should be a string",
          "required.type": "Type is required",
          "string.type": "Type should be a string",
          "required.description": "Description is required",
          "string.description": "Description should be a string",
          "required.image_url": "Image URL is required",
          "string.image_url": "Image URL should be a string",
          "required.total_rooms": "Total rooms is required",
          "integer.total_rooms": "Total rooms should be a integer",
          "required.occupancy_type": "Occupancy type is required",
          "string.occupancy_type": "Occupancy type should be a string",
          "required.rent_amount": "Rent amount is required",
          "numeric.rent_amount": "Rent amount should be a numeric",
          "required.rent_frequency": "Rent frequency is required",
          "string.rent_frequency": "Rent frequency should be a string",
          "required.userId": "User Id  is required",
          "string.userId": "User Id should be a string",
        };
        let validation = new Validator(req.body, rules, customErrorMessages);
        if (!validation.passes()) {
          return res.status(400).json(validation.errors);
        }
      }
    } catch (error) {
      console.log("error", error);
      return res.status(400).json(error);
    }
    next();
  });
}
