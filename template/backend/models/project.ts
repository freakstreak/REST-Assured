import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database"; // Assuming sequelize instance is exported from database.ts

// Define the attributes for the Project model
interface ProjectAttributes {
  id: number;
  projectName: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public projectName!: string;
  public description?: string;
  public startDate?: Date;
  public endDate?: Date;
  public status?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    underscored: true,
    timestamps: true,
    schema: "project",
  }
);

export default Project;
