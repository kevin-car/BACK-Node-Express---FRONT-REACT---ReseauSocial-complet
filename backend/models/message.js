module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Message', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      auteur: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      photo: {
        type: DataTypes.STRING
      },
      message: { 
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  },{ 
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  }
  );
  } 

   
