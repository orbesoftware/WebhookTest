import {DataTypes} from 'sequelize';
import db from '../db/db';
import User from './user.model';



const Rols = db.define('rols',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {type: DataTypes.STRING,
        unique: true
    }

},
{
    timestamps: false
}
);

Rols.hasMany(User,{
    foreignKey: 'Rol_Name',
    sourceKey: 'name'
});

User.belongsTo(Rols,{
    foreignKey: 'Rol_Name',
    targetKey: 'name',
})


export default Rols;
