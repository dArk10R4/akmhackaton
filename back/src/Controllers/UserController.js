const UserModel = require("../Models/UserModel");
const jwt = require('jsonwebtoken');
const { validateUser, validateLogin, validateUserUpdate, validatePassword,  } = require("../Util/ValidateUser");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  const data = ({ username, email, password, first_name, last_name, type } =
    req.body);

  if (!validateUser(data)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const user = new UserModel(data);
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {

  const data = ({ username, password } = req.body);
  console.log(data);

  if (!validateLogin(data)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, type: user.type },
      JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function getUsers(req, res) {
    try {
        const users = await UserModel.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (!validateUserUpdate(data)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    try {
        const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function changePassword(req, res) {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Invalid data" });
    }

    if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: "Invalid password" });
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ message: "Password changed" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function me(req, res) {
    return res.status(200).json(req.user);
}

module.exports = { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser, changePassword, me };