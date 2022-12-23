
import db from "../db/db";
import { DataTypes } from "sequelize";
// import Role from "./roles.model";

const User = db.define('user', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING}
    
},
{
    timestamps: false
}
);

export default User;


// const Role = db.define('role', {
//     id:{
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {type: DataTypes.STRING},
//     avatar: {type: DataTypes.STRING}

// },
// {
//     timestamps: false
// }
// );

// Role.hasOne(User);
// User.belongsTo(Role);
