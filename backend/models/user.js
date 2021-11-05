module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      adresseMail: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          msg : "l'email est déjà pris"
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      pseudonyme: {
        allowNull: false,
        type: DataTypes.STRING
      },
      textPresentation: {
        allowNull: false,
        type: DataTypes.STRING
      },
      photoPresentation: {
        allowNull: false,
        type: DataTypes.STRING
      },
      sexe: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
      });
};