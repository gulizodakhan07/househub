
import bcrypt from "bcrypt";
import ApiFeature from "../utils/api-feature.utils.js";
import { User } from "./user.models.js";
import { BadRequestException } from "../exception/badRequest.exception.js";
import { UpdateUserSchema } from "./dtos/update-user.dtos.js";
import { userCReateSchema } from "./dtos/create-user.dtos.js";
import { isValidObjectId } from "mongoose";

class UserController {
    #_model;
    constructor() {
        this.#_model = User;
    }

    getAllUsers = async (req, res, next) => {
        try {
            const query = { ...req.query };
            const result = await new ApiFeature(this.#_model.find(), query)
                .filter()
                .sort("first_name")
                .limitFields()
                .getQuery()
                .countDocuments();
            const filteredUsersResult = await new ApiFeature(this.#_model.find(), query)
                .filter()
                .sort("first_name")
                .limitFields()
                .paginate()
                .getQuery(); 

            res.send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: result,
                data: filteredUsersResult,
            });
        } catch (err) {
            next(err);
        }
    }

    createUser = async (req, res, next) => {
        try {
            const { error, value } = userCReateSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(406).send({ message: error.details });
            }
            const { first_name, last_name, email, phone_number, username, password, role } = value;

            const check_email = await this.#_model.findOne({ email });
            if (check_email) {
                return res.status(409).send({ message: "Email already exists!" });
            }
            const check_username = await this.#_model.findOne({ username });
            if (check_username) {
                return res.status(409).send({ message: "Username already exists!" });
            }
            const check_phone = await this.#_model.findOne({ phone_number });
            if (check_phone) {
                return res.status(409).send({ message: "Phone number already exists!" });
            }


            const hashed_password = await bcrypt.hash(password, 12);
            const new_user = await this.#_model.create({
                first_name,
                last_name,
                phone_number,
                username,
                email,
                password: hashed_password,
                role
            });

            res.status(201).send({
                statusCode: 201,
                message: "User created successfully!",
                data: new_user
            });
        } catch (err) {
            next(err);
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const {first_name,last_name,phone_number,email,username,password} = req.body
            const { userId } = req.params;

            this.#_checkObjectId(userId)

            const { error, value } = UpdateUserSchema.validate(req.body);
            if (error) {
                return res.status(400).send({
                    message: "Validation error",
                    error: error.details
                });
            }

            if (value.password) {
                value.password = await bcrypt.hash(value.password, 12);
            }
            const updatedUser = await this.#_model.findByIdAndUpdate(
                userId,
                {
                    first_name,
                    last_name,
                    phone_number,
                    username,
                    email,
                    password
                    
                }
            );

            if (!updatedUser) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            res.status(200).send({
                message: "User updated successfully",
                data: updatedUser
            });
        } catch (err) {
            next(err);
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            const { userId } = req.params;

            this.#_checkObjectId(userId)

            const user = await this.#_model.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            res.status(200).send({
                message: "User deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }

    #_checkObjectId = (id) => {
        if (!isValidObjectId(id)) {
          throw new BadRequestException(`Given ${id} is not a valid ObjectID`);
        }
      }
}

export default new UserController();
