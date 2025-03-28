import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ArticleAttributes } from "../interfaces/article.interface";
import { UserModel } from "./index";


@Table( { tableName: "article" } )
class ArticleModel extends Model<ArticleAttributes> {

  @Column( {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  } )
  declare id: number;

  @Column( {
    type: DataType.STRING( 50 ),
    allowNull: false,
  } )
  declare title: string;

  @Column( {
    type: DataType.TEXT,
    allowNull: false,
  } )
  declare body: string;

  @Column( {
    type: DataType.STRING( 255 ),
    allowNull: true
  } )
  declare image_url: string;

  @Column( {
    type: DataType.DATEONLY,
    allowNull: true
  } )
  declare date: Date;

  @ForeignKey( () => UserModel )
  @Column( {
    type: DataType.INTEGER,
    allowNull: false,
  } )
  declare user_id: number;
  @BelongsTo( () => UserModel, "user_id" )
    author?: UserModel;
}

export default ArticleModel;
